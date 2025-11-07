// PracticeEditor.js
import React, { useState, useEffect } from "react"; 
import styled from "styled-components";
import Editor from "@monaco-editor/react";
import { css as beautifyCss } from "js-beautify";
import api from "../axios";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const fixedHtml = `<div class="quiz-container">
  <main class="quiz-main">
    <section class="challenge-area">
      <div class="box" id="box1">Box 1</div>
      <div class="box" id="box2">Box 2</div>
      <div class="box" id="box3">Box 3</div>
    </section>
  </main>
</div>
`;

// Styled components
const Container = styled.div`
  max-width: 900px;
  margin: 0 auto;
  margin-top: -2rem;
  color: white;
  padding: 20px;
`;

const QuestionText = styled.p`
  text-align: center;
  font-size: 1.2rem;
`;

const EditorContainer = styled.div`
  display: flex;
  gap: 20px;
  height: 400px;
`;

const CodeEditorWrapper = styled.div`
  flex: 1;
  border: 1px solid #444;
  border-radius: 8px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
`;

const TabButtons = styled.div`
  display: flex;
  gap: 0.8rem;
  align-items: center;
  padding: 10px;
  background-color: #333;
  border-bottom: 1px solid #444;
`;

const TabButton = styled.button`
  background-color: ${props => props.active ? "#555" : "transparent"};
  color: ${props => props.active ? "white" : "#ddd"};
  border: none;
  padding: 5px 10px;
  cursor: pointer;
`;

const EditorContent = styled.div`
  flex: 1;
`;

const HtmlNotice = styled.div`
  padding: 5px;
  background-color: #222;
  text-align: center;
  font-size: 14px;
  color: #aaa;
`;

const PreviewWrapper = styled.div`
  flex: 1;
  border: 1px solid #444;
  border-radius: 8px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  background-color: white;
`;

const PreviewHeader = styled.span`
  padding: 1rem;
  background-color: #333;
  color: white;
`;

const PreviewIframe = styled.iframe`
  border: none;
  flex: 1;
`;

const RunButton = styled.button`
  padding: 1rem 3rem;
  background-color: #8E44AD;
  color: white;
  border: none;
  border-radius: 1rem;
  cursor: pointer;
  font-weight: bold;
  transition: box-shadow 0.3s ease-in-out;
  margin-top: 3rem;
  position: relative;
  left: 60rem;
`;

const PopupOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
`;

const PopupBox = styled.div`
  background-color: #13002c;
  padding: 2rem 5rem;
  border-radius: 1rem;
  text-align: center;
  color: white;
  position: relative;
  max-width: 400px;
`;

const ScoreCircle = styled.div`
  width: 180px;
  height: 180px;
  border-radius: 50%;
  color: white;
  background-color: #8E44AD;
  margin: 0 auto;
  margin-bottom: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.4);
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Score = styled.span`
  text-align: center;
  font-size: 2.5rem;
  margin-top: 1.2rem;
`;

const Exp = styled.span`
  text-align: center;
  color: rgba(255, 255, 255, 0.5);
  font-size: 1.1rem;
`;

const CongratsText = styled.span`
  margin-top: 1rem;
  font-size: 1.5rem;
`;

const PopupButtons = styled.div`
  margin-top: 2rem;
  display: flex;
  gap: 1rem;
  justify-content: center;
`;

const PopupButton = styled.button`
  padding: 0.75rem 1.5rem;
  background-color: #8E44AD;
  color: white;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  font-weight: bold;

  &:hover {
    background-color: #a45ee5;
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1.5rem;
  background: transparent;
  color: white;
  font-size: 32px;
  border: none;
  cursor: pointer;
  z-index: 10;
  padding: 0;
  line-height: 1;
`;

