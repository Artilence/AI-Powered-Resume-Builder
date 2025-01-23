import React, { useState } from 'react';
import { dummyProfilePicture } from '../assets';
import QuillField from '../pages/Resume-Editor/QuillJS/QuillField';
import { handleSelectionChange, handleTextChange } from '../ResumeStateUtils';

const ResumeTemplate2 = ({ setActiveQuill }) => {
  const [userData, setUserData] = useState({
    fullName: 'shohagh hossen',
    position: 'Graphic Designer',
    summary:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla ornare metus vel nunc pulvinar auctor. Phasellus et placerat nulla. In hac habitasse platea dictumst',
    skills: [
      {
        name: 'skill 1',
        level: 'Expert',
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
  return (
    <div className="a4-paper grid grid-cols-[30%_70%]">
      {/* Left */}
      <div className=" flex flex-col">
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
                defaultValue={userData.fullName}
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
                defaultValue={userData.position}
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
        <div className="h-full flex flex-col py-10  items-start justify-start bg-green-light">
          as
        </div>
      </div>
      {/* Right */}
      <div>right</div>
    </div>
  );
};

export default ResumeTemplate2;
