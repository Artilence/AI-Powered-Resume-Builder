import { useContext, useEffect, useState } from 'react';

import { QuillDeltaToHtmlConverter } from 'quill-delta-to-html';
import { ChatbotContext } from '../../../app/Context/ChatBotContext';

const AddToChatButton = ({ activeQuill }) => {
  //Making clone of the current quill editor to avoid mutating the original quill editor
  const {
    currentQuill,
    setCurrentQuill,
    setFirstContent,
    setLastContent,
    setSelectedContent,
    setEditorState,
  } = useContext(ChatbotContext);
  useEffect(() => {
    setCurrentQuill(activeQuill);
    //focusing the quill editor again after btn is clicked
    currentQuill?.focus();
  }, [currentQuill, activeQuill, setCurrentQuill]);

  // Demo Response
  const dempResponse = () => {
    const demoResponse = (
      <p>
        <strong>Hello Demo Response</strong>
        <br />
      </p>
    );
    setSelectedContent(demoResponse);
    setEditorState('CHANGED');
  };

  const handleAddToChat = (e) => {
    e.preventDefault();
    // verifying if there is any text selected
    const range = currentQuill?.getSelection();
    console.log(range);
    console.log(currentQuill);
    if (!range || range.length === 0) {
      console.log('No text selected.');
      setCurrentQuill(null);
      return;
    }
    //Setting the editor state to editing
    setEditorState('EDITING');
    // Getting the selected text from the quill editor
    const selectedDeltas = currentQuill?.getContents(range.index, range.length);
    // Converting the selected text to html
    const cfg = {};
    const converter = new QuillDeltaToHtmlConverter(selectedDeltas.ops, cfg);
    const selectedHtml = converter.convert();

    // Setting the first and last content of the quill editor
    const firstContent = currentQuill?.getContents(0, range.index);
    const lastContent = currentQuill?.getContents(range.index + range.length);
    setFirstContent(firstContent);
    setLastContent(lastContent);
    // Setting the selected content of the quill editor
    setSelectedContent(selectedHtml);

    //Calling Demo Response
    demoResponse();
  };

  return (
    <div
      className="fixed bottom-14  right-16 z-50 bg-btn-purple px-4 py-2 rounded-lg text-white font-bold text-3xl cursor-pointer"
      onClick={handleAddToChat}
    >
      AddToChatButton
    </div>
  );
};

export default AddToChatButton;
