/* eslint-disable react/prop-types */
import { useSelector } from 'react-redux';
import { QuillField } from '../../../../components';

import {
  addField,
  handleTextChange,
  removeField,
} from '../../../../ResumeStateUtils';
import { handleSelectionChange } from '../../../../ResumeStateUtils';

const ExperienceSection = ({ userData, setUserData, setActiveQuill }) => {
  const isTemplateDownloading = useSelector(
    (state) => state.ResumeEditorAndChatCrontrol.isTemplateDownloading
  );
  const handleExperienceChange = (id, field, value) => {
    setUserData((prev) => ({
      ...prev,
      experience: prev.experience.map((exp) =>
        exp.id === id ? { ...exp, [field]: value } : exp
      ),
    }));
  };
  return (
    <div className="w-full pl-28 pt-20 ">
      <div className="w-full flex gap-5 items-center">
        <span className="inline-block w-16 h-16 bg-green-dark flex-shrink-0 rounded-full" />
        <span className="text-green-light uppercase font-bold text-[18px]">
          Experience
        </span>
        <span className="w-full h-[3px] bg-green-light"></span>
      </div>
      <div className="w-full h-full flex flex-col pl-[4%] ">
        {userData?.experience?.map((experience, index) => (
          <div
            key={index}
            className="w-full  border-l-4 border-l-green-dark pb-10"
          >
            <div className="relative w-full flex justify-between items-center pt-20 pl-14">
              <span className="absolute -left-[2.6%] top-13  w-[20px] h-[20px] bg-green-dark rounded-[100%]" />

              <div className="uppercase font-semibold max-w-[200px] text-[14px]">
                <QuillField
                  onTextChange={(content) =>
                    handleExperienceChange(experience.id, 'position', content)
                  }
                  onSelectionChange={(range, quill) =>
                    handleSelectionChange(setActiveQuill, range, quill)
                  }
                  onFocus={(range, quill, changeSpanDisplay) =>
                    setActiveQuill(quill, changeSpanDisplay)
                  }
                  defaultValue={experience?.position}
                />
              </div>
              <div className="flex text-[10px] gap-2">
                <span className="w-[50px]">
                  <QuillField
                    defaultValue={experience?.startDate}
                    onTextChange={(content) =>
                      handleExperienceChange(
                        experience?.id,
                        'startDate',
                        content
                      )
                    }
                    onFocus={(range, quill, changeSpanDisplay) =>
                      setActiveQuill(quill, changeSpanDisplay)
                    }
                  />
                </span>
                -
                <span className="w-[50px]">
                  <QuillField
                    defaultValue={experience?.endDate}
                    onTextChange={(content) =>
                      handleTextChange(setUserData, 'endDate', content)
                    }
                    onFocus={(range, quill, changeSpanDisplay) =>
                      setActiveQuill(quill, changeSpanDisplay)
                    }
                  />
                </span>
              </div>
            </div>
            {!isTemplateDownloading && (
              <button
                onClick={() => removeField(setUserData, 'experience', index)}
                className="w-[200px] text-red-500 hover:text-red-700 focus:outline-none"
                title="Remove Experience"
              >
                &times;
              </button>
            )}
            <div className="w-full  pl-14 h-full">
              <QuillField
                defaultValue={experience?.description}
                onTextChange={(content) =>
                  handleTextChange(setUserData, 'summary', content)
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
              addField(setUserData, 'experience', {
                position: 'Graphic Designer',
                company: 'Design Co',
                startDate: '2020-01',
                endDate: '2025-01',
                description:
                  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla ornare metus vel nunc pulvinar auctor. Phasellus et placerat nulla. In hac habitasse platea dictumst',
              })
            }
          >
            +
          </button>
        )}
      </div>
    </div>
  );
};

export default ExperienceSection;
