/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
// src/components/QuillField.jsx
import { forwardRef, useEffect, useRef, useLayoutEffect } from 'react';
import Quill from 'quill';
import 'quill/dist/quill.bubble.css';
import { useDispatch, useSelector } from 'react-redux';
import {
  setSelectedContentDelta,
  setFirstContentDelta,
  setLastContentDelta,
} from '../../app/index';

const QuillField = forwardRef(
  (
    {
      defaultValue = '',
      onTextChange,
      onSelectionChange,
      defaultStyles = null,
    },
    ref
  ) => {
    const containerRef = useRef(null);
    const quillInstanceRef = useRef(null);
    const initializedRef = useRef(false);
    const defaultsRef = useRef({ value: defaultValue, styles: defaultStyles });
    const dispatch = useDispatch();
    const editorState = useSelector(
      (state) => state.ResumeEditorAndChatCrontrol.editorState
    );
    // Update event handlers to avoid stale closures
    const onTextChangeRef = useRef(onTextChange);
    const onSelectionChangeRef = useRef(onSelectionChange);
    const spanRef = useRef(null); // Ref for the <span>
    const changeSpanDisplay = useRef(null);

    useLayoutEffect(() => {
      onTextChangeRef.current = onTextChange;
      onSelectionChangeRef.current = onSelectionChange;
    }, [onTextChange, onSelectionChange]);

    useEffect(() => {
      if (containerRef.current && !quillInstanceRef.current) {
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
            'color',
          ],
        });

        // Set initial content and styles
        if (!initializedRef.current) {
          if (defaultsRef?.current?.value) {
            quill.setText(defaultsRef.current.value);
          }
        }
        if (defaultsRef?.current?.styles) {
          Object.entries(defaultsRef.current.styles).forEach(([key, value]) => {
            quill.format(key, value);
          });
          initializedRef.current = true;
        }

        quillInstanceRef.current = quill;
        if (ref && typeof ref === 'object') {
          ref.current = quill;
        }

        quill.on('text-change', () => {
          if (onTextChangeRef.current) {
            let text = quill.getText();
            text = text.replace(/\n/g, ' ');
            onTextChangeRef.current(text);
          }
        });

        quill.on('selection-change', (range) => {
          if (range?.length > 0) {
            const selectedContentDelta = quill.getContents(
              range.index,
              range.length
            );
            const firstContentValue = quill?.getContents(0, range.index);
            const lastContentValue = quill?.getContents(
              range.index + range.length
            );
            dispatch(
              setSelectedContentDelta(
                JSON.parse(JSON.stringify(selectedContentDelta))
              )
            );
            dispatch(
              setFirstContentDelta(
                JSON.parse(JSON.stringify(firstContentValue))
              )
            );
            dispatch(
              setLastContentDelta(JSON.parse(JSON.stringify(lastContentValue)))
            );
          }
          if (onSelectionChangeRef.current) {
            onSelectionChangeRef.current(range, quill, changeSpanDisplay);
          }
        });
        if (spanRef.current) {
          spanRef.current.style.display = 'none';
        }
      }

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
    }, [ref, dispatch]);
    useEffect(() => {
      if (quillInstanceRef.current) {
        if (editorState !== 'EDITING') {
          quillInstanceRef.current.disable();
        } else {
          quillInstanceRef.current.enable();
        }
      }
    }, [editorState]); // 🔹 Runs ONLY when `editorState` changes
    changeSpanDisplay.current = (isVisible) => {
      if (spanRef.current) {
        console.log(spanRef.current);
        spanRef.current.style.display = isVisible ? 'flex' : 'none';
      }
    };

    return (
      <div className="relative w-full flex flex-col">
        <div
          ref={containerRef}
          className="!w-[inherit] !h-[inherit] !outline-none !border-none p-0 m-0"
        ></div>
        <span
          ref={spanRef}
          className=" absolute top-[100%] left-0 z-[100] w-full bg-black"
        >
          i am a span
        </span>
      </div>
    );
  }
);

export default QuillField;
