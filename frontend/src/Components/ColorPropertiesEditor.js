import React, { useState } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { html } from "@codemirror/lang-html";
import { css } from "@codemirror/lang-css";
import "./ColorPropertiesEditor.css";

export default function ColorPropertiesEditor() {
  const [htmlCode, setHtmlCode] = useState(
    `<div class="color-box">Play with Colors!</div>`
  );

  const [cssCode, setCssCode] = useState(
    `.color-box {
  background-color: #ffeb3b;
  color: #333;
  border: 2px solid #f44336;
  padding: 20px;
  font-size: 24px;
  text-align: center;
  border-radius: 8px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
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
          <h3>CSS - Color Properties</h3>
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
