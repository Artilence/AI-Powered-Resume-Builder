// QuillContext.js
import { ChatbotContext } from './ChatBotContext.js';
import { useRef, useState } from 'react';

// Create the Quill Provider Component
export const ChatbotProvider = ({ children }) => {
  // Ref to store the current active Quill instance
  const [currentQuill, setCurrentQuill] = useState(null);
  const [firstContent, setFirstContent] = useState(null);
  const [lastContent, setLastContent] = useState(null);
  const [selectedContent, setSelectedContent] = useState(null);
  const [newContent, setNewContent] = useState(null);
  const [editorState, setEditorState] = useState(null);
  const [content, setContent] = useState(null);

  return (
    <ChatbotContext.Provider
      value={{
        currentQuill,
        setCurrentQuill,
        firstContent,
        setFirstContent,
        lastContent,
        setLastContent,
        selectedContent,
        setSelectedContent,
        newContent,
        setNewContent,
        editorState,
        setEditorState,
        content,
        setContent,
      }}
    >
      {children}
    </ChatbotContext.Provider>
  );
};
