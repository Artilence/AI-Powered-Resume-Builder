/* eslint-disable react/prop-types */
// src/components/ResumeTemplate.jsx
import { useState } from 'react';
import { QuillField } from '../../components';

import { handleTextChange } from '../../ResumeStateUtils';
import {
  EducationSection,
  ExperienceSection,
  SkillsSection,
} from './components';

const ResumeTemplate1 = ({ setActiveQuill }) => {
  const [fields, setFields] = useState({
    name: 'Your Name',
    summary: '',
    skills: [
      { id: Date.now().toString() + 1212312, content: 'Skill 1' },
      { id: Date.now().toString() + 1212311244, content: 'Skill 2' },
      { id: Date.now().toString() + 121231244, content: 'Skill 3' },
    ],
    experience: [
      {
        id: `${Date.now()}-112312312`,
        position: 'Job Title 1',
        company: 'Company 1',
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla ornare metus vel nunc pulvinar auctor. Phasellus et placerat nulla. In hac habitasse platea dictumst',
        startDate: '2025-01',
        endDate: '2030-01',
      },
      {
        id: Date.now().toString(),
        position: 'Job Title 2',
        company: 'Company 2',
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla ornare metus vel nunc pulvinar auctor. Phasellus et placerat nulla. In hac habitasse platea dictumst',
        startDate: '2025-01',
        endDate: '2030-01',
      },
    ],
    education: [
      {
        id: `${Date.now().toString()}+1111`,
        degree: 'Degree 1',
        institution: 'Institution 1',
        endDate: '2030-01',
      },
      {
        id: Date.now().toString(),
        degree: 'Degree 2',
        institution: 'Institution 2',
        endDate: '2030-01',
      },
    ],
  });

  return (
    <div className="w-[700px] h-[1200px] bg-white shadow-lg rounded-lg py-[40px] px-[20px] flex flex-col gap-4">
      <div className="pb-[30px] w-full text-[40px] font-bold text-gray-500 flex items-center justify-start">
        <QuillField
          defaultValue="name"
          onTextChange={(content) =>
            handleTextChange(setFields, 'name', content)
          }
          onSelectionChange={(range, quill, changeSpanDisplay) =>
            setActiveQuill(quill, changeSpanDisplay)
          }
        />
      </div>
      <div className="flex pb-[50px]  flex-col gap-5 w-full items-start justify-center">
        <div className="w-max flex gap-2 flex-col items-start justify-start">
          <span className="text-[14px] font-extrabold tracking-tighter uppercase ">
            Professional Summary
          </span>
          <span className="w-full h-[2px] bg-gray-300"></span>
        </div>
        <div className="w-full text-[14px] text-gray-500">
          <QuillField
            defaultValue="Enter your brief summary"
            onTextChange={(content) =>
              handleTextChange(setFields, 'summary', content)
            }
            onSelectionChange={(range, quill, changeSpanDisplay) =>
              setActiveQuill(quill, changeSpanDisplay)
            }
          />
        </div>
      </div>
      {/* Skills */}
      <SkillsSection
        fields={fields}
        setFields={setFields}
        setActiveQuill={setActiveQuill}
      />
      {/* Experience */}
      <div className="flex pb-[30px]  flex-col gap-10 w-full items-start justify-center">
        <div className="w-max flex gap-2 flex-col items-start justify-start">
          <span className="text-[14px] font-extrabold tracking-tighter uppercase ">
            Experience
          </span>
          <span className="w-full h-[2px] bg-gray-300"></span>
        </div>
        <ExperienceSection
          fields={fields}
          setFields={setFields}
          setActiveQuill={setActiveQuill}
        />
        {/* Education */}
        <EducationSection
          fields={fields}
          setFields={setFields}
          setActiveQuill={setActiveQuill}
        />
      </div>
    </div>
  );
};

export default ResumeTemplate1;
