import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchResponsesByQuiz } from '../slices/utilisateurReponseSlice';
import styled from 'styled-components';
import Loader from '../Components/Loader';

const Logo = styled.div`
  svg {
    width: 100px;
  }

  #left-ear,
  #right-ear {
    transform-origin: center;
    animation: wiggle 1s ease-in-out infinite alternate;
  }

  #right-ear {
    animation-delay: 0.2s;
  }

  #nose {
    animation: bob 1.2s ease-in-out infinite alternate;
  }

  @keyframes wiggle {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(5deg); }
  }

  @keyframes bob {
    0% { transform: translateY(0); }
    100% { transform: translateY(-2px); }
  }

  @media (max-width: 768px) {
    svg {
      width: 60px !important;
      height: auto;
    }
  }
`;

const Container = styled.div`
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  top: 8rem;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 2rem;
`;

const ActionButton = styled.button`
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  background-color: #804a97;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #693b7d;
  }
`;

const AnimatedReviewSection = styled.div`
  max-height: ${({ show }) => (show ? '1000px' : '0px')};
  opacity: ${({ show }) => (show ? 1 : 0)};
  overflow-y: hidden;
  transition: max-height 0.5s ease, opacity 0.5s ease;
  margin-top: ${({ show }) => (show ? '2rem' : '0')};
  background-color: rgba(255, 255, 255, 0.05);
  padding: ${({ show }) => (show ? '1rem 2rem' : '0 2rem')};
  border-radius: 10px;
  width: 80%;
  max-width: 700px;
`;

const AnswerItem = styled.div`
  border-bottom: 1px solid #666;
  padding: 1rem 0;
  display: flex;
  flex-direction: column;

  span {
    margin-top: 0.25rem;
  }
`;

const Icon = styled.span`
  margin-left: 0.5rem;
  color: ${props => props.correct ? 'limegreen' : 'crimson'};
`;

export default function QuizComplete() {
  const location = useLocation();
  const dispatch = useDispatch();

  const [showReview, setShowReview] = useState(false);

  const nomLangage = location.state?.nom_langage || "unknown";
  const score = location.state?.score ?? 0;
  const quizId = location.state?.quizId;
  const utilisateur_id = localStorage.getItem('utilisateur_id');

  const { responsesByQuiz, status, error } = useSelector((state) => state.utilisateurReponse);

  useEffect(() => {
    if (quizId && utilisateur_id) {
      dispatch(fetchResponsesByQuiz({ quizId, utilisateurId: utilisateur_id }));
    }
  }, [dispatch, quizId, utilisateur_id]);

  const userAnswers = responsesByQuiz.map((resp) => ({
    questionText: resp.question.texte,
    selectedText: resp.reponse,
    isCorrect: resp.estcorrect,
  }));

  if (status === 'loading') return <Loader />;
  if (status === 'failed') return <p>Error loading answers: {error}</p>;

  return (
    <Container>
      <Logo>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 56.69 56.69" width="80">
          <defs>
            <style>{`.cls-1{fill:#804a97;}.cls-2{fill:#fff;}`}</style>
          </defs>
          <path className="cls-1" d="M7.28,17.47v5.89L29.79,8.78,52.3,23.36V17.18L32.54,4.05s-3-1.45-5.43.08Z" />
          <polygon id="left-ear" className="cls-1" points="10.2 15.29 8.93 5.94 19.45 8.96 10.2 15.29" />
          <polygon id="right-ear" className="cls-1" points="40.12 8.87 50.55 5.94 49.47 15.1 40.12 8.87" />
          <polygon id="nose" className="cls-1" points="26.32 27.9 33.26 27.9 29.79 31.08 26.32 27.9" />
          <polygon className="cls-2" points="32.52 16.43 32.52 22.54 42.58 28.7 32.52 34.88 32.52 40.97 46.59 31.77 46.59 25.68 32.52 16.43" />
          <polygon className="cls-2" points="27.1 16.43 27.1 22.52 17.04 28.7 27.1 34.86 27.1 40.97 13.03 31.72 13.03 25.63 27.1 16.43" />
        </svg>
      </Logo>

      <h1>Congratulations!</h1>
      <p>You've completed the <strong>{nomLangage}</strong> global quiz.</p>
      <h2>Your Score: {score}%</h2>

      <ButtonContainer>
        <ActionButton onClick={() => setShowReview(prev => !prev)}>
          {showReview ? 'Hide Review' : 'Review Answers'}
        </ActionButton>
        <ActionButton onClick={() => console.log('Get Badge clicked')}>Get Badge</ActionButton>
      </ButtonContainer>

      <AnimatedReviewSection show={showReview}>
        {userAnswers.map((answer, index) => (
          <AnswerItem key={index}>
            <strong>Q{index + 1}: {answer.questionText}</strong>
            <span>
              Your Answer: {answer.selectedText}
              <Icon correct={answer.isCorrect}>
                {answer.isCorrect ? '✅' : '❌'}
              </Icon>
            </span>
          </AnswerItem>
        ))}
      </AnimatedReviewSection>
    </Container>
  );
}
