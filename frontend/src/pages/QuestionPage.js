import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import questions from '../data/questions';
import { useDispatch, useSelector } from 'react-redux';
import { saveAnswer } from '../slices/answersSlice';
import { updateUser } from '../slices/usersSlice';
import ChoiceComponent from '../Components/ChoiceComponent';
import styled from 'styled-components';
import NavQst from '../Components/NavQst';
import Loader from '../Components/Loader';

const Container = styled.div`
  max-width: 60%;
  margin: 0 auto;
  padding: 20px;
  margin-top: 5%;
`;

const Title = styled.h1`
  color: white;
  font-size: 40px;
  font-weight: 700;
  font-family: Inter, sans-serif;
  margin-bottom: 32px;
  text-align: center;
`;

const Grid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
`;

const GridItem = styled.div`
  flex: 1 1 250px;
  max-width: 250px;
  box-sizing: border-box;
  margin: 0;
`;

const ProgressContainer = styled.div`
  width: 50%;
  margin: 5% auto;
`;

const StepText = styled.p`
  color: rgba(255, 255, 255, 0.5);
  font-size: 1rem;
  font-family: Inter, sans-serif;
  margin-top: 8px;
  text-align: center;
`;

const ProgressWrapper = styled.div`
  width: 100%;
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  height: 6px;
  overflow: hidden;
`;

const ProgressBar = styled.div`
  height: 100%;
  background-color: #8E44AD;
  width: ${({ progress }) => progress}%;
  transition: width 0.3s ease-in-out;
`;

const QuestionPage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { responses } = useSelector((state) => state.answers);
  const [loading, setLoading] = useState(true);

  const questionIndex = questions.findIndex(q => q.slug === slug);
  const question = questions[questionIndex];

  useEffect(() => {
    if (!question) {
      navigate('/');
    } else {
      // simulate a loading state for user experience or data fetch
      const timeout = setTimeout(() => setLoading(false), 300); // or 0 if instant
      return () => clearTimeout(timeout);
    }
  }, [question, navigate]);

  const userId = localStorage.getItem('utilisateur_id');

  const handleSelect = (choice) => {
    dispatch(saveAnswer({ questionId: question.id, answer: choice }));
    dispatch(updateUser({ id: userId, field: question.field, value: choice }));

    const nextQuestion = questions[questionIndex + 1];
    if (nextQuestion) {
      navigate(`/onboard/${nextQuestion.slug}`);
    } else {
      navigate('/finish-questionnaire');
    }
  };

  const totalSteps = questions.length;
  const currentStep = questionIndex + 1;
  const progressPercentage = (currentStep / totalSteps) * 100;

  if (loading) return <Loader />; // ✅ Loader here

  return (
    <>
      <NavQst />
      <ProgressContainer>
        <ProgressWrapper>
          <ProgressBar progress={progressPercentage} />
        </ProgressWrapper>
      </ProgressContainer>
      <Container>
        <StepText>Step {currentStep}</StepText>
        <Title>{question?.title}</Title>
        <Grid>
          {question?.choices.map((choice, index) => (
            <GridItem key={index}>
              <ChoiceComponent
                choice={choice}
                isSelected={responses[question.id] === choice}
                onSelect={handleSelect}
              />
            </GridItem>
          ))}
        </Grid>
      </Container>
    </>
  );
};

export default QuestionPage;
