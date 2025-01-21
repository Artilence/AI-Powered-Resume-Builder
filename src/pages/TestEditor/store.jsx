import { createContext, useState } from 'react';
import ReactQuill from 'react-quill';

export const UploadDocContext = createContext();

export const UploadDocProvider = ({ children, gapiInstance }) => {
  const [selectedContent, setSelectedContent] = useState('');

  // New state variables for QuillEditor
  const [content, setContent] = useState('');
  const [editorState, setEditorState] = useState('EDITING');
  const [firstContent, setFirstContent] = useState('');
  const [lastContent, setLastContent] = useState('');
  const [newContent, setNewContent] = useState('');

  const deltaToHtml = (delta) => {
    const tempContainer = document.createElement('span');
    const tempQuill = new ReactQuill.Quill(tempContainer);
    tempQuill.setContents(delta);
    return tempContainer.querySelector('.ql-editor').innerHTML;
  };

  return (
    <UploadDocContext.Provider
      value={{
        selectedContent,
        setSelectedContent,
        content,
        setContent,
        editorState,
        setEditorState,
        firstContent,
        setFirstContent,
        lastContent,
        setLastContent,
        newContent,
        setNewContent,

        deltaToHtml,
      }}
    >
      {children}
    </UploadDocContext.Provider>
  );
};
