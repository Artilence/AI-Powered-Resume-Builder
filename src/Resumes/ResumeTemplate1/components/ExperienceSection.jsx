/* eslint-disable react/prop-types */
import { QuillField } from '../../../components';

import { handleSelectionChange } from '../../../ResumeStateUtils';
import { addField, removeField } from '../../../ResumeStateUtils';

const ExperienceSection = ({ fields, setFields, setActiveQuill }) => {
  const handleExperienceChange = (index, field, value) => {
    setFields((prev) => ({
      ...prev,
      experience: prev.experience.map((exp, i) =>
        i === index ? { ...exp, [field]: value } : exp
      ),
    }));
  };
  return (
    <div className="w-full text-[12px] text-gray-500 flex flex-col gap-10">
      {fields.experience.map((exp, index) => (
        <div
          key={exp.id}
          className="flex flex-col gap-4 items-start justify-start w-full"
        >
          <div className="w-full flex justify-start items-center text-[16px] font-semibold">
            <QuillField
              defaultValue={exp.position}
              onTextChange={(content) =>
                handleExperienceChange(exp, 'position', content)
              }
              onSelectionChange={(range, quill) =>
                handleSelectionChange(setActiveQuill, range, quill)
              }
            />
          </div>
          <div className="flex justify-start items-center w-max text-[14px] gap-5">
            <QuillField
              defaultValue={exp.company}
              onTextChange={(content) =>
                handleExperienceChange(exp, 'company', content)
              }
              onSelectionChange={(range, quill) =>
                handleSelectionChange(setActiveQuill, range, quill)
              }
            />
            <input
              type="month"
              className="w-max text-[12px] text-gray-500"
              // value={exp.startDate}
              value={exp.startDate}
              onChange={(e) =>
                handleExperienceChange(exp.id, 'startDate', e.target.value)
              }
            />
            <input
              type="month"
              className="w-max text-[12px] text-gray-500"
              value={exp.endDate}
              onChange={(e) =>
                handleExperienceChange(exp.id, 'endDate', e.target.value)
              }
            />
          </div>

          <div>
            <QuillField
              defaultValue={exp.description}
              onTextChange={(content) =>
                handleExperienceChange(exp, 'description', content)
              }
              onSelectionChange={(range, quill) =>
                handleSelectionChange(setActiveQuill, range, quill)
              }
            />
          </div>
          <button
            onClick={() => removeField(setFields, 'experience', index)}
            className="text-red-500 hover:text-red-700 focus:outline-none"
            title="Remove Experience"
          >
            &times;
          </button>
        </div>
      ))}
      <button
        onClick={() =>
          addField(setFields, 'experience', {
            id: Date.now().toString(),
            position: 'New Job Title',
            company: 'New Company',
            description: 'New Job Description',
            startDate: '2025-01',
            endDate: '2030-01',
          })
        }
        className="text-[12px] bg-gray-200 px-[10px] py-[10px] rounded-lg text-gray-500 hover:text-gray-700 focus:outline-none"
        title="Add Experience"
      >
        + Add Experience
      </button>
    </div>
  );
};

export default ExperienceSection;