const LoadingText = styled.p`
  text-align: center;
  color: white;
`;
export default function PracticeEditor({ initialCode, language, questionText, expectedOutput, quizId, langageId }) {
  const [activeTab, setActiveTab] = useState("css");
  const [cssContent, setCssContent] = useState("");
  const [isPassed, setIsPassed] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
  const [popupScore, setPopupScore] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const utilisateur_id = localStorage.getItem("utilisateur_id");

    if (utilisateur_id && quizId) {
      api.get(`/api/resultats/score/${utilisateur_id}/${quizId}`)
        .then(res => {
          if (res.data.score === 100) {
            setIsPassed(true);
            setCssContent(beautifyCss(expectedOutput, { indent_size: 2 }));
          } else {
            setCssContent(initialCode);
          }
        })
        .catch(err => {
          console.error("Error fetching score:", err);
          setCssContent(initialCode);
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      setCssContent(initialCode);
      setIsLoading(false);
    }
  }, [quizId, expectedOutput, initialCode]);

  const srcDoc = `
    <html>
      <head><style>${cssContent}</style></head>
      <body>${fixedHtml}</body>
    </html>
  `;

  async function checkAnswer() {
  if (isPassed) {
    window.location.href = '/home';
    return;
  }

  const formattedUserCss = beautifyCss(cssContent.trim(), { indent_size: 2 });
  const formattedExpectedCss = beautifyCss(expectedOutput.trim(), { indent_size: 2 });

  if (formattedUserCss === formattedExpectedCss) {
    setIsPassed(true);
    setPopupScore(100);
    setPopupMessage("Great job! You nailed it!");
    setShowPopup(true);

    const utilisateur_id = localStorage.getItem("utilisateur_id");

    try {
      // 1. Update quiz score
      await api.put('/api/resultats/update-by-user-quiz', {
        utilisateur_id,
        quiz_id: quizId,
        score: 100
      });

      console.log("Quiz score updated to 100");

      // 2. Fetch current user data
      const userResponse = await api.get(`/api/utilisateurs/${utilisateur_id}`);
      const currentUser = userResponse.data;

      // 3. Update user energy points
      const newEnergyPoints = currentUser.points_energie + 10;

      await api.put(`/api/utilisateurs/${utilisateur_id}`, {
        ...currentUser,
        points_energie: newEnergyPoints
      });

      toast.success("You earned 10 energy points!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });

    } catch (err) {
      console.error("Error updating score or energy points:", err);
    }
  } else {
    setPopupScore(0);
    setPopupMessage("Don't worry! You can do it!");
    setShowPopup(true);
  }
}
  if (isLoading) return <LoadingText>Loading...</LoadingText>;

  return (
    <Container>
      <QuestionText>{questionText}</QuestionText>
      <p style={{textAlign:'center', opacity:'0.6',marginBottom: '3rem'}}>Tip: follow the order in the question</p>
      <EditorContainer>
        {/* Code Editor */}
        <CodeEditorWrapper>
          <TabButtons>
            <TabButton 
              onClick={() => setActiveTab("html")} 
              active={activeTab === "html"}
            >
              HTML
            </TabButton>
            <TabButton 
              onClick={() => setActiveTab("css")} 
              active={activeTab === "css"}
            >
              CSS
            </TabButton>
          </TabButtons>

          <EditorContent>
            <Editor
              key={activeTab}
              height="100%"
              language={activeTab}
              value={activeTab === "html" ? fixedHtml : cssContent}
              onChange={(newValue) => {
                if (activeTab === "css" && !isPassed) {
                  setCssContent(newValue);
                }
              }}
              theme="vs-dark"
              options={{ 
                minimap: { enabled: false }, 
                readOnly: activeTab === "html" || isPassed
              }}
            />
          </EditorContent>

          {activeTab === "html" && (
            <HtmlNotice>
              HTML is read-only. You can only edit CSS.
            </HtmlNotice>
          )}
        </CodeEditorWrapper>

        {/* Live Preview */}
        <PreviewWrapper>
          <PreviewHeader>
            Browser
          </PreviewHeader>
          <PreviewIframe 
            srcDoc={srcDoc} 
            title="Browser" 
            sandbox="allow-same-origin" 
            frameBorder="0" 
            width="100%" 
            height="100%"
          />
        </PreviewWrapper>
      </EditorContainer>
      <RunButton onClick={checkAnswer}>
        {isPassed ? "Continue" : "Run"}
      </RunButton>
      {showPopup && (
        <PopupOverlay>
          <PopupBox>
            <CloseButton onClick={() => setShowPopup(false)}>
              ×
            </CloseButton>
            <ScoreCircle>
              <Score>{popupScore}%</Score>
              <Exp>your score</Exp>
            </ScoreCircle>
            <CongratsText>
              {popupScore === 100 ? "Congratulations!" : "Keep Trying!"}
            </CongratsText>
            <p>{popupMessage}</p>
            <PopupButtons>
              <PopupButton
                onClick={() => {
                  if (popupScore === 100) {
                    window.location.href = '/home';
                  } else {
                    setShowPopup(false);
                  }
                }}
              >
                {popupScore === 100 ? "Continue" : "Retry"}
              </PopupButton>
            </PopupButtons>
          </PopupBox>
        </PopupOverlay>
      )}
    </Container>
  );
}