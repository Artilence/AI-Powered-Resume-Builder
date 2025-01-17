import React, { useEffect, useRef } from 'react';
import Quill from 'quill';
import 'quill/dist/quill.snow.css';

const QuillField = ({ fieldName, value, onChange }) => {
  const editorRef = useRef(null); // Reference for the editor container
  const quillInstanceRef = useRef(null); // To store the Quill instance

  useEffect(() => {
    if (editorRef.current && !quillInstanceRef.current) {
      // Initialize Quill editor
      const quill = new Quill(editorRef.current, {
        theme: 'snow',
        modules: {
          toolbar: false, // No toolbar inside the individual field
        },
      });

      // Set initial content and listen for changes
      quill.root.innerHTML = value || ''; // Safely set initial content
      quill.on('text-change', () => {
        onChange(fieldName, quill.root.innerHTML); // Pass changes back to parent
      });

      quillInstanceRef.current = quill; // Save Quill instance
    }
  }, [fieldName, onChange]);

  useEffect(() => {
    if (quillInstanceRef.current) {
      const quill = quillInstanceRef.current;
      if (quill.root.innerHTML !== value) {
        quill.root.innerHTML = value || ''; // Update content dynamically
      }
    }
  }, [value]);

  return (
    <div
      ref={editorRef}
      style={{
        border: '1px solid #ccc',
        minHeight: '50px',
        marginBottom: '10px',
        padding: '5px',
        background: '#fff',
      }}
    ></div>
  );
};

export default QuillField;
