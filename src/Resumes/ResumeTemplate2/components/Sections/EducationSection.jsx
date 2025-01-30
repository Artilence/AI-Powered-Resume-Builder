/* eslint-disable react/prop-types */
import { useSelector } from 'react-redux';
import { QuillField } from '../../../../components';

import {
  addField,
  handleTextChange,
  removeField,
} from '../../../../ResumeStateUtils';

const EducationSection = ({ userData, setUserData, setActiveQuill }) => {
  const isTemplateDownloading = useSelector(
    (state) => state.ResumeEditorAndChatCrontrol.isTemplateDownloading
  );
  const handleEducationChange = (index, field, value) => {
    setUserData((prev) => ({
      ...prev,
      education: prev.education.map((edu, i) =>
        i === index ? { ...edu, [field]: value } : edu
      ),
    }));
  };
  return (
    <div className="w-full pl-28 ">
      <div className="w-full flex gap-5 items-center">
        <span className="inline-block w-16 h-16 bg-green-dark flex-shrink-0 rounded-full" />
        <span className="text-green-light uppercase font-bold text-[18px]">
          Education
        </span>
        <span className="w-full h-[3px] bg-green-light"></span>
      </div>
      <div className="w-full h-full flex flex-col pl-[4%]">
        {userData?.education?.map((education, index) => (
          <div
            key={index}
            className="w-full flex flex-col border-l-4 border-l-green-dark"
          >
            <div className="relative w-full  flex justify-between items-center pt-20 pl-14">
              <span className="absolute -left-[2.6%] top-13  w-[20px] h-[20px] bg-green-dark rounded-[100%]" />

              <div className="uppercase font-semibold w-full text-[14px]">
                <QuillField
                  onTextChange={(content) =>
                    handleEducationChange(education.id, 'degree', content)
                  }
                  onSelectionChange={(range, quill, changeSpanDisplay) =>
                    setActiveQuill(quill, changeSpanDisplay)
                  }
                  defaultValue={education?.degree}
                />
              </div>
              <div className="flex text-[10px] gap-2">
                <span className="w-[50px]">
                  <QuillField
                    defaultValue={education?.startDate}
                    onTextChange={(content) =>
                      handleTextChange(setUserData, 'startDate', content)
                    }
                    onSelectionChange={(range, quill, changeSpanDisplay) =>
                      setActiveQuill(quill, changeSpanDisplay)
                    }
                  />
                </span>
                -
                <span className="w-[50px]">
                  <QuillField
                    defaultValue={education?.endDate}
                    onTextChange={(content) =>
                      handleTextChange(setUserData, 'endDate', content)
                    }
                    onSelectionChange={(range, quill, changeSpanDisplay) =>
                      setActiveQuill(quill, changeSpanDisplay)
                    }
                  />
                </span>
              </div>
            </div>
            <div className="w-full  pl-14 h-full">
              <QuillField
                defaultValue={education?.description}
                onTextChange={(content) =>
                  handleTextChange(setUserData, 'description', content)
                }
                onSelectionChange={(range, quill, changeSpanDisplay) =>
                  setActiveQuill(quill, changeSpanDisplay)
                }
              />
            </div>
            {!isTemplateDownloading && (
              <button
                onClick={() => removeField(setUserData, 'education', index)}
                className="w-[200px] text-red-500 hover:text-red-700 focus:outline-none"
                title="Remove Education"
              >
                &times;
              </button>
            )}
          </div>
        ))}
        {!isTemplateDownloading && (
          <button
            onClick={() =>
              addField(setUserData, 'education', {
                degree: 'Bachelor of Science',
                institution: 'University of Technology',
                startDate: '2020-01',
                endDate: '2025-01',
                description:
                  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla ornare metus vel nunc pulvinar auctor. Phasellus et placerat nulla. In hac habitasse platea dictumst',
              })
            }
            className="w-[200px] text-green-500 hover:text-green-700 focus:outline-none"
            title="Add Education"
          >
            +
          </button>
        )}
      </div>
    </div>
  );
};

export default EducationSection;
