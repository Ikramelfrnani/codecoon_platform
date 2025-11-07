import React, { useState } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { html } from "@codemirror/lang-html";
import { css } from "@codemirror/lang-css";
import "./TextPropertiesEditor.css"; // Crée un fichier pour personnaliser l’apparence

export default function TextPropertiesEditor() {
  const [htmlCode, setHtmlCode] = useState(`<p class="text">Style me with text properties!</p>`);
  const [cssCode, setCssCode] = useState(
    `.text {
  font-size: 20px;
  font-weight: bold;
  color: #2c3e50;
  text-align: center;
  font-family: Arial, sans-serif;
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
          <h3>CSS - Text Properties</h3>
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
