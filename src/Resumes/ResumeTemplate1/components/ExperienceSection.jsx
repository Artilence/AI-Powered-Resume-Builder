/* eslint-disable react/prop-types */
import { useSelector } from 'react-redux';
import { QuillField } from '../../../components';

import { addField, removeField } from '../../../ResumeStateUtils';

const ExperienceSection = ({ fields, setFields, setActiveQuill }) => {
  const isTemplateDownloading = useSelector(
    (state) => state.ResumeEditorAndChatCrontrol.isTemplateDownloading
  );
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
          {!isTemplateDownloading && (
            <button
              onClick={() => removeField(setFields, 'experience', index)}
              className=" text-white bg-gray-700 w-[12px] h-[12px] p-4  flex-shrink-0 rounded-full flex items-center justify-center focus:outline-none"
              title="Remove Experience"
            >
              &times;
            </button>
          )}
          <div className="w-full flex justify-start items-center text-[16px] font-semibold">
            <QuillField
              defaultValue={exp.position}
              onTextChange={(content) =>
                handleExperienceChange(exp, 'position', content)
              }
              onSelectionChange={(range, quill, changeSpanDisplay) =>
                setActiveQuill(quill, changeSpanDisplay)
              }
            />
          </div>
          <div className="flex justify-start items-center w-full text-[14px] gap-5">
            <div className="w-max">
              <QuillField
                defaultValue={exp.company}
                onTextChange={(content) =>
                  handleExperienceChange(exp, 'company', content)
                }
                onSelectionChange={(range, quill, changeSpanDisplay) =>
                  setActiveQuill(quill, changeSpanDisplay)
                }
              />
            </div>
            <div className="w-max">
              <QuillField
                defaultValue={exp.startDate}
                onTextChange={(content) =>
                  handleExperienceChange(exp, 'startDate', content)
                }
                onSelectionChange={(range, quill, changeSpanDisplay) =>
                  setActiveQuill(quill, changeSpanDisplay)
                }
              />
            </div>
            <span className="w-[6px] h-[1px] bg-gray-500" />
            <div className="w-max">
              <QuillField
                defaultValue={exp.endDate}
                onTextChange={(content) =>
                  handleExperienceChange(exp, 'endDate', content)
                }
                onSelectionChange={(range, quill, changeSpanDisplay) =>
                  setActiveQuill(quill, changeSpanDisplay)
                }
              />
            </div>
          </div>

          <div>
            <QuillField
              defaultValue={exp.description}
              onTextChange={(content) =>
                handleExperienceChange(exp, 'description', content)
              }
              onSelectionChange={(range, quill, changeSpanDisplay) =>
                setActiveQuill(quill, changeSpanDisplay)
              }
            />
          </div>
        </div>
      ))}
      {!isTemplateDownloading && (
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
      )}
    </div>
  );
};

export default ExperienceSection;
