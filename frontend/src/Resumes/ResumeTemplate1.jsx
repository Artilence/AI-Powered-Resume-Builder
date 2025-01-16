// src/components/ResumeTemplate.jsx
import React, { useRef, useEffect, useState } from 'react';
import QuillField from '../pages/Resume-Editor/QuillJS/QuillField';
import PropTypes from 'prop-types';

const ResumeTemplate = ({ setActiveQuill }) => {
  const [fields, setFields] = useState({
    name: 'Your Name',
    summary: '',
    skills: [
      { id: `123123123`, content: 'Skill 1' },
      { id: `31131`, content: 'Skill 2' },
      { id: `132132`, content: 'Skill 3' },
    ],
    section1: '',
    section2: '',
    // Add more fields as needed
  });

  // Refs to manage Quill instances
  const quillRefs = {
    name: useRef(null),
    summary: useRef(null),
    skills: useRef([]),
    section1: useRef(null),
    section2: useRef(null),
    // Add more refs as needed
  };

  const handleTextChange = (fieldName, content) => {
    setFields((prev) => ({
      ...prev,
      [fieldName]: content,
    }));
  };

  // Setting Selected Field to Active Quill
  const handleSelectionChange = (range, quill) => {
    if (range) {
      setActiveQuill(quill);
    } else {
      setActiveQuill(null);
    }
  };

  //Adding Skills Rendering Logic:
  useEffect(() => {
    quillRefs.skills.current = fields.skills.map(
      (skill, i) => quillRefs.skills.current[i] || React.createRef()
    );
  }, [fields.skills.length]);

  // Handler for text changes in skills
  const handleSkillChange = (index, content) => {
    setFields((prev) => {
      const updatedSkills = [...prev.skills];
      updatedSkills[index] = { ...updatedSkills[index], content };
      return { ...prev, skills: updatedSkills };
    });
  };
  // Handler to add a new skill
  // Handler to add a new skill
  const addSkill = () => {
    setFields((prev) => ({
      ...prev,
      skills: [...prev.skills, { id: uuidv4(), content: '' }],
    }));
  };

  // Handler to remove a skill
  const removeSkill = (index) => {
    setFields((prev) => ({
      ...prev,
      skills: prev.skills.filter((_, i) => i !== index),
    }));
  };

  return (
    <div className="w-[700px] h-[1200px] bg-white shadow-lg rounded-lg py-[40px] px-[20px] flex flex-col gap-4">
      <div className="pb-[30px] w-full text-[40px] font-bold text-gray-500 flex items-center justify-start">
        <QuillField
          ref={quillRefs.name}
          readOnly={false}
          defaultValue="Your Name"
          onTextChange={(content) => handleTextChange('name', content)}
          onSelectionChange={handleSelectionChange}
        />
      </div>
      <div className="flex pb-[30px]  flex-col gap-3 w-full items-start justify-center">
        <div className="w-max flex gap-2 flex-col items-start justify-start">
          <span className="text-[14px] font-extrabold tracking-tighter uppercase ">
            Professional Summary
          </span>
          <span className="w-full h-[2px] bg-gray-300"></span>
        </div>
        <div className="w-full text-[12px] text-gray-500">
          <QuillField
            ref={quillRefs.summary}
            readOnly={false}
            defaultValue="Your Summary"
            onTextChange={(content) => handleTextChange('summary', content)}
            onSelectionChange={handleSelectionChange}
          />
        </div>
      </div>
      <div className="flex  flex-col gap-3 w-full items-start justify-center">
        <div className="w-max flex gap-2 flex-col items-start justify-start">
          <span className="text-[14px] font-extrabold tracking-tighter uppercase ">
            Skills
          </span>
          <span className="w-full h-[2px] bg-gray-300"></span>
        </div>
        <div className="w-full flex gap-2 flex-wrap text-[12px] text-gray-500 mb-2">
          {fields.skills.map((skill, index) => (
            <div
              key={skill.id}
              className="flex gap-4 items-center justify-center bg-gray-200 w-max px-[10px] py-[10px] text-[12px] rounded-lg"
            >
              <QuillField
                ref={quillRefs.skills.current[index]}
                readOnly={false}
                defaultValue={skill.content}
                onTextChange={(content) => handleSkillChange(skill, content)}
                onSelectionChange={handleSelectionChange}
              />
              {/* Remove Skill Button */}
              <button
                onClick={() => removeSkill(index)}
                className=" text-red-500 hover:text-red-700 focus:outline-none"
                title="Remove Skill"
              >
                &times;
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ResumeTemplate;
