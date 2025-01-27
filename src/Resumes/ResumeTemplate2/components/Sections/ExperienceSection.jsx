/* eslint-disable react/prop-types */
import { QuillField } from '../../../../components';

import { handleTextChange } from '../../../../ResumeStateUtils';
import { handleSelectionChange } from '../../../../ResumeStateUtils';

const ExperienceSection = ({ userData, setUserData, setActiveQuill }) => {
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
                  onFocus={(range, quill) =>
                    handleSelectionChange(setActiveQuill, range, quill)
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
                    onFocus={(range, quill) =>
                      handleSelectionChange(setActiveQuill, range, quill)
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
                    onFocus={(range, quill) =>
                      handleSelectionChange(setActiveQuill, range, quill)
                    }
                  />
                </span>
              </div>
            </div>
            <div className="w-full  pl-14 h-full">
              <QuillField
                defaultValue={experience?.description}
                onTextChange={(content) =>
                  handleTextChange(setUserData, 'summary', content)
                }
                onSelectionChange={(range, quill) =>
                  handleSelectionChange(setActiveQuill, range, quill)
                }
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExperienceSection;
