import React, { useState } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { html } from "@codemirror/lang-html";
import { css } from "@codemirror/lang-css";
import "./FlexboxEditor.css";

export default function FlexboxEditor() {
  const [htmlCode, setHtmlCode] = useState(
    `<div class="flex-container">
  <div class="item">1</div>
  <div class="item">2</div>
  <div class="item">3</div>
</div>`
  );

  const [cssCode, setCssCode] = useState(
    `.flex-container {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 10px;
  height: 200px;
  background-color: #f1f1f1;
}

.item {
  background-color: #4a90e2;
  color: white;
  padding: 20px;
  font-size: 20px;
  border-radius: 8px;
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
          <h3>CSS - Flexbox</h3>
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
