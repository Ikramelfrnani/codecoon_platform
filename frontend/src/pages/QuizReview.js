// QuizReview.js
import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchResponsesByQuiz } from '../slices/utilisateurReponseSlice';
import styled from 'styled-components';
import NavQst from '../Components/NavQst';
import axios from 'axios';
import { toast } from 'react-toastify';
import Loader from '../Components/Loader';

import { FaRegCheckCircle, FaRegTimesCircle } from 'react-icons/fa';

const Container = styled.div`
  color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  top: 4rem;
  width: 100%;
`;

const ReviewSection = styled.div`
  width: 80%;
  max-width: 700px;
  margin-top: 2rem;
`;

const SectionHeader = styled.div`
  width: 80%;
  max-width: 700px;
  margin-top: 3rem;
  text-align: left;
  border-bottom: 2px solid #6b0a83;
  padding-bottom: 0.5rem;
`;

const AnswerCard = styled.div`
  background-color: rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  padding: 1rem 1.5rem;
  margin-bottom: 1.2rem;
  box-shadow: 0 3px 8px rgba(0, 0, 0, 0.3);
  transition: transform 0.2s ease, background-color 0.3s ease;

  &:hover {
    transform: translateY(-3px);
    background-color: rgba(255, 255, 255, 0.1);
  }
`;

const QuestionWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
`;

const QuestionTextContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  flex: 1;
  min-width: 200px;
`;

const QuestionText = styled.p`
  font-size: 1.1rem;
  margin-bottom: 0.5rem;
  color: #eee;
  margin: 0;
`;

const StatusIconContainer = styled.div`
  display: flex;
  align-items: center;
  font-size: 1.5rem;
  color: ${({ isCorrect }) => (isCorrect ? 'limegreen' : 'crimson')};
  min-width: 120px;
  justify-content: flex-end;
  margin-top: 1rem;
`;

const UserAnswer = styled.div`
  margin-top: 0.5rem;
  font-weight: 500;
  color: #ccc;
  font-size: 1rem;
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

const Titre = styled.h1`
  color: white;
  text-align: center;
  color: #6b0a83;
  letter-spacing: 2px;
  margin-bottom: 0.2rem;
`;

const SubTitre = styled.h3`
  margin-top: 1rem;
  text-align: center;
  opacity: 0.9;
`;

const Btn = styled.button`
  padding: 0.75rem 1.5rem;
  background-color: #8E44AD;
  color: white;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  font-weight: bold;
  position: relative;
  left: 18%;

  &:hover {
    background-color: #a45ee5;
  }
`;

export default function QuizReview() {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [userBadges, setUserBadges] = useState([]);
  const [hasBadge, setHasBadge] = useState(false);

  const quizId = location.state?.quizId;
  const langage_name = location.state?.langage || "Quiz";
  const score = location.state?.score || 0;
  const utilisateur_id = localStorage.getItem('utilisateur_id');

  const { responsesByQuiz, status } = useSelector((state) => state.utilisateurReponse);

  // Fetch user badges and check if they have this quiz's badge
  useEffect(() => {
    const fetchUserBadges = async () => {
      try {
        const res = await axios.get(`http://localhost:8000/api/utilisateur/${utilisateur_id}/badges`);
        setUserBadges(res.data);

        const foundBadge = res.data.some(badge => badge.langage_id == id);
        setHasBadge(foundBadge);
      } catch (error) {
        console.error("Error fetching user badges:", error);
      }
    };

    if (!quizId || !utilisateur_id) {
      navigate(-1);
    } else {
      dispatch(fetchResponsesByQuiz({ quizId, utilisateurId: utilisateur_id }));
      fetchUserBadges();
    }
  }, [dispatch, quizId, utilisateur_id, id, navigate]);

  // if (status === 'loading') return <p>Loading your answers...</p>;
  // if (status === 'failed') return <p>Error loading your answers.</p>;

  const handleExitQuiz = () => {
    window.location.href = '/home';
  };

  const handleGetBadgeOrRetry = async () => {
  if (score >= 90 && !hasBadge) {
    try {
      const badgeResponse = await axios.get(`http://localhost:8000/api/badge/langage/${id}`);
      const badge_id = badgeResponse.data?.id;

      if (!badge_id) {
        toast.error("No badge found for this language.");
        return;
      }

      // Assign badge
      const response = await axios.post('http://localhost:8000/api/utilisateur/badges', {
        utilisateur_id,
        badge_id,
      });

      if (response.status === 200 || response.status === 201) {
        toast.success('Badge unlocked successfully!');
        setHasBadge(true);
      }
    } catch (error) {
      console.error('Error assigning badge:', error);
      toast.error('Failed to unlock badge.');
    }
  } else if (hasBadge && score >= 90) {
    navigate('/badges');
  } else {
    navigate(`/global-quiz/${id}`, {
      state: {
        quizId,
        nom_langage: langage_name,
      },
    });
  }
};

  if (status === 'loading') {
      return (
        <>
          <Loader />
        </>
      );
    }
  
  if (status === 'failed') return <div style={{ color: 'red' }}>Error loading your answers</div>;
  return (
    <div style={{ height: '150vh' }}>
      <NavQst />
      <CloseButton onClick={handleExitQuiz}>X</CloseButton>
      <Container>
        <Titre>Final Quiz Result</Titre>
        <SubTitre>Your score: {score}%</SubTitre>

        <SectionHeader>
          <h2 style={{ marginBottom: '1rem' }}>Your Answers</h2>
        </SectionHeader>

        <ReviewSection>
          {responsesByQuiz.map((resp, index) => (
            <AnswerCard key={index}>
              <QuestionWrapper>
                <QuestionTextContainer>
                  <QuestionText>{index + 1}. {resp.question.texte}</QuestionText>
                </QuestionTextContainer>
                <StatusIconContainer isCorrect={resp.estcorrect}>
                  {resp.estcorrect ? <FaRegCheckCircle /> : <FaRegTimesCircle />}
                </StatusIconContainer>
              </QuestionWrapper>
              <UserAnswer>
                Your Answer: <span>{resp.reponse}</span>
              </UserAnswer>
            </AnswerCard>
          ))}
        </ReviewSection>

        <Btn onClick={handleGetBadgeOrRetry}>
          {hasBadge && score >= 90
            ? "See Badge"
            : score >= 90
              ? "Claim Badge"
              : "Retry"}
        </Btn>
      </Container>
    </div>
  );
}