/* eslint-disable react/prop-types */
import { useState } from 'react';
import { dummyProfilePicture } from '../../assets';
import { QuillField } from '../../pages/ResumeEditorPage/components';
import {
  handleSelectionChange,
  handleTextChange,
} from '../../ResumeStateUtils';
import {
  PercentageSlider,
  DottedPercentageSlider,
} from './components/PercentageSliders';

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
      {
        degree: 'Bachelor of Science',
        institution: 'University of Technology',
        startDate: '2020-01',
        endDate: '2025-01',
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla ornare metus vel nunc pulvinar auctor. Phasellus et placerat nulla. In hac habitasse platea dictumst',
      },
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
      {
        position: 'Graphic Designer',
        company: 'Design Co',
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla ornare metus vel nunc pulvinar auctor. Phasellus et placerat nulla. In hac habitasse platea dictumst',
        startDate: '2020-01',
        endDate: '2025-01',
      },
      {
        position: 'Graphic Designer',
        company: 'Design Co',
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla ornare metus vel nunc pulvinar auctor. Phasellus et placerat nulla. In hac habitasse platea dictumst',
        startDate: '2020-01',
        endDate: '2025-01',
      },
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
      {
        name: 'English',
        level: 'beginner',
      },
      {
        name: 'English',
        level: 'beginner',
      },
    ],
  });

  const handleSkillChange = (index, content) => {
    setUserData((prev) => {
      const updatedSkills = [...prev.skills];
      updatedSkills[index] = { ...updatedSkills[index], content };
      return { ...prev, skills: updatedSkills };
    });
  };
  // Handler for text changes in experience fields
  const handleExperienceChange = (id, field, value) => {
    setUserData((prev) => ({
      ...prev,
      experience: prev.experience.map((exp) =>
        exp.id === id ? { ...exp, [field]: value } : exp
      ),
    }));
  };

  const handleEducationChange = (index, field, value) => {
    setUserData((prev) => ({
      ...prev,
      education: prev.education.map((edu, i) =>
        i === index ? { ...edu, [field]: value } : edu
      ),
    }));
  };
  return (
    <div className="a4-paper grid grid-cols-[305px_1fr]">
      {/* Left */}
      <div className="w-full h-full flex flex-col">
        {/* Left-Top */}
        <div className="flex flex-col items-center justify-center bg-green-dark py-20 gap-14 w-full">
          {/* Profile Picture */}
          <div className="w-[100px] h-[100px] border border-gray-300 overflow-hidden flex items-center justify-center transform -rotate-45">
            <div
              className="w-full h-full transform rotate-45 scale-[2]"
              style={{
                backgroundImage: `url(${dummyProfilePicture})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            ></div>
          </div>
          {/* Name and Position */}
          <div className="flex flex-col w-full items-center justify-center">
            <div className="text-white w-full text-center text-[20px] font-bold uppercase tracking-wider">
              {' '}
              <QuillField
                defaultValue={userData?.fullName}
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
                defaultValue={userData?.position}
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
      </div>
      {/* Right */}
      <div className="flex flex-col w-full h-full">
        {/* experience */}
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
                        handleExperienceChange(
                          experience.id,
                          'position',
                          content
                        )
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
        {/* Education */}
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
        <div className="w-full flex flex-col overflow-hidden  pl-28 ">
          <div className="w-full  flex gap-5 items-center">
            <span className="inline-block w-16 h-16 bg-green-dark flex-shrink-0 rounded-full" />
            <span className="text-green-light uppercase font-bold text-[18px]">
              Language
            </span>
            <span className="w-full h-[3px] bg-green-light"></span>
          </div>
          <div className="w-full h-full flex flex-col ml-[4%]">
            <div className="w-full h-full border-l-4 border-l-green-dark">
              <div className="w-full h-full flex flex-col  pl-14 pb-10 pt-20 gap-5">
                {userData?.language?.map((language, index) => (
                  <div key={index} className="flex items-center gap-5">
                    <div>
                      <QuillField
                        defaultValue={language?.name}
                        onSelectionChange={(range, quill) =>
                          handleSelectionChange(setActiveQuill, range, quill)
                        }
                      />
                    </div>
                    <div className="w-full h-[15px]">
                      <DottedPercentageSlider level={language?.level} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeTemplate2;
