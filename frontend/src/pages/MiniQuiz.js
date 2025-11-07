import React, { useEffect, useState } from "react";
import NavBar from "../Components/Navbar";
import PracticeEditor from "../Components/PracticeEditor";
import api from "../axios";
import { css as beautifyCss } from 'js-beautify';
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import Loader from "../Components/Loader"; // ✅ Loader imported

const Titre = styled.h1`
  color: white;
  text-align: center;
  color: #6b0a83;
  letter-spacing: 1px;
  font-size: 2rem;
  margin-top: 5rem;
`;

export default function MiniQuiz() {
  const location = useLocation();
  const quizId = location.state?.quizId;
  const nomChapitre = location.state?.nom_chapitre;
  const langageId = location.state?.langage_id;

  const [question, setQuestion] = useState(null);

  useEffect(() => {
    api.get(`/api/questions/by-quiz/${quizId}`)
      .then((res) => {
        const formattedCSS = beautifyCss(res.data.initial_code, {
          indent_size: 2,
          end_with_newline: true
        });
        setQuestion({
          ...res.data,
          initial_code: formattedCSS,
        });
      })
      .catch((err) => console.error("Failed to load question:", err));

    api.post('/api/resultats', {
      utilisateur_id: localStorage.getItem("utilisateur_id"),
      quiz_id: quizId,
      score: 0
    }).catch((err) => {
      if (err.response && err.response.status === 409) {
        console.log("Result already exists");
      } else {
        console.error("Error creating initial result:", err);
      }
    });
  }, [quizId]);

  if (!question) return (<><NavBar/> <Loader /></>); 

  return (
    <>
      <NavBar />
      <Titre>{nomChapitre} Mini Quiz</Titre>
      <div style={{ margin: 0 }}>
        <PracticeEditor
          initialCode={question.initial_code}
          language={question.code_language}
          questionText={question.texte}
          expectedOutput={question.expected_output}
          quizId={quizId}
          langageId={langageId}
        />
      </div>
    </>
  );
}
