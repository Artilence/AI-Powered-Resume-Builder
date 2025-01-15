import Eclipse from '../../components/design-utils/Eclipse';
import ResumeTemplate1 from '../../Resumes/ResumeTemplate1';
import QuillToolbar from './QuillJS/QuillToolbar';
const ResumeEditor = () => {
  return (
    <div className=" w-full h-full flex items-center justify-center relative bg-black">
      <Eclipse top="top-[calc(-100vw*.9)]" left="left-[calc(-125vw*0.2)]" />
      <div className="w-full h-full z-10 py-[100px] gap-[100px] flex flex-col items-center justify-center">
        <QuillToolbar />
        <ResumeTemplate1 />
      </div>
    </div>
  );
};

export default ResumeEditor;
