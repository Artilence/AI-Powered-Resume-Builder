import { useContext, useEffect, useState } from 'react';

import { QuillDeltaToHtmlConverter } from 'quill-delta-to-html';
import { ChatbotContext } from '../../../app/Context/ChatBotContext';
import { current } from '@reduxjs/toolkit';

const AddToChatButton = ({ activeQuill }) => {
  //Making clone of the current quill editor to avoid mutating the original quill editor
  const {
    currentQuill,
    setCurrentQuill,
    setFirstContent,
    setLastContent,
    setSelectedContent,
    setEditorState,
    setNewContent,
    firstContent,
    lastContent,
    selectedContent,
    editorState,
    newContent,
    content,
    setContent,
    originalSelectedContent,
    setOriginalSelectedContent,
  } = useContext(ChatbotContext);

  useEffect(() => {
    setCurrentQuill(activeQuill);
    // //focusing the quill editor again after btn is clicked

    currentQuill?.focus();
  }, [currentQuill, activeQuill, setCurrentQuill, setEditorState]);

  //will be used to add the content to the chat
  const handleAddToChat = async (e) => {
    e.preventDefault();
    //getting the range of the selected content
    const range = currentQuill?.getSelection();
    if (!range || range.length === 0) {
      setCurrentQuill(null);
      console.log('no range');

      return;
    }
    //setting the editor state to Changed to disable all editors
    setEditorState('CHANGING');
    //getting the selected content and converting it to html
    const selectedDeltas = currentQuill?.getContents(range.index, range.length);
    const cfg = {};
    const converter = new QuillDeltaToHtmlConverter(selectedDeltas.ops, cfg);
    const selectedHtml = converter.convert();

    // First update all the states
    const firstContentValue = currentQuill?.getContents(0, range.index);
    const lastContentValue = currentQuill?.getContents(
      range.index + range.length
    );

    await Promise.all([
      setFirstContent(firstContentValue),
      setLastContent(lastContentValue),
      setSelectedContent(selectedHtml),
      setOriginalSelectedContent(selectedDeltas),
    ]);
  };

  // Move demoResponse definition here, after all the context values are declared
  const demoResponse = () => {
    const demoResponse = '<p><strong>Hello Demo Response</strong><br/></p>';
    setNewContent(demoResponse);

    setEditorState('CHANGED');
    //converting response to delta
    const convertContent = (content) => {
      const newDelta = currentQuill?.clipboard?.convert({ html: content });
      return newDelta;
    };

    const first = firstContent;
    const original = JSON.parse(JSON.stringify(originalSelectedContent));
    const transformed = convertContent(newContent);
    const last = lastContent;

    // Apply styling
    /**
     * Applies background and text color styles to each Delta operation.
     * - Overwrites existing 'color' and 'background' attributes if they exist.
     * - Creates the 'attributes' object and assigns 'color' and 'background' if they don't exist.
     * - Returns a new array of operations without mutating the original.
     *
     * @param {Array} ops - Array of Delta operations.
     * @param {string} bgColor - The background color to apply (e.g., 'lightgreen', '#FF0000').
     * @param {string} color - The text color to apply (e.g., 'green', '#0000FF').
     * @returns {Array} - New array of Delta operations with updated styles.
     */
    const applyStyle = (ops, bgColor, color) => {
      return ops.map((op) => {
        // Clone the operation to avoid mutating the original
        if (op?.attributes) {
          op.attributes = {
            ...op.attributes,
            background: bgColor,
            color: color,
          };
        } else {
          op.attributes = {
            background: bgColor,
            color: color,
          };
        }
      });
    };

    console.log('original', original);

    applyStyle(original.ops, 'pink', 'red');
    applyStyle(transformed.ops, 'lightgreen', 'green');
    console.log([
      ...first.ops,
      ...original.ops,
      ...transformed.ops,
      ...last.ops,
    ]);

    return [...first.ops, ...original.ops, ...transformed.ops, ...last.ops];

    switch (editorState) {
      case 'CHANGED':
        console.log('original', original);

        applyStyle(original.ops, 'pink', 'red');
        applyStyle(transformed.ops, 'lightgreen', 'green');
        console.log([
          ...first.ops,
          ...original.ops,
          ...transformed.ops,
          ...last.ops,
        ]);

        return [...first.ops, ...original.ops, ...transformed.ops, ...last.ops];
      case 'ACCEPTED':
        return [...first.ops, ...transformed.ops, ...last.ops];
      case 'REJECTED':
        return [...first.ops, ...original.ops, ...last.ops];
      default:
        return [];
    }
  };

  const handleSendChatRequest = () => {
    const demoResponse = '<p><strong>Hello Demo Response</strong><br/></p>';
    setNewContent(demoResponse);

    setEditorState('CHANGED');
    //converting response to delta
    const convertContent = (content) => {
      const newDelta = currentQuill?.clipboard?.convert({ html: content });
      return newDelta;
    };

    const first = firstContent;
    const original = JSON.parse(JSON.stringify(originalSelectedContent));
    const transformed = convertContent(`<br/>${newContent}`);
    const last = lastContent;

    const applyStyle = (ops, bgColor, color) => {
      return ops.map((op) => {
        // Clone the operation to avoid mutating the original
        if (op?.attributes) {
          op.attributes = {
            ...op.attributes,
            background: bgColor,
            color: color,
          };
        } else {
          op.attributes = {
            background: bgColor,
            color: color,
          };
        }
      });
    };

    applyStyle(original.ops, 'pink', 'red');
    applyStyle(transformed.ops, 'lightgreen', 'green');
    console.log([
      ...first.ops,
      ...original.ops,
      ...transformed.ops,
      ...last.ops,
    ]);

    currentQuill?.setContents([
      ...first.ops,
      ...original.ops,
      ...transformed.ops,
      ...last.ops,
    ]);
  };

  const setEditorContents = (
    option,
    original,
    transformed,
    first,
    last,
    applyStyle
  ) => {
    switch (option) {
      case 'CHANGED':
        applyStyle(original.ops, 'pink', 'red');
        applyStyle(transformed.ops, 'lightgreen', 'green');
        return currentQuill?.setContents([
          ...first.ops,
          ...original.ops,
          ...transformed.ops,
          ...last.ops,
        ]);
      case 'ACCEPTED':
        return currentQuill?.setContents([
          ...first.ops,
          ...transformed.ops,
          ...last.ops,
        ]);
      case 'REJECTED':
        return currentQuill?.setContents([
          ...first.ops,
          ...original.ops,
          ...last.ops,
        ]);
      default:
        return [];
    }
  };

  const handleUserResponse = (option) => {
    const first = firstContent;
    const original = JSON.parse(JSON.stringify(originalSelectedContent));
    const convertContent = (content) => {
      const newDelta = currentQuill?.clipboard?.convert({ html: content });
      return newDelta;
    };
    const transformed = convertContent(`${newContent}`);
    const last = lastContent;
    if (option === 'ACCEPTED') {
      currentQuill?.setContents([
        ...first.ops,
        ...transformed.ops,
        ...last.ops,
      ]);
    }
    if (option === 'REJECTED') {
      currentQuill?.setContents([...first.ops, ...original.ops, ...last.ops]);
    }
    setEditorState('EDITING');
    setCurrentQuill(null);
  };
  console.log('editorState', editorState);

  return (
    <div className="fixed bottom-14 flex gap-4  right-16 z-50 bg-white-transparent-2 px-4 py-2 rounded-lg text-white font-bold text-3xl ">
      {editorState === 'EDITING' && (
        <button
          className="px-4 py-2 bg-btn-purple cursor-pointer rounded-lg"
          onClick={handleAddToChat}
        >
          Add to Chat
        </button>
      )}
      {editorState === 'CHANGING' && (
        <div>
          <button
            className="px-4 py-2 bg-btn-purple cursor-pointer rounded-lg"
            onClick={handleSendChatRequest}
          >
            Send Chat Request
          </button>
        </div>
      )}
      {editorState === 'CHANGED' && (
        <div className="flex gap-4">
          <button
            className="px-4 py-2 bg-green-500 cursor-pointer rounded-lg"
            onClick={() => handleUserResponse('ACCEPTED')}
          >
            ACCEPT
          </button>
          <button
            className="px-4 py-2 bg-red-500 cursor-pointer rounded-lg"
            onClick={() => handleUserResponse('REJECTED')}
          >
            REJECT
          </button>
        </div>
      )}
    </div>
  );
};

export default AddToChatButton;
