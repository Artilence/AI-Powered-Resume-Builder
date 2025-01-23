import React, { useState } from 'react';
import { dummyProfilePicture } from '../assets';
import QuillField from '../pages/Resume-Editor/QuillJS/QuillField';
import { handleSelectionChange, handleTextChange } from '../ResumeStateUtils';
import PercentageSlider from '../components/PercentageSlider';

const ResumeTemplate2 = ({ setActiveQuill }) => {
  const [userData, setUserData] = useState({
    fullName: 'shohagh hossen',
    position: 'Graphic Designer',
    summary:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla ornare metus vel nunc pulvinar auctor. Phasellus et placerat nulla. In hac habitasse platea dictumst',
    skills: [
      {
        name: 'skill 1',
        level: 'expert',
      },
      {
        name: 'skill 1',
        level: 'beginner',
      },
      {
        name: 'skill 1',
        level: 'intermediate',
      },
    ],
    address: 'Somewhere in the world',
    email: 'shohagh@gmail.com',
    phone: '01234567890',
    education: [
      {
        degree: 'Bachelor of Science',
        institution: 'University of Technology',
        startDate: '2020-01',
        endDate: '2025-01',
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla ornare metus vel nunc pulvinar auctor. Phasellus et placerat nulla. In hac habitasse platea dictumst',
      },
    ],
    experience: [
      {
        position: 'Graphic Designer',
        company: 'Design Co',
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla ornare metus vel nunc pulvinar auctor. Phasellus et placerat nulla. In hac habitasse platea dictumst',
        startDate: '2020-01',
        endDate: '2025-01',
      },
    ],
    language: [
      {
        name: 'English',
        level: 'expert',
      },
    ],
  });

  const handleSkillChange = (index, content) => {
    setUserData((prev) => {
      const updatedSkills = [...prev.skills];
      updatedSkills[index] = { ...updatedSkills[index], content };
      return { ...prev, skills: updatedSkills };
    });

    // Handler for text changes in experience fields
    const handleExperienceChange = (id, field, value) => {
      setFields((prev) => ({
        ...prev,
        experience: prev.experience.map((exp) =>
          exp.id === id ? { ...exp, [field]: value } : exp
        ),
      }));
    };

    const handleEducationChange = (index, field, value) => {
      setFields((prev) => ({
        ...prev,
        education: prev.education.map((edu, i) =>
          i === index ? { ...edu, [field]: value } : edu
        ),
      }));
    };
  };
  return (
    <div className="a4-paper grid grid-cols-[35%_65%]">
      {/* Left */}
      <div className="w-full flex flex-col">
        {/* Left-Top */}
        <div className="flex flex-col items-center justify-center bg-green-dark py-20 gap-14 w-full">
          {/* Profile Picture */}
          <div className="w-[100px] h-[100px] border border-gray-300 flex items-center justify-center overflow-hidden transform -rotate-45">
            <img
              src={dummyProfilePicture}
              alt=""
              className="w-[200%] h-[200%] transform rotate-45 object-cover"
            />
          </div>
          {/* Name and Position */}
          <div className="flex flex-col w-full items-center justify-center">
            <div className="text-white w-full text-center text-[20px] font-bold uppercase tracking-wider">
              {' '}
              <QuillField
                defaultValue="Dummy Name"
                onTextChange={(content) =>
                  handleTextChange(setUserData, 'fullName', content)
                }
                onSelectionChange={(range, quill) =>
                  handleSelectionChange(setActiveQuill, range, quill)
                }
                defaultStyles={{
                  align: 'center',
                }}
              />
            </div>
            <div className="text-white w-full font-normal capitalize text-[14px] tracking-wider">
              <QuillField
                defaultValue="Dummy Position"
                onTextChange={(content) =>
                  handleTextChange(setUserData, 'position', content)
                }
                onSelectionChange={(range, quill) =>
                  handleSelectionChange(setActiveQuill, range, quill)
                }
                defaultStyles={{
                  align: 'center',
                }}
              />
            </div>
          </div>
        </div>
        {/* Left-Bottom */}
        <div className="h-full   grid grid-rows-[1fr_2fr_1fr] w-full py-10 px-5 gap-5  bg-green-light">
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
                defaultValue="Dummy Summary"
                onTextChange={(content) =>
                  handleTextChange(setUserData, 'summary', content)
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
                  defaultValue="Dummy Skill "
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
                    defaultValue="Dummy Address"
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
                    defaultValue="Dummy Email"
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
                    defaultValue="Dummy Phone"
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
      </div>
      {/* Right */}
      <div className="w-full h-full">
        {/* experience */}
        <div className="w-full pl-28 pt-20">
          <div className="w-full flex gap-5 items-center">
            <span className="inline-block w-16 h-16 bg-green-dark flex-shrink-0 rounded-full" />
            <span className="text-green-light uppercase font-bold text-[18px]">
              Experience
            </span>
            <span className="w-full h-[3px] bg-green-light"></span>
          </div>
          <div className="w-full h-full flex flex-col ml-[4%]">
            {userData?.experience?.map((experience, index) => (
              <div
                key={index}
                className="w-full h-[400px] border-l-4 border-l-green-dark"
              >
                <div>
                  <div>
                    <QuillField defaultValue="Dummy Position" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeTemplate2;
