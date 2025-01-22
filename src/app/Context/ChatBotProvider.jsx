// QuillContext.js
import { ChatbotContext } from './ChatBotContext.js';
import { useRef, useState, useEffect } from 'react';

// Create the Quill Provider Component
export const ChatbotProvider = ({ children }) => {
  // Load initial states from localStorage
  const [currentQuill, setCurrentQuill] = useState(null);
  const [firstContent, setFirstContent] = useState(() => {
    const saved = localStorage.getItem('firstContent');
    return saved ? JSON.parse(saved) : '';
  });
  const [lastContent, setLastContent] = useState(() => {
    const saved = localStorage.getItem('lastContent');
    return saved ? JSON.parse(saved) : '';
  });
  const [selectedContent, setSelectedContent] = useState(() => {
    const saved = localStorage.getItem('selectedContent');
    return saved ? JSON.parse(saved) : '';
  });
  const [newContent, setNewContent] = useState(() => {
    const saved = localStorage.getItem('newContent');
    return saved ? JSON.parse(saved) : '';
  });
  const [editorState, setEditorState] = useState(() => {
    const saved = localStorage.getItem('editorState');
    return saved ? JSON.parse(saved) : '';
  });
  const [content, setContent] = useState(() => {
    const saved = localStorage.getItem('content');
    return saved ? JSON.parse(saved) : '';
  });
  const [originalSelectedContent, setOriginalSelectedContent] = useState(() => {
    const saved = localStorage.getItem('originalSelectedContent');
    return saved ? JSON.parse(saved) : '';
  });
  const currentEditorRef = useRef(null);
  const setCurrentEditorRef = (ref) => {
    currentEditorRef.current = ref;
  };

  // Save states to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('firstContent', JSON.stringify(firstContent));
    localStorage.setItem('lastContent', JSON.stringify(lastContent));
    localStorage.setItem('selectedContent', JSON.stringify(selectedContent));
    localStorage.setItem('newContent', JSON.stringify(newContent));
    localStorage.setItem('editorState', JSON.stringify(editorState));
    localStorage.setItem('content', JSON.stringify(content));
    localStorage.setItem(
      'originalSelectedContent',
      JSON.stringify(originalSelectedContent)
    );
  }, [
    firstContent,
    lastContent,
    selectedContent,
    newContent,
    editorState,
    content,
    originalSelectedContent,
    currentEditorRef,
  ]);

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
        originalSelectedContent,
        setOriginalSelectedContent,
        currentEditorRef,
        setCurrentEditorRef,
      }}
    >
      {children}
    </ChatbotContext.Provider>
  );
};
