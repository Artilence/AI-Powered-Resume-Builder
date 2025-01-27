/* eslint-disable react/prop-types */
import { useState } from 'react';

import {
  LeftTopSection,
  LeftBottomSection,
  ExperienceSection,
  EducationSection,
  LanguageSection,
} from './components/Sections';

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

  // Handler for text changes in experience fields

  return (
    <div className="a4-paper grid grid-cols-[305px_1fr]">
      {/* Left */}
      <div className="w-full h-full flex flex-col">
        {/* Left-Top */}
        <LeftTopSection
          userData={userData}
          setUserData={setUserData}
          setActiveQuill={setActiveQuill}
        />
        {/* Left-Bottom */}
        <LeftBottomSection
          userData={userData}
          setUserData={setUserData}
          setActiveQuill={setActiveQuill}
        />
      </div>
      {/* Right */}
      <div className="flex flex-col w-full h-full">
        {/* experience */}
        <ExperienceSection
          userData={userData}
          setUserData={setUserData}
          setActiveQuill={setActiveQuill}
        />

        {/* Education */}
        <EducationSection
          userData={userData}
          setUserData={setUserData}
          setActiveQuill={setActiveQuill}
        />

        {/* Language */}
        <LanguageSection userData={userData} setActiveQuill={setActiveQuill} />
      </div>
    </div>
  );
};

export default ResumeTemplate2;
