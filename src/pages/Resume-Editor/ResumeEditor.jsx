// src/components/ResumeEditor.jsx
import { useState, useCallback } from 'react';
import Eclipse from '../../components/design-utils/Eclipse';
import ResumeTemplate from '../../Resumes/ResumeTemplate1'; // Corrected import
import QuillToolbar from './QuillJS/QuillToolbar';
import Layout from '../../components/Layout/Layout';
import AddToChatButton from './ChatBot/AddToChatButton';
const ResumeEditor = () => {
  // PDF

  const [activeQuill, setActiveQuill] = useState(null); // Tracks the active Quill instance

  // Memoize the setActiveQuill callback to prevent unnecessary re-renders
  const handleSetActiveQuill = useCallback((quill) => {
    setActiveQuill(quill);
  }, []);

  return (
    <Layout>
      <div className="w-full mt-10 pt-32 h-max flex items-center justify-center  relative bg-black">
        <Eclipse top="top-[calc(-100vw*.9)]" left="left-[calc(-125vw*0.2)]" />
        <div className="w-full h-full z-10 py-[100px] gap-[100px] flex flex-col items-center justify-center">
          {/* Shared Quill Toolbar */}
          <QuillToolbar activeQuill={activeQuill} />

          {/* Resume Template that uses this same toolbar */}
          <AddToChatButton activeQuill={activeQuill} />

          <ResumeTemplate setActiveQuill={handleSetActiveQuill} />
        </div>
      </div>
    </Layout>
  );
};

export default ResumeEditor;
