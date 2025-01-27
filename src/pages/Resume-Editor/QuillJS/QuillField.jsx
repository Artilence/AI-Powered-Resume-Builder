/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
// src/components/QuillField.jsx
import { forwardRef, useEffect, useRef, useLayoutEffect } from 'react';
import Quill from 'quill';
import 'quill/dist/quill.bubble.css';

const QuillField = forwardRef(
  (
    { readOnly = false, defaultValue = '', onTextChange, onSelectionChange },
    ref
  ) => {
    const containerRef = useRef(null);
    const quillInstanceRef = useRef(null);

    // Update event handlers to avoid stale closures
    const onTextChangeRef = useRef(onTextChange);
    const onSelectionChangeRef = useRef(onSelectionChange);

    useLayoutEffect(() => {
      onTextChangeRef.current = onTextChange;
      onSelectionChangeRef.current = onSelectionChange;
    }, [onTextChange, onSelectionChange]);

    useEffect(() => {
      if (containerRef.current && !quillInstanceRef.current) {
        // Initialize Quill editor
        const quill = new Quill(containerRef.current, {
          theme: 'bubble',
          modules: {
            toolbar: false,
            history: {
              delay: 1000,
              maxStack: 100,
              userOnly: true,
            },
          },
          formats: [
            'bold',
            'italic',
            'underline',
            'strike',
            'list',
            'align',
            'background',
          ],
        });

        // Set default content if provided
        if (defaultValue) {
          quill.setText(defaultValue);
        }

        // Forward the Quill instance to parent via ref
        quillInstanceRef.current = quill;
        if (ref && typeof ref === 'object') {
          ref.current = quill;
        }

        // Listen for text changes
        // Listen for text changes
        quill.on('text-change', () => {
          let text = quill.getText(); // Get plain text
          text = text.replace(/\n/g, ' '); // Replace \n with space
          onTextChangeRef.current(text);
        });

        // Listen for selection changes
        quill.on('selection-change', (range) => {
          onSelectionChangeRef.current(range, quill);
        });
      }

      // Cleanup on unmount
      return () => {
        if (quillInstanceRef.current) {
          quillInstanceRef.current.off('text-change');
          quillInstanceRef.current.off('selection-change');
          quillInstanceRef.current = null;
          if (ref && typeof ref === 'object') {
            ref.current = null;
          }
        }
      };
    }, [defaultValue, ref]);

    // Handle readOnly prop changes
    useEffect(() => {
      if (quillInstanceRef.current) {
        quillInstanceRef.current.enable(!readOnly);
      }
    }, [readOnly]);

    return (
      <div
        ref={containerRef}
        className="w-full h-full !outline-none !border-none p-0 m-0"
      ></div>
    );
  }
);

export default QuillField;
