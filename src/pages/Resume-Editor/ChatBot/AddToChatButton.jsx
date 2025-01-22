import { useContext, useEffect, useState } from 'react';

import { QuillDeltaToHtmlConverter } from 'quill-delta-to-html';
import { ChatbotContext } from '../../../app/Context/ChatBotContext';

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
  }, [currentQuill, activeQuill, setCurrentQuill]);

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
    //setting the editor state to editing
    setEditorState('EDITING');
    //getting the selected content
    const selectedDeltas = currentQuill?.getContents(range.index, range.length);
    const cfg = {};
    //converting the selected content to html
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

    // Then call demoResponse calling demoResponse that provides the new content
    const confirmed = demoResponse();
    console.log('confirmed', confirmed);
    currentQuill?.setContents(confirmed);
  };

  // Move demoResponse definition here, after all the context values are declared
  const demoResponse = () => {
    const demoResponse = '<p><strong>Hello Demo Response</strong><br/></p>';
    setNewContent(demoResponse);

    setEditorState('CHANGED');
    //converting the new content to delta
    const convertContent = (content) => {
      const newDelta = currentQuill?.clipboard?.convert({ html: content });
      return newDelta;
    };

    const first = firstContent;
    const original = JSON.parse(JSON.stringify(originalSelectedContent));
    const transformed = convertContent(newContent);
    const last = lastContent;

    // Apply styling
    const applyStyle = (ops, bgColor, color) => {
      ops.forEach((op) => {
        if (op.attributes) {
          op.attributes.background = bgColor;
          op.attributes.color = color;
        }
      });
    };

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

  return (
    <div
      className="fixed bottom-14  right-16 z-50 bg-btn-purple px-4 py-2 rounded-lg text-white font-bold text-3xl cursor-pointer"
      onClick={handleAddToChat}
    >
      AddToChatButton
    </div>
  );
};

export default AddToChatButton;
