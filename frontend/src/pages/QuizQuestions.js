import { useEffect, useState, useRef } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchQuestions } from '../slices/questionsSlice';
import { fetchReponses } from '../slices/reponsesSlice';
import { storeOrUpdateReponse } from '../slices/utilisateurReponseSlice';
import ResponseComponent from '../Components/ResponseComponent';
import GlobalQuizEditor from '../Components/GlobalQuizEditor';
import NavQst from '../Components/NavQst';
import styled from 'styled-components';
import confetti from 'canvas-confetti';
import { updateScoreByUserAndQuiz } from '../slices/resultatSlice';
import { css as beautifyCss } from 'js-beautify';
import axios from 'axios';
import { toast } from 'react-toastify';
import Loader from '../Components/Loader';

// Styled Components (unchanged for brevity)
const ConfettiCanvas = styled.canvas`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 9998;
`;
const Container = styled.div`
  max-width: 60%;
  margin: 0 auto;
  padding: 20px;
  margin-top: 5%;
`;
const Title = styled.p`
  color: white;
  font-size: 1.5rem;
  font-weight: 600;
  font-family: Inter, sans-serif;
  margin-bottom: 32px;
  text-align: center;
`;
const Grid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
  margin-top: 4rem;
`;
const GridItem = styled.div`
  flex: 1 1 250px;
  max-width: 250px;
`;
const ProgressBarContainer = styled.div`
  width: 50%;
  margin: 5% auto;
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  height: 6px;
  overflow: hidden;
`;
const Progress = styled.div`
  height: 100%;
  background-color: #8E44AD;
  width: ${(props) => props.percent}%;
  transition: width 0.3s ease-in-out;
`;
const QuestionNumber = styled.p`
  color: rgba(255, 255, 255, 0.5);
  font-size: 1rem;
  font-family: Inter, sans-serif;
  margin-top: 8px;
  text-align: center;
`;
const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  margin: 5rem 12rem;
`;
const NextButton = styled.button`
  padding: 1rem 3rem;
  background-color: #8E44AD;
  color: white;
  border: none;
  border-radius: 1rem;
  cursor: pointer;
  font-weight: bold;
  transition: box-shadow 0.3s ease-in-out;
  ${(props) =>
    props.glow &&
    `
    box-shadow: 0 0 15px 5px rgba(142, 68, 173, 0.7);
  `}
  &:hover {
    background-color: #a45ee5;
  }
`;
const CloseButton = styled.button`
  position: absolute;
  top: 0.5rem;
  left: 1rem;
  background: transparent;
  opacity: 0.8;
  color: white;
  font-size: 24px;
  border: none;
  cursor: pointer;
  z-index: 10;
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
  padding: 3rem 3rem;
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
  margin-top: -1rem;
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
const PopupCloseBtn = styled.button`
  position: absolute;
  top: 0.3rem;
  right: 0.6rem;
  background: transparent;
  opacity: 0.8;
  color: white;
  font-size: 2rem;
  border: none;
  cursor: pointer;
  z-index: 10;
