import React, { useState } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { html } from "@codemirror/lang-html";
import { css } from "@codemirror/lang-css";
import "./CssUnitsEditor.css"; // Crée ce fichier pour le style

export default function CssUnitsEditor() {
  const [htmlCode, setHtmlCode] = useState(
    `<div class="box">Resize me with different units!</div>`
  );

  const [cssCode, setCssCode] = useState(
    `.box {
  width: 50%;
  height: 100px;
  background-color: #4a90e2;
  font-size: 1.5em;
  text-align: center;
  line-height: 100px;
  color: white;
  margin: 20px auto;
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
          <h3>CSS - Units Practice</h3>
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
