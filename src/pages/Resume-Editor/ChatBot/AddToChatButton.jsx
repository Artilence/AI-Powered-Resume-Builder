import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  setContent,
  setEditorState,
  setFirstContent,
  setLastContent,
  setNewContent,
} from '../../../app/CurrentChatbotContextSlice';
const AddToChatButton = ({ activeQuill }) => {
  const [quill, setQuill] = useState(null);
  useEffect(() => {
    setQuill(activeQuill);
  }, [activeQuill]);
  const handleAddToChat = () => {
    const convertContent = (content) => quill?.clipboard?.convert(content);
  };
  return (
    <div
      onClick={handleAddToChat}
      className="fixed bottom-4 right-4 z-50 bg-btn-purple px-4 py-2 rounded-lg text-white font-bold text-3xl cursor-pointer"
    >
      AddToChatButton
    </div>
  );
};

export default AddToChatButton;
