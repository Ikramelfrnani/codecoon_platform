import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

const Container = styled.div`
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  color: white;
`;

const CompletionPage = () => {
  const answers = useSelector((state) => state.answers);

  const handleSubmit = () => {
    console.log("Submitting answers:", answers.responses);
  };

  return (
    <Container>
      <h1>You're on the right track!</h1>
      <p>Thanks for answering. Your responses:</p>
      <ul>
        {Object.entries(answers.responses).map(([qid, answer]) => (
          <li key={qid}>Question {qid}: {answer}</li>
        ))}
      </ul>
      <button onClick={handleSubmit}>Submit Answers</button>
    </Container>
  );
};

export default CompletionPage;
