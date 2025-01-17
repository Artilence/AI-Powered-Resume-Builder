import { useState } from 'react';
import QuillField from '../pages/Resume-Editor/QuillJS/QuillEditor';

const ResumeTemplate1 = () => {
  const [fields, setFields] = useState({
    name: 'Your Name',
    summary: 'This is a summary of your professional experience.',
    skills: 'Skill 1, Skill 2, Skill 3',
  });

  const handleFieldChange = (fieldName, content) => {
    setFields((prev) => ({
      ...prev,
      [fieldName]: content, // Update the specific field
    }));
  };

  return (
    <div className="w-[700px] h-[1100px] bg-white ">
      <div style={{ fontFamily: 'Arial, sans-serif', padding: '20px' }}>
        <h1>Dynamic Quill Fields</h1>
        <div>
          <h2>Name</h2>
          <QuillField
            fieldName="name"
            value={fields.name}
            onChange={handleFieldChange}
          />
        </div>
        <div>
          <h2>Summary</h2>
          <QuillField
            fieldName="summary"
            value={fields.summary}
            onChange={handleFieldChange}
          />
        </div>
        <div>
          <h2>Skills</h2>
          <QuillField
            fieldName="skills"
            value={fields.skills}
            onChange={handleFieldChange}
          />
        </div>

        <button
          onClick={() => console.log('Fields State:', fields)}
          style={{
            marginTop: '20px',
            padding: '10px 20px',
            background: 'blue',
            color: 'white',
            border: 'none',
            cursor: 'pointer',
          }}
        >
          Save & Log State
        </button>
      </div>
    </div>
  );
};

export default ResumeTemplate1;
