/* eslint-disable react/prop-types */
import { useSelector } from 'react-redux';
import { QuillField } from '../../../components';

import { addField, removeField } from '../../../ResumeStateUtils';

const SkillsSection = ({ fields, setFields, setActiveQuill }) => {
  const isTemplateDownloading = useSelector(
    (state) => state.ResumeEditorAndChatCrontrol.isTemplateDownloading
  );
  // Handler for text changes in skills
  const handleSkillChange = (index, content) => {
    setFields((prev) => {
      const updatedSkills = [...prev.skills];
      updatedSkills[index] = { ...updatedSkills[index], content };
      return { ...prev, skills: updatedSkills };
    });
  };
  return (
    <div className="flex  flex-col gap-10 pb-10 w-full items-start justify-center">
      <div className="w-max flex gap-2 flex-col items-start justify-start">
        <span className="text-[14px] font-extrabold tracking-tighter uppercase ">
          Skills
        </span>
        <span className="w-full h-[2px] bg-gray-300"></span>
      </div>
      <div className="w-full flex gap-2 flex-wrap text-[12px] text-gray-500 mb-2">
        {fields.skills.map((skill, index) => (
          <div
            key={skill.id}
            className="flex gap-4 items-center justify-center bg-gray-200 w-max px-[10px] py-[10px] text-[12px] rounded-lg"
          >
            <QuillField
              defaultValue={skill.content}
              onTextChange={(content) => handleSkillChange(skill, content)}
              onSelectionChange={(range, quill, changeSpanDisplay) =>
                setActiveQuill(quill, changeSpanDisplay)
              }
            />
            {!isTemplateDownloading && (
              <button
                onClick={() => removeField(setFields, 'skills', index)}
                className=" text-red-500 hover:text-red-700 focus:outline-none"
                title="Remove Skill"
              >
                &times;
              </button>
            )}
          </div>
        ))}
        {!isTemplateDownloading && (
          <button
            onClick={() =>
              addField(setFields, 'skills', {
                id: Date.now().toString(),
                content: 'New Skill',
              })
            }
            className="text-[12px] bg-gray-200 px-[10px] py-[10px] rounded-lg text-gray-500 hover:text-gray-700 focus:outline-none"
            title="Add Skill"
          >
            + Add Skill
          </button>
        )}
      </div>
    </div>
  );
};

export default SkillsSection;
