// src/components/QuillToolbar.jsx
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
  T_Bold,
  T_Italic,
  T_Underline,
  T_Strikethrough,
  T_NumberedList,
  T_BulletList,
  T_Undo, // Import the Undo icon
  T_Redo,
  T_alignleft,
  arrowDown, // Import the Redo icon
} from '../../../assets'; // Ensure all icons are correctly imported

const QuillToolbar = ({ activeQuill }) => {
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isUnderline, setIsUnderline] = useState(false);
  const [isStrikethrough, setIsStrikethrough] = useState(false);
  const [isOrderedList, setIsOrderedList] = useState(false);
  const [isUnorderedList, setIsUnorderedList] = useState(false);
  const [textAlign, setTextAlign] = useState('');

  // New state variables for Undo and Redo
  const [canUndo, setCanUndo] = useState(false);
  const [canRedo, setCanRedo] = useState(false);

  //Function to align-text
  const toggleAlignText = (value) => {
    if (activeQuill) {
      const range = activeQuill.getSelection();
      if (range) {
        console.log('clicked');
        setTextAlign(value);

        const currentFormat = activeQuill.getFormat(range);
        console.log(value);

        const { index, length } = range;
        activeQuill.formatLine(index, length, 'align', value);
      }
    }
  };

  // Function to toggle bold formatting
  const toggleBold = () => {
    if (activeQuill) {
      const range = activeQuill.getSelection();
      if (range) {
        const currentFormat = activeQuill.getFormat(range);
        activeQuill.format('bold', !currentFormat.bold);
      }
    }
  };

  // Function to toggle italic formatting
  const toggleItalic = () => {
    if (activeQuill) {
      const range = activeQuill.getSelection();
      if (range) {
        const currentFormat = activeQuill.getFormat(range);
        activeQuill.format('italic', !currentFormat.italic);
      }
    }
  };

  // Function to toggle underline formatting
  const toggleUnderline = () => {
    if (activeQuill) {
      const range = activeQuill.getSelection();
      if (range) {
        const currentFormat = activeQuill.getFormat(range);
        activeQuill.format('underline', !currentFormat.underline);
      }
    }
  };

  // Function to toggle strikethrough formatting
  const toggleStrikethrough = () => {
    if (activeQuill) {
      const range = activeQuill.getSelection();
      if (range) {
        const currentFormat = activeQuill.getFormat(range);
        activeQuill.format('strike', !currentFormat.strike);
      }
    }
  };

  // Function to toggle ordered list formatting
  const toggleOrderedList = () => {
    if (activeQuill) {
      const range = activeQuill.getSelection();
      if (range) {
        const currentFormat = activeQuill.getFormat(range);
        const isCurrentlyOrdered = currentFormat.list === 'ordered';
        activeQuill.format('list', isCurrentlyOrdered ? false : 'ordered');

        // Ensure mutual exclusivity
        if (!isCurrentlyOrdered && currentFormat.list === 'bullet') {
          activeQuill.format('list', 'ordered');
        }
      }
    }
  };

  // Function to toggle unordered list formatting
  const toggleUnorderedList = () => {
    if (activeQuill) {
      const range = activeQuill.getSelection();
      if (range) {
        const currentFormat = activeQuill.getFormat(range);
        const isCurrentlyUnordered = currentFormat.list === 'bullet';
        activeQuill.format('list', isCurrentlyUnordered ? false : 'bullet');

        // Ensure mutual exclusivity
        if (!isCurrentlyUnordered && currentFormat.list === 'ordered') {
          activeQuill.format('list', 'bullet');
        }
      }
    }
  };

  // Function to perform undo action
  const toggleUndo = () => {
    if (activeQuill) {
      activeQuill.history.undo();
    }
  };

  // Function to perform redo action
  const toggleRedo = () => {
    if (activeQuill) {
      activeQuill.history.redo();
    }
  };

  useEffect(() => {
    if (activeQuill) {
      const handleSelectionChange = (range, oldRange, source) => {
        if (range) {
          const currentFormat = activeQuill.getFormat(range);
          setIsBold(currentFormat.bold || false);
          setIsItalic(currentFormat.italic || false);
          setIsUnderline(currentFormat.underline || false);
          setIsStrikethrough(currentFormat.strike || false);
          setIsOrderedList(currentFormat.list === 'ordered' || false);
          setIsUnorderedList(currentFormat.list === 'bullet' || false);
          setTextAlign(currentFormat.align || 'left');
        } else {
          setIsBold(false);
          setIsItalic(false);
          setIsUnderline(false);
          setIsStrikethrough(false);
          setIsOrderedList(false);
          setIsUnorderedList(false);
          setTextAlign('left');
        }
      };

      activeQuill.on('selection-change', handleSelectionChange);

      // Update history state
      const updateHistoryState = () => {
        setCanUndo(activeQuill.history.stack.undo.length > 0);
        setCanRedo(activeQuill.history.stack.redo.length > 0);
      };

      activeQuill.on('text-change', updateHistoryState);
      activeQuill.on('selection-change', updateHistoryState);

      // Initialize the state
      updateHistoryState();

      return () => {
        activeQuill.off('selection-change', handleSelectionChange);
        activeQuill.off('text-change', updateHistoryState);
        activeQuill.off('selection-change', updateHistoryState);
      };
    } else {
      setIsBold(false);
      setIsItalic(false);
      setIsUnderline(false);
      setIsStrikethrough(false);
      setIsOrderedList(false);
      setIsUnorderedList(false);
      setTextAlign('left');
      setCanUndo(false);
      setCanRedo(false);
    }
  }, [activeQuill]);

  return (
    <div
      id="toolbar-custom"
      className="bg-gray-black flex items-center px-8 py-2 rounded-lg gap-3 absolute top-28  z-50 shadow-md"
    >
      {/* Undo Button */}
      <button
        type="button"
        onClick={toggleUndo}
        title="Undo"
        aria-label="Undo"
        className={`custom-editor-toolbar ${
          canUndo ? 'bg-blue-500' : 'opacity-50 cursor-not-allowed'
        } ${!activeQuill ? 'opacity-50 cursor-not-allowed' : ''}`}
        disabled={!activeQuill || !canUndo}
      >
        <img src={T_Undo} alt="Undo" className="w-5 h-5 pointer-events-none" />
      </button>

      {/* Redo Button */}
      <button
        type="button"
        onClick={toggleRedo}
        title="Redo"
        aria-label="Redo"
        className={`custom-editor-toolbar ${
          canRedo ? 'bg-blue-500' : 'opacity-50 cursor-not-allowed'
        } ${!activeQuill ? 'opacity-50 cursor-not-allowed' : ''}`}
        disabled={!activeQuill || !canRedo}
      >
        <img src={T_Redo} alt="Redo" className="w-5 h-5 pointer-events-none" />
      </button>
      {/* Align Text */}
      <button
        type="button"
        title="Align Text"
        aria-label="Align Text"
        className={`custom-editor-toolbar rounded-md  ${
          textAlign !== 'right' && textAlign !== 'center' ? 'bg-blue-500' : ''
        } `}
        disabled={!activeQuill}
        onClick={() => toggleAlignText('')}
      >
        <img src={T_alignleft} alt="Align Text" className="w-5 h-5 " />
      </button>
      <button
        type="button"
        title="Align Text"
        aria-label="Align Text"
        className={`custom-editor-toolbar rounded-md  ${
          textAlign === 'center' ? 'bg-blue-500' : ''
        } `}
        disabled={!activeQuill}
        onClick={() => toggleAlignText('center')}
      >
        <img src={T_alignleft} alt="Align Text" className="w-5 h-5 " />
      </button>

      <button
        type="button"
        title="Align Text"
        aria-label="Align Text"
        className={`custom-editor-toolbar rounded-md  ${
          textAlign === 'right' ? 'bg-blue-500' : ''
        } `}
        disabled={!activeQuill}
        onClick={() => toggleAlignText('right')}
      >
        <img src={T_alignleft} alt="Align Text" className="w-5 h-5 " />
      </button>

      {/* Bold Button */}
      <button
        type="button"
        onClick={toggleBold}
        title="Bold"
        aria-label="Bold"
        className={`custom-editor-toolbar ${isBold ? 'bg-blue-500' : ''} ${
          !activeQuill ? 'opacity-50 cursor-not-allowed' : ''
        }`}
        disabled={!activeQuill}
      >
        <img src={T_Bold} alt="Bold" className="w-5 h-5 pointer-events-none" />
      </button>

      {/* Italic Button */}
      <button
        type="button"
        onClick={toggleItalic}
        title="Italic"
        aria-label="Italic"
        className={`custom-editor-toolbar ${isItalic ? 'bg-blue-500' : ''} ${
          !activeQuill ? 'opacity-50 cursor-not-allowed' : ''
        }`}
        disabled={!activeQuill}
      >
        <img
          src={T_Italic}
          alt="Italic"
          className="w-5 h-5 pointer-events-none"
        />
      </button>

      {/* Underline Button */}
      <button
        type="button"
        onClick={toggleUnderline}
        title="Underline"
        aria-label="Underline"
        className={`custom-editor-toolbar ${isUnderline ? 'bg-blue-500' : ''} ${
          !activeQuill ? 'opacity-50 cursor-not-allowed' : ''
        }`}
        disabled={!activeQuill}
      >
        <img
          src={T_Underline}
          alt="Underline"
          className="w-5 h-5 pointer-events-none"
        />
      </button>

      {/* Strikethrough Button */}
      <button
        type="button"
        onClick={toggleStrikethrough}
        title="Strikethrough"
        aria-label="Strikethrough"
        className={`custom-editor-toolbar ${
          isStrikethrough ? 'bg-blue-500' : ''
        } ${!activeQuill ? 'opacity-50 cursor-not-allowed' : ''}`}
        disabled={!activeQuill}
      >
        <img
          src={T_Strikethrough}
          alt="Strikethrough"
          className="w-5 h-5 pointer-events-none"
        />
      </button>

      {/* Ordered List Button */}
      <button
        type="button"
        onClick={toggleOrderedList}
        title="Ordered List"
        aria-label="Ordered List"
        className={`custom-editor-toolbar ${
          isOrderedList ? 'bg-blue-500' : ''
        } ${!activeQuill ? 'opacity-50 cursor-not-allowed' : ''}`}
        disabled={!activeQuill}
      >
        <img
          src={T_NumberedList}
          alt="Ordered List"
          className="w-5 h-5 pointer-events-none"
        />
      </button>

      {/* Unordered List Button */}
      <button
        type="button"
        onClick={toggleUnorderedList}
        title="Unordered List"
        aria-label="Unordered List"
        className={`custom-editor-toolbar ${
          isUnorderedList ? 'bg-blue-500' : ''
        } ${!activeQuill ? 'opacity-50 cursor-not-allowed' : ''}`}
        disabled={!activeQuill}
      >
        <img
          src={T_BulletList}
          alt="Unordered List"
          className="w-5 h-5 pointer-events-none"
        />
      </button>
    </div>
  );
};

QuillToolbar.propTypes = {
  activeQuill: PropTypes.object, // Quill instance or null
};

export default QuillToolbar;
