/* eslint-disable react/prop-types */
// src/components/ResumeTemplate.jsx
import { useEffect, useState } from 'react';
import QuillField from '../pages/Resume-Editor/QuillJS/QuillField';
import {
  initializeArrayRefs,
  useFieldRefs,
  handleTextChange,
  handleSelectionChange,
  removeField,
  addField,
} from '../utils';

const ResumeTemplate = ({ setActiveQuill }) => {
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

  /*
  **Functionality of the Toolbar Integrated with Quill Editor**

  This section outlines how the toolbar operates in conjunction with the Quill editor to manage user data fields.

  **Key Operations:**

  1. **Initialization of Refs for Editable Fields:**
     - For every user data field that needs to be rendered and edited within the Quill editor, a corresponding `ref` is initialized.
     - These refs allow direct manipulation and access to the DOM elements managed by Quill.

  2. **Exclusion of Non-Editable Fields:**
     - Certain fields such as `startDate`, `id`, and `endDate` are designated as non-editable.
     - These fields are **not rendered** within the Quill editor to maintain data integrity and prevent unintended modifications.

  3. **Creation of a Ref Replica for User Data:**
     - A replica of the user data object is created where each editable field key maps to its corresponding `ref`.
     - This structure ensures that the refs mirror the user data's schema, facilitating seamless data binding and manipulation.

  **Implementation Steps:**

  - **Step 1: Establish Basic Ref Structure**
    - Initialize a foundational structure of refs for each primary field in the user data.
    - Example:
      ```javascript
      const refs = useRef({
        name: React.createRef(),
        summary: React.createRef(),
        skills: useRef([]),
        experience: useRef([]),
        education: useRef([]),
      });
      ```

  - **Step 2: Initialize Nested Field Refs with Control Options**
    - Utilize the `initializeArrayRefs()` helper function to set up refs for nested data structures such as `experience`, `education`, and `skills`.
    - **Control Options:** Specify which sub-fields within these nested structures should have refs, effectively excluding non-editable fields.
    - Example:
      ```javascript
      useEffect(() => {
        const experienceOptions = { position: true, company: true, description: true };
        initializeArrayRefs(refs.current.experience.current, fields.experience, experienceOptions);
      }, [fields.experience]);
      ```
    - This ensures that only the specified editable fields (`position`, `company`, `description`) within each experience entry have corresponding refs.

  **Summary:**

  - **Editable Fields Management:** By initializing refs for each editable field, the toolbar gains precise control over the data rendered in the Quill editor.
  - **Data Integrity:** Excluding non-editable fields from the editor prevents accidental modifications, maintaining the integrity of crucial data points like `id` and date fields.
  - **Scalability:** The approach of creating a replica object with refs allows for scalable management of dynamic and nested data structures, making it easier to handle complex user data schemas.

  **Note:** While this setup provides robust control over editable fields within the Quill editor, always ensure that any direct DOM manipulations via refs do not conflict with React's state management to prevent inconsistencies.
*/

  let quillRefs = useFieldRefs(fields);
  console.log(fields);

  useEffect(() => {
    initializeArrayRefs(quillRefs?.skills?.current, fields?.skills, {
      content: true,
    });
    initializeArrayRefs(quillRefs?.experience?.current, fields?.experience, {
      position: true,
      company: true,
      description: true,
    });
    initializeArrayRefs(quillRefs?.education?.current, fields?.education, {
      degree: true,
      institution: true,
    });
  }, [
    fields?.skills,
    quillRefs?.skills,
    fields?.experience,
    quillRefs?.experience,
    fields?.education,
    quillRefs?.education,
  ]);

  // Handler for text changes in skills
  const handleSkillChange = (index, content) => {
    setFields((prev) => {
      const updatedSkills = [...prev.skills];
      updatedSkills[index] = { ...updatedSkills[index], content };
      return { ...prev, skills: updatedSkills };
    });
  };

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

  return (
    <div className="w-[700px] h-[1200px] bg-white shadow-lg rounded-lg py-[40px] px-[20px] flex flex-col gap-4">
      <div className="pb-[30px] w-full text-[40px] font-bold text-gray-500 flex items-center justify-start">
        <QuillField
          ref={quillRefs?.name}
          readOnly={false}
          defaultValue="name"
          onTextChange={(content) =>
            handleTextChange(setFields, 'name', content)
          }
          onSelectionChange={(range, quill) =>
            handleSelectionChange(setActiveQuill, range, quill)
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
            ref={quillRefs?.summary}
            readOnly={false}
            defaultValue="Enter your brief summary"
            onTextChange={(content) =>
              handleTextChange(setFields, 'summary', content)
            }
            onSelectionChange={(range, quill) =>
              handleSelectionChange(setActiveQuill, range, quill)
            }
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
                ref={quillRefs?.skills?.current[index]}
                readOnly={false}
                defaultValue={skill.content}
                onTextChange={(content) => handleSkillChange(skill, content)}
                onSelectionChange={(range, quill) =>
                  handleSelectionChange(setActiveQuill, range, quill)
                }
              />
              <button
                onClick={() => removeField(setFields, 'skills', index)}
                className=" text-red-500 hover:text-red-700 focus:outline-none"
                title="Remove Skill"
              >
                &times;
              </button>
            </div>
          ))}
          <button
            onClick={() =>
              addField(setFields, 'skills', {
                id: Date.now().toString(),
                content: 'New Skill',
              })
            }
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
                  onSelectionChange={(range, quill) =>
                    handleSelectionChange(setActiveQuill, range, quill)
                  }
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
                  onSelectionChange={(range, quill) =>
                    handleSelectionChange(setActiveQuill, range, quill)
                  }
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
                  onSelectionChange={(range, quill) =>
                    handleSelectionChange(setActiveQuill, range, quill)
                  }
                />
              </div>
              <button
                onClick={() => removeField(setFields, 'experience', index)}
                className="text-red-500 hover:text-red-700 focus:outline-none"
                title="Remove Experience"
              >
                &times;
              </button>
            </div>
          ))}
          <button
            onClick={() =>
              addField(setFields, 'experience', {
                id: Date.now().toString(),
                position: 'New Job Title',
                company: 'New Company',
                description: 'New Job Description',
                startDate: '2025-01',
                endDate: '2030-01',
              })
            }
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
                    onSelectionChange={(range, quill) =>
                      handleSelectionChange(setActiveQuill, range, quill)
                    }
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
                    onSelectionChange={(range, quill) =>
                      handleSelectionChange(setActiveQuill, range, quill)
                    }
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
                  onClick={() => removeField(setFields, 'education', index)}
                  className="w-[200px] text-red-500 hover:text-red-700 focus:outline-none"
                  title="Remove Education"
                >
                  &times;
                </button>
              </div>
            ))}
            <button
              onClick={() =>
                addField(setFields, 'education', {
                  id: Date.now().toString(),
                  degree: 'Enter Your Degree here',
                  institution: 'Enter Your Institution here',
                  endDate: '2030-01',
                })
              }
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
