import React, { useState, useRef } from "react";
import { Editor, EditorState, RichUtils, convertToRaw } from "draft-js";
import "draft-js/dist/Draft.css";
import './index.less'

const MyEditor = () => {
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );
  const [textAlignment, setTextAlignment] = useState('center');
  const editor = useRef(null);

  function focusEditor() {
    editor.current.focus();
  }

  const defaultInlineStyle = [
    { el: <span>B</span>, style: 'BOLD' },
    { el: <span>I</span>, style: 'ITALIC' },
    { el: <span>U</span>, style: 'UNDERLINE' },
    { el: <span>U</span>, style: 'STRIKETHROUGH' },
    { el: <span>BLUE</span>, style: 'BLUE' },
  ];

  const toggleInlineStyle = (style) => {
    setEditorState(RichUtils.toggleInlineStyle(editorState, style));
  }

  const storeHandle = (res) => {
    setEditorState(res);
    const content = res.getCurrentContent();
    const oldContent = editorState.getCurrentContent();
    if (content !== oldContent) {
      console.log(JSON.stringify(convertToRaw(content)))
    }
  };

  const blockRenderMap = [
    { el: <span>H1</span>, style: 'header-one' },
    { el: <span>h2</span>, style: 'header-two' },
    { el: <span>h3</span>, style: 'header-three' },
    { el: <span>h4</span>, style: 'header-four' },
    { el: <span>h5</span>, style: 'header-five' },
    { el: <span>h6</span>, style: 'header-six' },
    { el: <span>有序列表</span>, style: 'ordered-list-item' },
    { el: <span>无序列表</span>, style: 'unordered-list-item' }
  ];

  const textAlignStyle = [
    { el: <span>L</span>, style: 'left' },
    { el: <span>C</span>, style: 'center' },
    { el: <span>R</span>, style: 'right' }
  ];

  return (
    <>
      <div className="editor-btn-group">
        {blockRenderMap.map(item =>
          <span onClick={() => setEditorState(RichUtils.toggleBlockType(editorState, item.style))} key={item.style}>
            {item.el}
          </span>)}
      </div>
      <div className="editor-btn-group">
        {defaultInlineStyle.map(item =>
          <span onClick={() => toggleInlineStyle(item.style)} key={item.style}>
            {item.el}
          </span>)}
      </div>
      <div className="editor-btn-group">
        {textAlignStyle.map(item =>
          <span onClick={() => setTextAlignment(item.style)} key={item.style}>
            {item.el}
          </span>)}
      </div>
      <div
        style={{ border: "1px solid black", minHeight: "6em", cursor: "text" }}
        onClick={focusEditor}
      >
        <Editor
          ref={editor}
          editorState={editorState}
          onChange={storeHandle}
          textAlignment={textAlignment}
          placeholder="Write something!"
        />
      </div>
    </>

  );
}

export default MyEditor;
