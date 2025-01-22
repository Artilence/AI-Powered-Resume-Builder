// useFieldRefs.js
import React, { useRef, useEffect } from 'react';

/**
 * @param {Object} fields
 * @returns {Object}
 */

//Custom hook to generate basic structure of refs for the fields
export const useFieldRefs = (fields) => {
  const refs = useRef({});

  useEffect(() => {
    // Iterate over each key in the fields object
    Object.keys(fields).forEach((key) => {
      // If the ref for the key doesn't exist, create it
      if (!refs.current[key]) {
        if (Array.isArray(fields[key])) {
          // Initialize array fields with useRef([]) equivalent
          refs.current[key] = { current: [] };
        } else {
          // Initialize string fields with useRef()
          refs.current[key] = { current: null };
        }
      }
    });
  }, [fields]);

  return refs.current;
};

/**
 * @param {Array} skillsRefs
 * @param {Array} skillsFields
 */

//custom function to initialize refs for each skill we are dealing with
export const initializeSkillRefs = (skillsRefs, skillsFields) => {
  skillsFields.forEach((skill, index) => {
    if (!skillsRefs[index]) {
      // Create a new ref and assign it to the corresponding index
      skillsRefs[index] = React.createRef();
    }
  });

  // Optional: Remove refs if skillsFields has fewer items than skillsRefs
  while (skillsRefs.length > skillsFields.length) {
    skillsRefs.pop();
  }
};

/**
 * @param {Array} arrayRefs
 * @param {Array} arrayFields
 * @param {Object} options
 */

//custom function to initialize refs for each array field refs we are dealing with
//we add options to specify which keys we want to initialize refs for i.e only fields that we will use in quill editor
export const initializeArrayRefs = (arrayRefs, arrayFields, options) => {
  arrayFields.forEach((item, index) => {
    // Ensure an object exists at the current index
    if (!arrayRefs[index]) {
      arrayRefs[index] = {};
    }

    // Iterate over each key in options to create refs
    Object.keys(options).forEach((key) => {
      if (options[key] && !arrayRefs[index][key]) {
        arrayRefs[index][key] = React.createRef();
      }
    });
  });

  // Remove extra refs if the fields array has fewer items than the refs array
  while (arrayRefs.length > arrayFields.length) {
    arrayRefs.pop();
  }
};

/**
 * @param {Function} setText
 * @param {String} fieldName
 * @param {String} content
 */

//custom function to handle text change in quill editor
export const handleTextChange = (setText, fieldName, content) => {
  setText((prev) => ({
    ...prev,
    [fieldName]: content,
  }));
};

//To manage the selection changes in the fields
export const handleSelectionChange = (setActiveQuill, range, quill) => {
  if (range) {
    setActiveQuill(quill);
  } else {
    setActiveQuill(null);
  }
};

// To remove an experience
export const removeField = (setField, fieldName, index) => {
  setField((prev) => ({
    ...prev,
    [fieldName]: prev[fieldName].filter((_, i) => i !== index),
  }));
};

export const addField = (setField, fieldName, options) => {
  setField((prev) => ({
    ...prev,
    [fieldName]: [...prev[fieldName], options],
  }));
};

// src/utils/handleFieldUpdate.js

/**
 * Handles updates for multiple field types dynamically using index-based identifiers.
 *
 * @param {Function} setFields - The state setter function from useState.
 * @param {string} fieldType - The type of field to update ('skills', 'experience', 'education').
 * @param {number} index - The index of the item to update within the array.
 * @param {string} property - The property of the item to update (e.g., 'content', 'position').
 * @param {any} value - The new value to set for the specified property.
 */
export const handleFieldUpdate = (
  setFields,
  fieldType,
  index,
  property,
  value
) => {
  setFields((prevFields) => {
    // Ensure the field type exists in the state
    if (!prevFields[fieldType]) {
      console.warn(`Field type "${fieldType}" does not exist in the state.`);
      return prevFields;
    }

    // Create a shallow copy of the array to maintain immutability
    const updatedArray = [...prevFields[fieldType]];

    // Ensure the index is within bounds
    if (index < 0 || index >= updatedArray.length) {
      console.warn(
        `Index "${index}" is out of bounds for field type "${fieldType}".`
      );
      return prevFields;
    }

    // Update the specific property of the item at the given index
    updatedArray[index] = {
      ...updatedArray[index],
      [property]: value,
    };

    return {
      ...prevFields,
      [fieldType]: updatedArray,
    };
  });
};

export default handleFieldUpdate;