`;

export default function QuizQuestions() {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const quizId = location.state?.quizId;
  const { data: questions, status: questionsStatus } = useSelector((state) => state.questions);
  const { data: responses } = useSelector((state) => state.reponses);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedResponse, setSelectedResponse] = useState(null);
  const [userCodeAnswer, setUserCodeAnswer] = useState('');
  const [correctCount, setCorrectCount] = useState(0);
  const [glow, setGlow] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [finalScore, setFinalScore] = useState(0);
  const [badgeClaimed, setBadgeClaimed] = useState(false); // NEW STATE
  const glowTimeoutRef = useRef(null);
  const glowIntervalRef = useRef(null);

  const normalizeCSS = (css) => {
    if (!css) return '';
    let cleaned = css.replace(/\/\*[\s\S]*?\*\//g, '');
    cleaned = cleaned.replace(/\s+/g, ' ');
    cleaned = cleaned.trim().toLowerCase();
    const beautified = beautifyCss(cleaned, {
      indent_size: 2,
      end_with_newline: false,
      selector_separator_newline: false,
      newline_between_rules: false,
      preserve_newlines: false,
    });
    return beautified;
  };

  useEffect(() => {
    if (finalScore >= 90 && showPopup) {
      const end = Date.now() + 2 * 1000;
      const frame = () => {
        if (Date.now() > end) return;
        confetti({
          particleCount: 7,
          angle: Math.random() * 360,
          spread: 55,
          origin: {
            x: Math.random(),
            y: Math.random() - 0.2,
          },
          colors: ['#8E44AD', '#f3ec78', '#cf67ff', '#ffffff'],
        });
        requestAnimationFrame(frame);
      };
      frame();
    }
  }, [finalScore, showPopup]);

  useEffect(() => {
    if (quizId) dispatch(fetchQuestions(quizId));
  }, [quizId, dispatch]);

  const currentQuestion = questions?.[currentIndex];

  useEffect(() => {
    if (currentQuestion?.id) {
      dispatch(fetchReponses(currentQuestion.id));
      setSelectedResponse(null);
      setUserCodeAnswer('');
      clearTimeout(glowTimeoutRef.current);
      clearInterval(glowIntervalRef.current);
      glowTimeoutRef.current = setTimeout(() => {
        setGlow(true);
        setTimeout(() => setGlow(false), 1000);
        glowIntervalRef.current = setInterval(() => {
          setGlow(true);
          setTimeout(() => setGlow(false), 1000);
        }, 5000);
      }, 4000);
    }
    return () => {
      clearTimeout(glowTimeoutRef.current);
      clearInterval(glowIntervalRef.current);
    };
  }, [currentQuestion?.id, dispatch]);

  const handleSelect = (responseId) => {
    if (currentQuestion.question_type === 'select_choice') {
      setSelectedResponse(responseId);
    }
  };

  const handleExitQuiz = () => {
    const confirmExit = window.confirm("Your progress won't be saved. Do you want to exit?");
    if (confirmExit) {
      navigate('/home');
    }
  };

  const handleNext = async () => {
    if (currentQuestion.question_type === 'select_choice' && selectedResponse === null) {
      alert('Please select an answer before proceeding.');
      return;
    }

    const correctResponse = currentQuestion.question_type === 'practice'
      ? responses.find(r => r.est_correct === true || r.est_correct === 1)
      : responses.find(r => r.id === selectedResponse);

    const utilisateur_id = localStorage.getItem('utilisateur_id');
    let isCorrect = false;

    if (currentQuestion.question_type === 'practice') {
      const standardizedUserCode = normalizeCSS(userCodeAnswer);
      const standardizedCorrectCode = normalizeCSS(correctResponse?.texte || '');
      isCorrect = standardizedUserCode === standardizedCorrectCode;
    } else {
      isCorrect = correctResponse?.est_correct || false;
    }

    const answerPayload = {
      utilisateur_id,
      question_id: currentQuestion.id,
      reponse: currentQuestion.question_type === 'practice' ? userCodeAnswer : correctResponse?.texte || '',
      estcorrect: isCorrect,
    };

    try {
      await dispatch(storeOrUpdateReponse(answerPayload)).unwrap();
      if (isCorrect) {
        setCorrectCount(prev => prev + 1);
      }

      if (currentIndex + 1 < questions.length) {
        setCurrentIndex(currentIndex + 1);
        setUserCodeAnswer('');
      } else {
        const total = questions.length;
        const score = Math.round(((correctCount + (isCorrect ? 1 : 0)) / total) * 100);
        setFinalScore(score);
        setShowPopup(true);
        dispatch(updateScoreByUserAndQuiz({ utilisateurId: utilisateur_id, quizId, score }));

        if (score >= 90) {
          try {
            const response = await axios.get(`http://localhost:8000/api/utilisateurs/${utilisateur_id}`);
            const currentUser = response.data;
            const currentEnergy = currentUser.points_energie || 0;
            await axios.put(`http://localhost:8000/api/utilisateurs/${utilisateur_id}`, {
              ...currentUser,
              points_energie: currentEnergy + 50
            });

            toast.success('You earned 50 energy points!', {
              position: "top-right",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
            });

          } catch (err) {
            console.error('Error updating user energy:', err);
          }
        }
      }
    } catch (error) {
      alert('Failed to save your answer. Please check your connection and try again.');
    }
  };

  const handleReviewAnswers = () => {
    navigate(`/global-quiz/review/${id}`, {
      state: {
        quizId,
        langage: location.state?.nomLangage,
        score: finalScore,
      },
    });
  };

  const handleGetBadgeOrRetry = async () => {
    const utilisateur_id = localStorage.getItem('utilisateur_id');
    if (finalScore >= 90 && !badgeClaimed) {
      try {
        const badgeResponse = await axios.get(`http://127.0.0.1:8000/api/badge/langage/${id}`);
        const badge_id = badgeResponse.data?.id;
        if (!badge_id) {
          console.error("No badge found for this language.");
          return;
        }
        const response = await axios.post('http://127.0.0.1:8000/api/utilisateur/badges', {
          utilisateur_id,
          badge_id,
        });
        if (response.status === 200 || response.status === 201) {
          toast.success('Badge unlocked successfully!');
          setBadgeClaimed(true); // Update UI state
        }
      } catch (error) {
        console.error('Error assigning badge:', error);
      }
    } else if (badgeClaimed && finalScore >= 90) {
      navigate('/badges'); // Go to badges page
    } else {
      navigate(0); // Reload quiz
    }
  };

  if (questionsStatus === 'loading') {
    return <Loader />;
  }
  if (!questions || questions.length === 0) {
    return <p>No questions found.</p>;
  }

  const progressPercent = ((currentIndex + 1) / questions.length) * 100;

  return (
    <>
      <NavQst />
      <CloseButton onClick={handleExitQuiz}>X</CloseButton>
      <ProgressBarContainer>
        <Progress percent={progressPercent} />
      </ProgressBarContainer>
      <Container>
        <QuestionNumber>Question {currentIndex + 1}</QuestionNumber>
        <Title>{currentQuestion.texte}</Title>
        {currentQuestion.question_type === 'select_choice' ? (
          <>
            {responses ? (
              <Grid>
                {responses.map((response, index) => (
                  <GridItem key={index}>
                    <ResponseComponent
                      key={response.id}
                      response={response.texte}
                      value={response.id}
                      checked={selectedResponse === response.id}
                      onChange={() => handleSelect(response.id)}
                    />
                  </GridItem>
                ))}
              </Grid>
            ) : (
              <p></p>
            )}
          </>
        ) : (
          <GlobalQuizEditor
            initialCode={currentQuestion.initial_code || ''}
            onCssChange={(code) => setUserCodeAnswer(code)}
          />
        )}
      </Container>
      <ButtonWrapper>
        <NextButton onClick={handleNext} glow={glow}>
          {currentIndex + 1 === questions.length ? 'Finish' : 'Next'}
        </NextButton>
      </ButtonWrapper>
      {showPopup && (
        <PopupOverlay>
          <ConfettiCanvas />
          <PopupBox>
            <PopupCloseBtn onClick={() => navigate('/home')}>×</PopupCloseBtn>
            <ScoreCircle>
              <Score>{finalScore}%</Score>
              <Exp>your score</Exp>
            </ScoreCircle>
            <CongratsText>
              {finalScore >= 90 ? "Congratulations!" : "You Got This"}
            </CongratsText>
            <PopupButtons>
              <PopupButton onClick={handleReviewAnswers}>Review Answers</PopupButton>
              <PopupButton onClick={handleGetBadgeOrRetry}>
                {badgeClaimed && finalScore >= 90
                  ? "See Badge"
                  : finalScore >= 90
                    ? "Claim Badge"
                    : "Retry"}
              </PopupButton>
            </PopupButtons>
          </PopupBox>
        </PopupOverlay>
      )}
    </>
  );
}