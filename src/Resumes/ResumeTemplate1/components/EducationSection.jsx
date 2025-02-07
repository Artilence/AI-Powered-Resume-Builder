/* eslint-disable react/prop-types */
import { useSelector } from 'react-redux';
import { QuillField } from '../../../components';

import { addField, removeField } from '../../../ResumeStateUtils';

const EducationSection = ({ fields, setFields, setActiveQuill }) => {
  const isTemplateDownloading = useSelector(
    (state) => state.ResumeEditorAndChatCrontrol.isTemplateDownloading
  );
  const handleEducationChange = (index, field, value) => {
    setFields((prev) => ({
      ...prev,
      education: prev.education.map((edu, i) =>
        i === index ? { ...edu, [field]: value } : edu
      ),
    }));
  };
  return (
    <div className="flex  flex-col gap-3 w-full items-start justify-center">
      <div className="w-max flex gap-2 flex-col items-start justify-start">
        <span className="text-[14px] font-extrabold tracking-tighter uppercase ">
          Education
        </span>
        <span className="w-full h-[2px] bg-gray-300"></span>
      </div>
      <div className="w-full flex  flex-col gap-6   text-gray-500 mb-2">
        {fields.education.map((edu, index) => (
          <div key={edu.id} className="flex flex-col gap-3 w-full">
            {!isTemplateDownloading && (
              <button
                onClick={() => removeField(setFields, 'education', index)}
                className=" text-white bg-gray-700 w-[12px] h-[12px] p-4  flex-shrink-0 rounded-full flex items-center justify-center focus:outline-none"
                title="Remove Education"
              >
                &times;
              </button>
            )}
            <div className="w-full text-[14px] font-semibold">
              <QuillField
                defaultValue={edu.degree}
                onTextChange={(content) =>
                  handleEducationChange(edu, 'degree', content)
                }
                onSelectionChange={(range, quill, changeSpanDisplay) =>
                  setActiveQuill(quill, changeSpanDisplay)
                }
              />
            </div>
            <div className="w-full text-[12px] text-gray-500 flex items-center justify-start gap-3">
              <div className="w-max">
                {' '}
                <QuillField
                  defaultValue={edu.institution}
                  onTextChange={(content) =>
                    handleEducationChange(edu, 'institution', content)
                  }
                  onSelectionChange={(range, quill, changeSpanDisplay) =>
                    setActiveQuill(quill, changeSpanDisplay)
                  }
                />
              </div>
              <div className="w-max">
                <QuillField
                  defaultValue={edu.endDate}
                  onTextChange={(content) =>
                    handleEducationChange(edu, 'endDate', content)
                  }
                  onSelectionChange={(range, quill, changeSpanDisplay) =>
                    setActiveQuill(quill, changeSpanDisplay)
                  }
                />
              </div>
            </div>
          </div>
        ))}
        {!isTemplateDownloading && (
          <button
            onClick={() =>
              addField(setFields, 'education', {
                id: Date.now().toString(),
                degree: 'Enter Your Degree here',
                institution: 'Enter Your Institution here',
                endDate: '2030-01',
              })
            }
            className="text-[12px] bg-gray-200 px-[10px] py-[10px] rounded-lg text-gray-500 hover:text-gray-700 focus:outline-none"
            title="Add Education"
          >
            + Add Education
          </button>
        )}
      </div>
    </div>
  );
};

export default EducationSection;
