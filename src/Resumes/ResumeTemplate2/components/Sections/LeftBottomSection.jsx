/* eslint-disable react/prop-types */
import { QuillField } from '../../../../components';

import { handleTextChange } from '../../../../ResumeStateUtils';
import { handleSelectionChange } from '../../../../ResumeStateUtils';
import { PercentageSlider } from '../PercentageSliders';
const LeftBottomSection = ({ userData, setUserData, setActiveQuill }) => {
  const handleSkillChange = (index, content) => {
    setUserData((prev) => {
      const updatedSkills = [...prev.skills];
      updatedSkills[index] = { ...updatedSkills[index], content };
      return { ...prev, skills: updatedSkills };
    });
  };
  return (
    <div className="h-full    grid grid-rows-[1fr_2fr_1fr] w-full pt-10  px-5 gap-5  bg-green-light">
      {/* About me */}
      <div className="flex flex-col gap-5 w-full">
        <div className="w-full flex items-center justify-start gap-5">
          <span className="w-[24px] h-[24px] rounded-full bg-green-dark"></span>
          <span className="text-white uppercase font-bold text-[18px]">
            about me
          </span>
        </div>
        <div className="w-full text-white text-[14px]">
          <QuillField
            defaultValue={userData?.summary}
            onTextChange={(content) =>
              handleTextChange(setUserData, 'summary', content)
            }
            onSelectionChange={(range, quill) =>
              handleSelectionChange(setActiveQuill, range, quill)
            }
          />
        </div>
      </div>
      {/* Skills */}
      <div className="flex flex-col w-full gap-5">
        <div className="flex items-center justify-start gap-5">
          <span className="w-[24px] h-[24px] rounded-full bg-green-dark"></span>
          <span className="text-white uppercase font-bold text-[18px]">
            My skills
          </span>
        </div>
        {userData?.skills?.map((skill, index) => (
          <div
            key={index}
            className="flex items-center flex-col w-full gap-2 justify-start text-white text-[12px]"
          >
            <QuillField
              defaultValue={skill?.name}
              onTextChange={(content) => handleSkillChange(skill, content)}
              onSelectionChange={(range, quill) =>
                handleSelectionChange(setActiveQuill, range, quill)
              }
            />
            <div className="w-full h-[15px]">
              <PercentageSlider level={skill?.level} />
            </div>
          </div>
        ))}
      </div>
      {/* Address and links */}
      <div className="flex flex-col gap-5">
        <div className="flex items-center justify-start gap-5">
          <span className="w-[24px] h-[24px] rounded-full bg-green-dark"></span>
          <span className="text-white uppercase font-bold text-[18px]">
            contact me
          </span>
        </div>
        <div className="w-full flex flex-col gap-5">
          <div className="flex w-full items-center gap-5">
            <span className="!w-[30px]  !h-[25px] bg-white rounded-[100%]" />
            <div className="w-full h-max text-white text-[12px]">
              <QuillField
                defaultValue={userData?.address}
                onTextChange={(content) =>
                  handleTextChange(setUserData, 'address', content)
                }
                onSelectionChange={(range, quill) =>
                  handleSelectionChange(setActiveQuill, range, quill)
                }
              />
            </div>
          </div>
          <div className="flex w-full items-center gap-5">
            <span className="!w-[30px]  !h-[25px] bg-white rounded-[100%]" />
            <div className="w-full h-max text-white text-[12px]">
              <QuillField
                defaultValue={userData?.email}
                onTextChange={(content) =>
                  handleTextChange(setUserData, 'email', content)
                }
                onSelectionChange={(range, quill) =>
                  handleSelectionChange(setActiveQuill, range, quill)
                }
              />
            </div>
          </div>
          <div className="flex w-full items-center gap-5">
            <span className="!w-[30px]  !h-[25px] bg-white rounded-[100%]" />
            <div className="w-full h-max text-white text-[12px]">
              <QuillField
                defaultValue={userData?.phone}
                onTextChange={(content) =>
                  handleTextChange(setUserData, 'phone', content)
                }
                onSelectionChange={(range, quill) =>
                  handleSelectionChange(setActiveQuill, range, quill)
                }
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeftBottomSection;
