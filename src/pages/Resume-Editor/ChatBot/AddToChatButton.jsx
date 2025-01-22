import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  setEditorState,
  setFirstContent,
  setLastContent,
  setSelectedContent,
} from '../../../app/CurrentChatbotContextSlice';
import { QuillDeltaToHtmlConverter } from 'quill-delta-to-html';

const AddToChatButton = ({ activeQuill }) => {
  //Making clone of the current quill editor to avoid mutating the original quill editor
  const [currentQuill, setCurrentQuill] = useState(null);
  const dispatch = useDispatch();
  useEffect(() => {
    setCurrentQuill(activeQuill);
    //focusing the quill editor again after btn is clicked
    currentQuill?.focus();
  }, [currentQuill, activeQuill]);

  const handleAddToChat = (e) => {
    e.preventDefault();
    // verifying if there is any text selected
    const range = currentQuill?.getSelection();
    if (!range || range.length === 0) {
      console.log('No text selected.');
      setCurrentQuill(null);
      return;
    }
    //Setting the editor state to editing
    dispatch(setEditorState('EDITING'));
    // Getting the selected text from the quill editor
    const selectedDeltas = currentQuill?.getContents(range.index, range.length);
    // Converting the selected text to html
    const cfg = {};
    const converter = new QuillDeltaToHtmlConverter(selectedDeltas.ops, cfg);
    const selectedHtml = converter.convert();

    // Setting the first and last content of the quill editor
    dispatch(setFirstContent(currentQuill?.getContents(0, range.index)));
    dispatch(
      setLastContent(currentQuill?.getContents(range.index + range.length))
    );
    // Setting the selected content of the quill editor
    dispatch(setSelectedContent(selectedHtml));
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
