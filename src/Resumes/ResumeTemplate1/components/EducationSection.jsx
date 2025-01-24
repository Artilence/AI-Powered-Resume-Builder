/* eslint-disable react/prop-types */
import { QuillField } from '../../../components';

import { handleSelectionChange } from '../../../ResumeStateUtils';
import { addField, removeField } from '../../../ResumeStateUtils';

const EducationSection = ({ fields, setFields, setActiveQuill }) => {
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
            <div className="w-full text-[14px] font-semibold">
              <QuillField
                defaultValue={edu.degree}
                onTextChange={(content) =>
                  handleEducationChange(edu, 'degree', content)
                }
                onSelectionChange={(range, quill) =>
                  handleSelectionChange(setActiveQuill, range, quill)
                }
              />
            </div>
            <div className="w-max text-[12px] text-gray-500 flex items-center justify-start gap-3">
              <QuillField
                defaultValue={edu.institution}
                onTextChange={(content) =>
                  handleEducationChange(edu, 'institution', content)
                }
                onSelectionChange={(range, quill) =>
                  handleSelectionChange(setActiveQuill, range, quill)
                }
              />
              <input
                type="month"
                className="w-max text-[12px] flex  text-gray-500"
                value={edu.endDate}
                onChange={(e) =>
                  handleEducationChange(index, 'endDate', e.target.value)
                }
              />
            </div>
            <button
              onClick={() => removeField(setFields, 'education', index)}
              className="w-[200px] text-red-500 hover:text-red-700 focus:outline-none"
              title="Remove Education"
            >
              &times;
            </button>
          </div>
        ))}
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
      </div>
    </div>
  );
};

export default EducationSection;
