/* eslint-disable react/prop-types */
import {
  chatbotIcon,
  LogoIcon,
  closeIcon,
  defaultChatBotProfile,
} from '../../../../assets';
import { useSelector, useDispatch } from 'react-redux';
import { QuillDeltaToHtmlConverter } from 'quill-delta-to-html';

import {
  addChatMessage,
  setEditorState,
  setFirstContentDelta,
  setIsChatbotOpen,
  setLastContentDelta,
  setNewContentHTML,
  setSelectedContentDelta,
  setUserAcceptReject,
} from '../../../../app/index';
import { chatbotSendIcon } from '../../../../assets';
import { useEffect, useState } from 'react';

const ChatBot = ({ activeQuill, changeSpanDisplayRef }) => {
  const dispatch = useDispatch();
  const [quillRef, setQuillRef] = useState(null);
  const {
    isChatbotOpen,
    selectedContentDelta,
    chatMessages,
    firstContentDelta,
    lastContentDelta,
    newContentHTML,
    userAcceptReject,
  } = useSelector((state) => state.ResumeEditorAndChatCrontrol);
  const [chatMessage, setChatMessage] = useState('');
  useEffect(() => {
    if (activeQuill) {
      setQuillRef(activeQuill);
    }
    const handleUserAcceptReject = (option) => {
      //converting response to delta
      const convertContent = (content) => {
        const newDelta = quillRef?.clipboard?.convert({
          html: content,
        });
        return newDelta;
      };
      const first = firstContentDelta;
      const original = JSON.parse(JSON.stringify(selectedContentDelta));
      const transformed = JSON.parse(
        JSON.stringify(convertContent(`${newContentHTML}`))
      );
      const last = lastContentDelta;
      if (option === 'ACCEPTED') {
        quillRef?.setContents([...first.ops, ...transformed.ops, ...last.ops]);
      }
      if (option === 'REJECTED') {
        quillRef?.setContents([...first.ops, ...original.ops, ...last.ops]);
      }
      dispatch(setUserAcceptReject(null));
      dispatch(setEditorState('EDITING'));
      dispatch(setNewContentHTML(null));
      dispatch(setSelectedContentDelta(null));
      dispatch(setFirstContentDelta(null));
      dispatch(setLastContentDelta(null));
      changeSpanDisplayRef?.current?.current(false);
    };
    if (userAcceptReject) {
      handleUserAcceptReject(userAcceptReject);
    }
  }, [
    activeQuill,
    userAcceptReject,
    changeSpanDisplayRef,
    dispatch,
    firstContentDelta,
    lastContentDelta,
    newContentHTML,
    quillRef,
    selectedContentDelta,
  ]);

  const updateChatMessage = () => {
    dispatch(
      addChatMessage({
        date: new Date().toLocaleString('en-US', {
          hour: 'numeric',
          minute: '2-digit',
          hour12: true,
        }),
        role: 'user',
        content: chatMessage,
      })
    );
    setChatMessage('');
  };

  //converting response to delta
  const convertContent = (content) => {
    const newDelta = quillRef?.clipboard?.convert({
      html: content,
    });
    return newDelta;
  };

  //applying style to the content
  const applyStyle = (ops, bgColor, color) => {
    return ops.map((op) => {
      // Clone the operation to avoid mutating the original
      op.attributes = {
        ...(op.attributes || {}),
        background: bgColor,
        color: color,
      };
    });
  };

  //handle chat message
  const handleChatMessage = async () => {
    //updating message and editor state
    dispatch(setEditorState('CHANGING'));
    updateChatMessage();

    //converting selected content to html for response
    const cfg = {};
    const converter = new QuillDeltaToHtmlConverter(
      selectedContentDelta.ops,
      cfg
    );
    const selectedContentHtml = converter.convert();
    //Send response to chatbot
    //Dummy response
    const newContentHTML = '<p><strong>Hello Demo Response</strong><br/></p>';
    dispatch(setNewContentHTML(newContentHTML));
    //updating editor state
    setEditorState('CHANGED');
    //getting first, original and last content
    const first = firstContentDelta;
    const original = JSON.parse(JSON.stringify(selectedContentDelta));
    const transformed = JSON.parse(
      JSON.stringify(convertContent(`<br/>${newContentHTML}`))
    );
    const last = lastContentDelta;

    //applying style to original and transformed content
    applyStyle(original.ops, 'pink', 'red');
    applyStyle(transformed.ops, 'lightgreen', 'green');
    //setting new content to editor
    quillRef?.setContents([
      ...first.ops,
      ...original.ops,
      ...transformed.ops,
      ...last.ops,
    ]);

    changeSpanDisplayRef?.current?.current(true);
  };

  return (
    <div className="fixed z-50 bottom-20 right-20">
      {/* Chatbot Icon */}
      <div className="relative cursor-pointer  flex items-center justify-center p-4 bg-btn-purple rounded-full ">
        <img
          src={chatbotIcon}
          className="w-[36px] h-[36px] object-contain"
          onClick={() => dispatch(setIsChatbotOpen(true))}
        />
        {/* chatbot view */}
        {isChatbotOpen && (
          <div className="absolute  flex flex-col   bottom-[120%] right-0  h-[568px] w-[390px] rounded-3xl overflow-hidden bg-white">
            {/* Header */}
            <div className="w-full gap-5  p-[22px] bg-btn-purple flex items-start justify-start">
              <img
                src={LogoIcon}
                alt=""
                className="w-[36px] h-[36px] object-contain"
              />
              <div className="w-full flex flex-col  ">
                <div className="w-full flex items-start justify-between">
                  <span className="font-semibold text-[20px] font-albert text-white ">
                    Ask Edvenity
                  </span>
                  <img
                    src={closeIcon}
                    alt=""
                    className="w-[24px] h-[24px] object-contain"
                    onClick={() => dispatch(setIsChatbotOpen(false))}
                  />
                </div>
                <span className="font-inter text-[14px] text-white-transparent-2">
                  Get AI-powered help
                </span>
              </div>
            </div>
            {/* chatbot Bottom */}
            <div className=" w-full h-full bg-chat-bg px-[22px] py-[32px] gap-5 flex items-center  justify-between flex-col">
              {/* chat messages */}
              <div className=" flex flex-col justify-center items-center w-full   h-[60%] overflow-y-scroll">
                <div className=" flex flex-col gap-5 h-full   w-full ">
                  {chatMessages.map((message) => (
                    <div key={message.date} className="flex flex-col gap-2 ">
                      <div className="flex items-center justify-start gap-2">
                        <img
                          src={defaultChatBotProfile}
                          alt="profile"
                          className="h-[28px] w-[28px] rounded-full object-contain flex-shrink-0"
                        />
                        <span className="font-inter text-[14px] text-light-gray uppercase">
                          {message.role} {message.date}
                        </span>
                      </div>
                      <div className="flex items-start justify-start w-full pl-10">
                        <div className="font-inter w-full text-[12px] bg-white border border-light-gray rounded-3xl p-4 break-words">
                          {message.content}
                        </div>
                      </div>
                    </div>
                  ))}

                  {selectedContentDelta ? (
                    <div className=" bg-light-gray p-4 text-[14px] flex flex-col gap-2 rounded-3xl">
                      <span className="font-semibold ">Selected Content:</span>
                      <span className="font-inter">
                        {selectedContentDelta?.ops[0]?.insert.length > 30
                          ? selectedContentDelta?.ops[0]?.insert.slice(0, 30) +
                            '...'
                          : selectedContentDelta?.ops[0]?.insert}
                      </span>
                    </div>
                  ) : (
                    <div className=" bg-light-gray p-4 text-[14px] rounded-full">
                      Please Select Content
                    </div>
                  )}
                </div>
              </div>
              {/* chatbot input/btns */}
              <div className="  border border-light-gray w-full bg-white h-max rounded-2xl flex p-3 gap-3">
                <textarea
                  disabled={!selectedContentDelta}
                  placeholder="how can i help?"
                  type="text"
                  value={chatMessage}
                  onChange={(e) => setChatMessage(e.target.value)}
                  rows={3}
                  className="w-full outline-none border-none resize-none text-sm"
                />
                <div className="flex-shrink-0 flex items-end justify-end">
                  <div
                    className="rounded-full p-4 bg-btn-purple"
                    onClick={handleChatMessage}
                  >
                    {' '}
                    <img
                      src={chatbotSendIcon}
                      className="w-[20px] h-[20px] object-contain"
                      alt=""
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatBot;
