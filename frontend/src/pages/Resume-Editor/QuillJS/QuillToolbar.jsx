import {
  arrowDown,
  T_Bold,
  T_bulletList,
  T_inlineCode,
  T_Italic,
  T_NumberedList,
  T_Redo,
  T_Strikethrough,
  T_Text,
  T_TextAlign,
  T_Underline,
  T_Undo,
} from '../../../assets';

const QuillToolbar = () => {
  return (
    <div className="bg-gray-black flex justify-start items-center px-[32px] py-[10px] rounded-[16px] w-max gap-[12px] ">
      <span className="custom-editor-toolbar">
        <img src={T_Undo} alt="" />
      </span>
      <span className="custom-editor-toolbar">
        <img src={T_Redo} alt="" />
      </span>
      <span className="custom-editor-toolbar">
        <img src={T_Text} alt="" />
      </span>
      <span className="p-[6px] flex items-center justify-center gap-[4px]">
        <span className="text-base_2 text-dim-white">Normal Text</span>
        <img src={arrowDown} alt="" />
      </span>
      <span className="custom-editor-toolbar">
        <img src={T_TextAlign} alt="" />
      </span>
      <span className="p-[2px] flex items-center justify-center gap-[4px]">
        <span className="h-[24px] w-[24px] rounded-sm bg-white"></span>
        <img src={arrowDown} alt="" />
      </span>
      <span className="custom-editor-toolbar">
        <img src={T_Bold} alt="" />
      </span>
      <span className="custom-editor-toolbar">
        <img src={T_Italic} alt="" />
      </span>
      <span className="custom-editor-toolbar">
        <img src={T_Underline} alt="" />
      </span>
      <span className="custom-editor-toolbar">
        <img src={T_Strikethrough} alt="" />
      </span>
      <span className="custom-editor-toolbar">
        <img src={T_inlineCode} alt="" />
      </span>
      <span className="custom-editor-toolbar">
        <img src={T_bulletList} alt="" />
      </span>
      <span className="custom-editor-toolbar">
        <img src={T_NumberedList} alt="" />
      </span>
    </div>
  );
};

export default QuillToolbar;
