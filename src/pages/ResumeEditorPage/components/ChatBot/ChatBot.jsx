import { chatbotIcon, LogoIcon, closeIcon } from '../../../../assets';
import { useSelector, useDispatch } from 'react-redux';
import {
  addChatMessage,
  setIsChatbotOpen,
  setSelectedContent,
} from '../../../../app/index';
import { chatbotSendIcon } from '../../../../assets';
import { useEffect, useState } from 'react';

const ChatBot = ({ activeQuill }) => {
  const dispatch = useDispatch();
  const { isChatbotOpen, selectedContent, chatMessages } = useSelector(
    (state) => state.ResumeEditorAndChatCrontrol
  );
  const [chatMessage, setChatMessage] = useState('');
  useEffect(() => {
    if (!activeQuill) {
      dispatch(setSelectedContent(null));
    }
  }, [activeQuill, dispatch]);

  const handleChatMessage = () => {
    if (!chatMessage) return;

    dispatch(
      addChatMessage({
        date: new Date().toISOString(),
        role: 'user',
        content: chatMessage,
      })
    );
    setChatMessage('');
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
            <div className=" w-full h-full bg-chat-bg px-[22px] py-[32px] gap-2 flex justify-between flex-col">
              {/* chat messages */}
              <div className="flex flex-col overflow-y-scroll h-full ">
                <div className="grow flex flex-col h-full overflow-y-scroll">
                  {chatMessages.map((message) => (
                    <div key={message.date} className="flex flex-col">
                      <span className="text-[14px]">{message.content}</span>
                    </div>
                  ))}
                  {!selectedContent && (
                    <div className=" bg-light-gray p-4 text-[14px] rounded-full">
                      Please Select Content
                    </div>
                  )}
                </div>
                {/* chatbot input/btns */}
                <div className=" bottom-0 border border-light-gray w-full bg-white h-max rounded-2xl flex p-3 gap-3">
                  <textarea
                    disabled={!selectedContent}
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
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatBot;
