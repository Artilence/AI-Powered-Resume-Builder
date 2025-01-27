/* eslint-disable react/prop-types */
// src/components/QuillToolbar.jsx
import { useEffect, useState } from 'react';
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
  arrowDown,
  selectedTick,
} from '../../assets'; // Ensure all icons are correctly imported
import TemplateSelector from '../TemplateSelector';

const quillColors = [
  '#000000',
  '#e60000',
  '#ff9900',
  '#ffff00',
  '#008a00',
  '#0066cc',
  '#9933ff',
  '#ffffff',
  '#facccc',
  '#ffebcc',
  '#ffffcc',
  '#cce8cc',
  '#cce0f5',
  '#ebd6ff',
  '#bbbbbb',
  '#f06666',
  '#ffc266',
  '#ffff66',
  '#66b966',
  '#66a3e0',
  '#c285ff',
  '#888888',
  '#a10000',
  '#b26b00',
  '#b2b200',
  '#006100',
  '#0047b2',
  '#6b24b2',
  '#444444',
  '#5c0000',
  '#663d00',
  '#666600',
  '#003700',
  '#002966',
  '#3d1466',
];

const QuillToolbar = ({ activeQuill }) => {
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isUnderline, setIsUnderline] = useState(false);
  const [isStrikethrough, setIsStrikethrough] = useState(false);
  const [isOrderedList, setIsOrderedList] = useState(false);
  const [isUnorderedList, setIsUnorderedList] = useState(false);
  const [textAlign, setTextAlign] = useState('');
  const [selectedColor, setSelectedColor] = useState('#facccc');

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

  const handleColorChange = (color) => {
    if (activeQuill) {
      activeQuill.format('color', color);
      setSelectedColor(color);
    }
  };

  useEffect(() => {
    if (activeQuill) {
      const handleSelectionChange = (range) => {
        if (range) {
          const currentFormat = activeQuill.getFormat(range);
          setIsBold(currentFormat.bold || false);
          setIsItalic(currentFormat.italic || false);
          setIsUnderline(currentFormat.underline || false);
          setIsStrikethrough(currentFormat.strike || false);
          setIsOrderedList(currentFormat.list === 'ordered' || false);
          setIsUnorderedList(currentFormat.list === 'bullet' || false);
          setTextAlign(currentFormat.align || 'left');
          setSelectedColor(currentFormat.color || '#ffffff');
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
      setSelectedColor('#ffffff');
    }
  }, [activeQuill]);

  return (
    <div className="flex gap-5 fixed top-[13%]  z-20">
      <div className="bg-gray-black flex items-center px-8 py-2 rounded-lg gap-3  shadow-md">
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
          <img
            src={T_Undo}
            alt="Undo"
            className="w-5 h-5 pointer-events-none"
          />
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
          <img
            src={T_Redo}
            alt="Redo"
            className="w-5 h-5 pointer-events-none"
          />
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
        {/* Color Picker */}

        <button
          className={`relative group/color flex items-center gap-2 cursor-pointer ${
            !activeQuill
              ? 'opacity-50 cursor-not-allowed pointer-events-none'
              : ''
          }`}
          disabled={!activeQuill}
        >
          <span
            style={{ backgroundColor: selectedColor }}
            className={` w-[24px] h-[24px] rounded-lg`}
          ></span>
          <img
            src={arrowDown}
            alt="Bold"
            className="w-[24px] h-[24px] object-contain"
          />
          <div className="absolute top-0 pt-20 left-0 hidden group-hover/color:flex">
            <div className="flex flex-wrap gap-2 min-w-[200px] border border-white-transparent-2 bg-gray-black px-[12px] py-[24px] rounded-xl">
              {quillColors?.map((color) => (
                <span
                  key={color}
                  style={{ backgroundColor: color }}
                  className=" relative w-[24px] h-[24px] flex items-center justify-center  rounded-full  cursor-pointer"
                  onClick={() => handleColorChange(color)}
                >
                  {selectedColor === color && (
                    <img
                      src={selectedTick}
                      alt="selectedTick"
                      className="w-full h-full  rounded-full absolute bg-black opacity-50 object-contain !pointer-events-none !cursor-none"
                    />
                  )}
                </span>
              ))}
            </div>
          </div>
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
          <img
            src={T_Bold}
            alt="Bold"
            className="w-5 h-5 pointer-events-none"
          />
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
          className={`custom-editor-toolbar ${
            isUnderline ? 'bg-blue-500' : ''
          } ${!activeQuill ? 'opacity-50 cursor-not-allowed' : ''}`}
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
      <TemplateSelector />
    </div>
  );
};

export default QuillToolbar;
