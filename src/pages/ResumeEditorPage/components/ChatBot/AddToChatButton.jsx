import { useContext, useEffect } from 'react';

import { QuillDeltaToHtmlConverter } from 'quill-delta-to-html';
import { ChatbotContext } from '../../../../app/Context/ChatBotContext';

// eslint-disable-next-line react/prop-types
const AddToChatButton = ({ activeQuill }) => {
  //Making clone of the current quill editor to avoid mutating the original quill editor
  const {
    currentQuill,
    setCurrentQuill,
    setFirstContent,
    setLastContent,
    setSelectedContent,
    setEditorState,
    setNewContent,
    firstContent,
    lastContent,
    editorState,
    newContent,
    originalSelectedContent,
    setOriginalSelectedContent,
  } = useContext(ChatbotContext);

  useEffect(() => {
    setCurrentQuill(activeQuill);
    // //focusing the quill editor again after btn is clicked

    // currentQuill?.focus();
  }, [currentQuill, activeQuill, setCurrentQuill, setEditorState]);

  //will be used to add the content to the chat
  const handleAddToChat = async (e) => {
    e.preventDefault();
    //getting the range of the selected content
    const range = currentQuill?.getSelection();
    if (!range || range.length === 0) {
      setCurrentQuill(null);
      console.log('no range');

      return;
    }
    //setting the editor state to Changed to disable all editors
    setEditorState('CHANGING');
    //getting the selected content and converting it to html
    const selectedDeltas = currentQuill?.getContents(range.index, range.length);
    const cfg = {};
    const converter = new QuillDeltaToHtmlConverter(selectedDeltas.ops, cfg);
    const selectedHtml = converter.convert();

    // First update all the states
    const firstContentValue = currentQuill?.getContents(0, range.index);
    const lastContentValue = currentQuill?.getContents(
      range.index + range.length
    );

    await Promise.all([
      setFirstContent(firstContentValue),
      setLastContent(lastContentValue),
      setSelectedContent(selectedHtml),
      setOriginalSelectedContent(selectedDeltas),
    ]);
  };

  const handleSendChatRequest = () => {
    const demoResponse = '<p><strong>Hello Demo Response</strong><br/></p>';
    setNewContent(demoResponse);

    setEditorState('CHANGED');
    //converting response to delta
    const convertContent = (content) => {
      const newDelta = currentQuill?.clipboard?.convert({ html: content });
      return newDelta;
    };

    const first = firstContent;
    const original = JSON.parse(JSON.stringify(originalSelectedContent));
    const transformed = convertContent(`<br/>${newContent}`);
    const last = lastContent;

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

    applyStyle(original.ops, 'pink', 'red');
    applyStyle(transformed.ops, 'lightgreen', 'green');
    console.log([
      ...first.ops,
      ...original.ops,
      ...transformed.ops,
      ...last.ops,
    ]);

    currentQuill?.setContents([
      ...first.ops,
      ...original.ops,
      ...transformed.ops,
      ...last.ops,
    ]);
  };

  const handleUserResponse = (option) => {
    const first = firstContent;
    const original = JSON.parse(JSON.stringify(originalSelectedContent));
    const convertContent = (content) => {
      const newDelta = currentQuill?.clipboard?.convert({ html: content });
      return newDelta;
    };
    const transformed = convertContent(`${newContent}`);
    const last = lastContent;
    if (option === 'ACCEPTED') {
      currentQuill?.setContents([
        ...first.ops,
        ...transformed.ops,
        ...last.ops,
      ]);
    }
    if (option === 'REJECTED') {
      currentQuill?.setContents([...first.ops, ...original.ops, ...last.ops]);
    }
    setEditorState('EDITING');
    setCurrentQuill(null);
  };
  console.log('editorState', editorState);

  return (
    <div className="fixed bottom-14 flex gap-4  right-16 z-50 bg-white-transparent-2 px-4 py-2 rounded-lg text-white font-bold text-3xl ">
      {editorState === 'EDITING' && (
        <button
          className="px-4 py-2 bg-btn-purple cursor-pointer rounded-lg"
          onClick={handleAddToChat}
        >
          Add to Chat
        </button>
      )}
      {editorState === 'CHANGING' && (
        <div>
          <button
            className="px-4 py-2 bg-btn-purple cursor-pointer rounded-lg"
            onClick={handleSendChatRequest}
          >
            Send Chat Request
          </button>
        </div>
      )}
      {editorState === 'CHANGED' && (
        <div className="flex gap-4">
          <button
            className="px-4 py-2 bg-green-500 cursor-pointer rounded-lg"
            onClick={() => handleUserResponse('ACCEPTED')}
          >
            ACCEPT
          </button>
          <button
            className="px-4 py-2 bg-red-500 cursor-pointer rounded-lg"
            onClick={() => handleUserResponse('REJECTED')}
          >
            REJECT
          </button>
        </div>
      )}
    </div>
  );
};

export default AddToChatButton;
