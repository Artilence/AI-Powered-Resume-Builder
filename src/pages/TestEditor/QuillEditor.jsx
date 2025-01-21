import { useRef, useContext, useEffect } from 'react';
import ReactQuill, { Quill } from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { UploadDocContext } from './store';

// Extend Quill to allow background color
const BackgroundStyle = Quill.import('attributors/style/background');
Quill.register(BackgroundStyle, true);

const QuillEditor = () => {
  const quillRef = useRef(null);
  const containerRef = useRef(null);

  const {
    selectedContent,
    setSelectedContent,
    content,
    setContent,
    editorState,
    setEditorState,
    firstContent,
    setFirstContent,
    lastContent,
    setLastContent,
    newContent,
  } = useContext(UploadDocContext);

  const getEditorContent = (state) => {
    const editor = quillRef.current?.getEditor();
    if (!editor) {
      console.warn('Editor not initialized yet.');
      return;
    }

    const convertContent = (content) => editor.clipboard.convert(content);

    const first = firstContent;
    const original = JSON.parse(JSON.stringify(selectedContent));
    const transformed = convertContent(
      JSON.parse(
        JSON.stringify(state === 'CHANGED' ? `<br/>${newContent}` : newContent)
      )
    );
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

    switch (state) {
      case 'CHANGED':
        applyStyle(original.ops, 'pink', 'red');
        applyStyle(transformed.ops, 'lightgreen', 'green');
        return [...first.ops, ...original.ops, ...transformed.ops, ...last.ops];
      case 'ACCEPTED':
        return [...first.ops, ...transformed.ops, ...last.ops];
      case 'REJECTED':
        return [...first.ops, ...original.ops, ...last.ops];
      default:
        return [];
    }
  };

  const handleChangeContent = () => {
    const editor = quillRef?.current?.getEditor();
    if (!editor) {
      console.warn('Editor instance not found.');
      return;
    }

    const range = editor.getSelection();

    const selectedDeltas = editor.getContents(range.index, range.length);

    setFirstContent(editor.getContents(0, range.index));
    setLastContent(editor.getContents(range.index + range.length));
    setSelectedContent(selectedDeltas);
  };

  useEffect(() => {
    const editor = quillRef?.current?.getEditor();
    if (!editor || editorState === 'EDITING') {
      console.warn('Editor not initialized or already in EDITING state.');
      return;
    }

    const content = getEditorContent(editorState);
    console.log('content', content);
    editor.setContents(content);

    if (['ACCEPTED', 'REJECTED'].includes(editorState)) {
      setEditorState('EDITING');
      setSelectedContent('');
      editor.enable();
    }

    if (editorState === 'CHANGED') {
      editor.disable();
    }
  }, [editorState]);

  return (
    <div className=" " ref={containerRef}>
      <h1 className="text-2xl font-bold">Quill Editor with Diff Preview</h1>

      <ReactQuill
        ref={quillRef}
        theme="snow"
        value={content}
        onChange={setContent}
        className="bg-white rounded w-full "
      />

      <div className="flex gap-2 mt-4">
        {editorState === 'EDITING' ? (
          <button
            onClick={handleChangeContent}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
          >
            Add to Context
          </button>
        ) : (
          <>
            <button
              onClick={() => setEditorState('ACCEPTED')}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
            >
              Accept
            </button>
            <button
              onClick={() => setEditorState('REJECTED')}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
            >
              Reject
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default QuillEditor;
