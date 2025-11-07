import React, { useState } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { html } from "@codemirror/lang-html";
import { css } from "@codemirror/lang-css";
import "./BoxModelEditor.css";

export default function BoxModelEditor() {
  const [htmlCode, setHtmlCode] = useState(
    `<div class="box-model">Inspect the Box Model!</div>`
  );

  const [cssCode, setCssCode] = useState(
    `.box-model {
  width: 300px;
  height: 150px;
  padding: 20px;
  border: 5px solid #3498db;
  margin: 30px auto;
  background-color: #ecf0f1;
  text-align: center;
  line-height: 110px;
  font-size: 18px;
}`
  );

  return (
    <div className="code-editor-container">
      <div className="editors-row">
        <div className="editor-panel">
          <h3>HTML Editor</h3>
          <CodeMirror
            value={htmlCode}
            extensions={[html()]}
            onChange={(value) => setHtmlCode(value)}
            height="200px"
            theme="dark"
          />
        </div>

        <div className="editor-panel">
          <h3>CSS - Box Model</h3>
          <CodeMirror
            value={cssCode}
            extensions={[css()]}
            onChange={(value) => setCssCode(value)}
            height="200px"
            theme="dark"
          />
        </div>
      </div>

      <div className="output-panel">
        <h3>Live Preview</h3>
        <div className="output-frame">
          <style>{cssCode}</style>
          <div dangerouslySetInnerHTML={{ __html: htmlCode }} />
        </div>
      </div>
    </div>
  );
}
