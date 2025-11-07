// GlobalQuizEditor.js
import React, { useState } from "react";
import Editor from "@monaco-editor/react";
import styled from 'styled-components';

const EditorContainer = styled.div`
  max-width: 600px;
  margin: auto;
  color: white;
  padding: 20px;
`;

const EditorWrapper = styled.div`
  display: flex;
  gap: 20px;
  height: 400px;
`;

const EditorBox = styled.div`
  flex: 1;
  border: 1px solid #444;
  border-radius: 8px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
`;

const EditorTabs = styled.div`
  display: flex;
  gap: 0.8rem;
  align-items: center;
  padding: 10px;
  background-color: #333;
  border-bottom: 1px solid #444;
`;

const EditorTabButton = styled.button`
  background-color: ${props => props.active ? '#555' : 'transparent'};
  color: ${props => props.active ? 'white' : '#ddd'};
  border: none;
  padding: 5px 10px;
  cursor: pointer;
`;

const EditorFooter = styled.div`
  padding: 5px;
  background-color: #222;
  text-align: center;
  font-size: 14px;
  color: #aaa;
`;

export default function GlobalQuizEditor({ initialCode, onCssChange }) {
  const [activeTab, setActiveTab] = useState("css");
  const [cssContent, setCssContent] = useState("");

  const handleCssChange = (newValue) => {
    setCssContent(newValue);
    onCssChange(newValue);
  };

  return (
    <EditorContainer>
      <EditorWrapper>
        <EditorBox>
          <EditorTabs>
            <EditorTabButton 
              onClick={() => setActiveTab("html")} 
              active={activeTab === "html"}
            >
              HTML
            </EditorTabButton>
            <EditorTabButton 
              onClick={() => setActiveTab("css")} 
              active={activeTab === "css"}
            >
              CSS
            </EditorTabButton>
          </EditorTabs>

          <div style={{ flex: 1 }}>
            <Editor
              key={activeTab}
              height="100%"
              language={activeTab}
              value={activeTab === "html" ? initialCode : cssContent}
              onChange={activeTab === "css" ? handleCssChange : undefined}
              theme="vs-dark"
              options={{ 
                minimap: { enabled: false }, 
                readOnly: activeTab === "html"
              }}
            />
          </div>

          {activeTab === "html" && (
            <EditorFooter>
              HTML is read-only. You can only edit CSS.
            </EditorFooter>
          )}
        </EditorBox>
      </EditorWrapper>
    </EditorContainer>
  );
}