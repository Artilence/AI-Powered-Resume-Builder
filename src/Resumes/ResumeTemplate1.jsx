/* eslint-disable react/prop-types */
// src/components/ResumeTemplate.jsx
import React, { useRef, useEffect, useState } from 'react';
import QuillField from '../pages/Resume-Editor/QuillJS/QuillField';

const ResumeTemplate = ({ setActiveQuill }) => {
  //states to manage the editor fields
  //will also be used to set default ai generated values
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

  // Refs to manage Quill instances
  //To manage the quill instances for each field
  const quillRefs = {
    name: useRef(null),
    summary: useRef(null),
    skills: useRef([]),
    experience: useRef([]),
    education: useRef([]),
  };

  //To manage the text changes in the fields
  const handleTextChange = (fieldName, content) => {
    setFields((prev) => ({
      ...prev,
      [fieldName]: content,
    }));
  };

  //To manage the selection changes in the fields
  const handleSelectionChange = (range, quill) => {
    if (range) {
      setActiveQuill(quill);
    } else {
      setActiveQuill(null);
    }
  };

  //SKILLS LOGIC
  //To manage the skills rendering logic
  useEffect(() => {
    quillRefs.skills.current = fields.skills.map(
      (skill, i) => quillRefs.skills.current[i] || React.createRef()
    );
  }, [fields.skills, fields.skills.length, quillRefs.skills]);

  // Handler for text changes in skills
  const handleSkillChange = (index, content) => {
    setFields((prev) => {
      const updatedSkills = [...prev.skills];
      updatedSkills[index] = { ...updatedSkills[index], content };
      return { ...prev, skills: updatedSkills };
    });
  };
  //To add a new skill
  const addSkill = () => {
    setFields((prev) => ({
      ...prev,
      skills: [
        ...prev.skills,
        { id: Date.now().toString(), content: 'New Skill' },
      ],
    }));
  };

  //To remove a skill
  const removeSkill = (index) => {
    setFields((prev) => ({
      ...prev,
      skills: prev.skills.filter((_, i) => i !== index),
    }));
  };

  // EXPERIENCE LOGIC
  // To manage experience rendering logic
  useEffect(() => {
    // Create refs for each experience item
    quillRefs.experience.current = fields.experience.map((exp, i) => ({
      position: quillRefs.experience.current[i]?.position || React.createRef(),
      company: quillRefs.experience.current[i]?.company || React.createRef(),
      description:
        quillRefs.experience.current[i]?.description || React.createRef(),
    }));
  }, [fields.experience, fields.experience.length, quillRefs.experience]);

  // Handler for text changes in experience fields
  const handleExperienceChange = (id, field, value) => {
    setFields((prev) => ({
      ...prev,
      experience: prev.experience.map((exp) =>
        exp.id === id ? { ...exp, [field]: value } : exp
      ),
    }));
  };

  // To add a new experience
  const addExperience = () => {
    setFields((prev) => ({
      ...prev,
      experience: [
        ...prev.experience,
        {
          id: Date.now().toString(),
          position: 'New Job Title',
          company: 'New Company',
          description: 'New Job Description',
          startDate: '2025-01',
          endDate: '2030-01',
        },
      ],
    }));
  };

  // To remove an experience
  const removeExperience = (index) => {
    setFields((prev) => ({
      ...prev,
      experience: prev.experience.filter((_, i) => i !== index),
    }));
  };

  //EDUCATION LOGIC
  //To manage education rendering logic
  useEffect(() => {
    quillRefs.education.current = fields.education.map((edu, i) => ({
      degree: quillRefs.education.current[i]?.degree || React.createRef(),
      institution:
        quillRefs.education.current[i]?.institution || React.createRef(),
    }));
  }, [fields.education, fields.education.length, quillRefs.education]);

  const handleEducationChange = (index, field, value) => {
    setFields((prev) => ({
      ...prev,
      education: prev.education.map((edu, i) =>
        i === index ? { ...edu, [field]: value } : edu
      ),
    }));
  };

  const addEducation = () => {
    const newEducation = {
      degree: 'Enter Your Degree here',
      institution: 'Enter Your Institution here',
      endDate: '2030-01',
    };

    setFields((prev) => ({
      ...prev,
      education: [...prev.education, newEducation],
    }));
  };

  const removeEducation = (index) => {
    setFields((prev) => ({
      ...prev,
      education: prev.education.filter((_, i) => i !== index),
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
      <div className="flex pb-[50px]  flex-col gap-5 w-full items-start justify-center">
        <div className="w-max flex gap-2 flex-col items-start justify-start">
          <span className="text-[14px] font-extrabold tracking-tighter uppercase ">
            Professional Summary
          </span>
          <span className="w-full h-[2px] bg-gray-300"></span>
        </div>
        <div className="w-full text-[14px] text-gray-500">
          <QuillField
            ref={quillRefs?.summary}
            readOnly={false}
            defaultValue="Enter your brief summary"
            onTextChange={(content) => handleTextChange('summary', content)}
            onSelectionChange={handleSelectionChange}
          />
        </div>
      </div>
      <div className="flex  flex-col gap-10 pb-10 w-full items-start justify-center">
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
          <button
            onClick={addSkill}
            className="text-[12px] bg-gray-200 px-[10px] py-[10px] rounded-lg text-gray-500 hover:text-gray-700 focus:outline-none"
            title="Add Skill"
          >
            + Add Skill
          </button>
        </div>
      </div>
      <div className="flex pb-[30px]  flex-col gap-10 w-full items-start justify-center">
        <div className="w-max flex gap-2 flex-col items-start justify-start">
          <span className="text-[14px] font-extrabold tracking-tighter uppercase ">
            Experience
          </span>
          <span className="w-full h-[2px] bg-gray-300"></span>
        </div>
        <div className="w-full text-[12px] text-gray-500 flex flex-col gap-10">
          {fields.experience.map((exp, index) => (
            <div
              key={exp.id}
              className="flex flex-col gap-4 items-start justify-start w-full"
            >
              <div className="w-full flex justify-start items-center text-[16px] font-semibold">
                <QuillField
                  ref={quillRefs.experience?.current[index]?.position}
                  readOnly={false}
                  defaultValue={exp.position}
                  onTextChange={(content) =>
                    handleExperienceChange(exp, 'position', content)
                  }
                  onSelectionChange={handleSelectionChange}
                />
              </div>
              <div className="flex justify-start items-center w-max text-[14px] gap-5">
                <QuillField
                  ref={quillRefs.experience?.current[index]?.company}
                  readOnly={false}
                  defaultValue={exp.company}
                  onTextChange={(content) =>
                    handleExperienceChange(exp, 'company', content)
                  }
                  onSelectionChange={handleSelectionChange}
                />
                <input
                  type="month"
                  className="w-max text-[12px] text-gray-500"
                  // value={exp.startDate}
                  value={exp.startDate}
                  onChange={(e) =>
                    handleExperienceChange(exp.id, 'startDate', e.target.value)
                  }
                />
                <input
                  type="month"
                  className="w-max text-[12px] text-gray-500"
                  value={exp.endDate}
                  onChange={(e) =>
                    handleExperienceChange(exp.id, 'endDate', e.target.value)
                  }
                />
              </div>

              <div>
                <QuillField
                  ref={quillRefs.experience?.current[index]?.description}
                  readOnly={false}
                  defaultValue={exp.description}
                  onTextChange={(content) =>
                    handleExperienceChange(exp, 'description', content)
                  }
                  onSelectionChange={handleSelectionChange}
                />
              </div>
              <button
                onClick={() => removeExperience(index)}
                className="text-red-500 hover:text-red-700 focus:outline-none"
                title="Remove Experience"
              >
                &times;
              </button>
            </div>
          ))}
          <button
            onClick={addExperience}
            className="text-[12px] bg-gray-200 px-[10px] py-[10px] rounded-lg text-gray-500 hover:text-gray-700 focus:outline-none"
            title="Add Experience"
          >
            + Add Experience
          </button>
        </div>
        <div className="flex  flex-col gap-3 w-full items-start justify-center">
          <div className="w-max flex gap-2 flex-col items-start justify-start">
            <span className="text-[14px] font-extrabold tracking-tighter uppercase ">
              Education
            </span>
            <span className="w-full h-[2px] bg-gray-300"></span>
          </div>
          <div className="w-full flex  flex-col gap-6   text-gray-500 mb-2">
            {fields.education.map((edu, index) => (
              <div key={edu.id} className="flex flex-col gap-3 w-full">
                <div className="w-full text-[14px] font-semibold">
                  <QuillField
                    ref={quillRefs.education?.current[index]?.degree}
                    readOnly={false}
                    defaultValue={edu.degree}
                    onTextChange={(content) =>
                      handleEducationChange(edu, 'degree', content)
                    }
                    onSelectionChange={handleSelectionChange}
                  />
                </div>
                <div className="w-max text-[12px] text-gray-500 flex items-center justify-start gap-3">
                  <QuillField
                    ref={quillRefs.education?.current[index]?.institution}
                    readOnly={false}
                    defaultValue={edu.institution}
                    onTextChange={(content) =>
                      handleEducationChange(edu, 'institution', content)
                    }
                    onSelectionChange={handleSelectionChange}
                  />
                  <input
                    type="month"
                    className="w-max text-[12px] flex  text-gray-500"
                    value={edu.endDate}
                    onChange={(e) =>
                      handleEducationChange(index, 'endDate', e.target.value)
                    }
                  />
                </div>
                <button
                  onClick={() => removeEducation(index)}
                  className="w-[200px] text-red-500 hover:text-red-700 focus:outline-none"
                  title="Remove Education"
                >
                  &times;
                </button>
              </div>
            ))}
            <button
              onClick={addEducation}
              className="text-[12px] bg-gray-200 px-[10px] py-[10px] rounded-lg text-gray-500 hover:text-gray-700 focus:outline-none"
              title="Add Education"
            >
              + Add Education
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeTemplate;
