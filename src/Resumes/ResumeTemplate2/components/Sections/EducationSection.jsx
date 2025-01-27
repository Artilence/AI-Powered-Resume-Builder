/* eslint-disable react/prop-types */
import { QuillField } from '../../../../components';

import { handleTextChange } from '../../../../ResumeStateUtils';
import { handleSelectionChange } from '../../../../ResumeStateUtils';

const EducationSection = ({ userData, setUserData, setActiveQuill }) => {
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
                  onSelectionChange={(range, quill) =>
                    handleSelectionChange(setActiveQuill, range, quill)
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
                    onSelectionChange={(range, quill) =>
                      handleSelectionChange(setActiveQuill, range, quill)
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
                    onSelectionChange={(range, quill) =>
                      handleSelectionChange(setActiveQuill, range, quill)
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

export default EducationSection;
