// src/components/ResumeEditor.jsx
import { useState, useCallback, useContext, useRef } from 'react';
import { Eclipse } from '../../components';
import { ResumeTemplate1, ResumeTemplate2 } from '../../Resumes/index'; // Corrected import
import { ChatBot } from './components';
import { QuillToolbar } from '../../components';
import Layout from '../../components/Layout/Layout';
import { ChatbotContext } from '../../app/Context/ChatBotContext';
const ResumeEditor = () => {
  // PDF

  const [activeQuill, setActiveQuill] = useState(null); // Tracks the active Quill instance
  // Memoize the setActiveQuill callback to prevent unnecessary re-renders
  const changeSpanDisplayRef = useRef(null);
  const handleSetActiveQuill = useCallback((quill, changeSpanDisplay) => {
    changeSpanDisplayRef.current = changeSpanDisplay;
    setActiveQuill(quill);
  }, []);

  const { selectedTemplate } = useContext(ChatbotContext);
  return (
    <Layout>
      <div className="w-full mt-10 pt-32 h-max flex items-center justify-center overflow-hidden  relative bg-black">
        <Eclipse top="top-[calc(-100vw*.9)]" left="left-[calc(-125vw*0.2)]" />
        <div className="w-full h-full z-10 py-[100px] gap-[100px] flex flex-col items-center justify-center">
          {/* Shared Quill Toolbar */}
          <QuillToolbar activeQuill={activeQuill} />

          {/* Resume Template that uses this same toolbar */}
          <ChatBot
            activeQuill={activeQuill}
            changeSpanDisplayRef={changeSpanDisplayRef}
          />

          {selectedTemplate === 2 && (
            <ResumeTemplate2 setActiveQuill={handleSetActiveQuill} />
          )}
          {selectedTemplate === 1 && (
            <ResumeTemplate1 setActiveQuill={handleSetActiveQuill} />
          )}
        </div>
      </div>
    </Layout>
  );
};

export default ResumeEditor;
