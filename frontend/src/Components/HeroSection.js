import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import {
  FaHtml5,
  FaCss3Alt,
  FaJs,
  FaPython,
  FaReact,
  FaNodeJs,
  FaJava,
  FaPhp,
  FaSwift,
  FaAngular
} from 'react-icons/fa';

const HeroContainer = styled.div`
  position: relative;
  width: 100%;
  height: 80vh;
  background-color: #13002c;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  flex-direction: column;
  text-align: center;
  color: #fff;
`;

const Grid = styled.div`
  position: absolute;
  inset: 0;
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  grid-template-rows: repeat(6, 1fr);
  width: 100%;
  height: 100%;
`;

const shine = keyframes`
  0% {
    background-position: -200% 0;
  }
  100% {
    background-position: 200% 0;
  }
`;

const glow = keyframes`
  0% {
    box-shadow:
      inset 0 0 6px rgba(181, 126, 220, 0.2),
      0 0 4px rgba(181, 126, 220, 0.15);
  }
  50% {
    box-shadow:
      inset 0 0 10px rgba(181, 126, 220, 0.4),
      0 0 8px rgba(181, 126, 220, 0.3);
  }
  100% {
    box-shadow:
      inset 0 0 6px rgba(181, 126, 220, 0.2),
      0 0 4px rgba(181, 126, 220, 0.15);
  }
`;

const GridLine = styled.div`
  position: absolute;
  background: linear-gradient(
    to right,
    #d7d7d7 0%,
    #a3a3a3 20%,
    #fefefe 50%,
    #a3a3a3 80%,
    #d7d7d7 100%
  );
  background-size: 200% auto;
  animation: ${shine} 4s linear infinite;
  opacity: 0.15;
  filter: drop-shadow(0 0 1px rgba(255, 255, 255, 0.1));
`;

const VerticalLine = styled(GridLine)`
  width: 2px;
  height: 100%;
  top: 0;
  background: linear-gradient(
    to bottom,
    #d7d7d7 0%,
    #a3a3a3 20%,
    #fefefe 50%,
    #a3a3a3 80%,
    #d7d7d7 100%
  );
`;

const HorizontalLine = styled(GridLine)`
  height: 2px;
  width: 100%;
  left: 0;
`;

const IconWrapper = styled.div`
  width: 70px;
  height: 70px;
  background-color: rgba(181, 126, 220, 0.1);
  backdrop-filter: blur(4px);
  border-radius: 12%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.2s ease-out;
  color: #B57EDC;
  font-size: 2rem;
  justify-self: center;
  align-self: center;

  box-shadow:
    inset 0 0 8px rgba(181, 126, 220, 0.3),
    0 0 6px rgba(181, 126, 220, 0.25);

  animation: ${glow} 3s ease-in-out infinite alternate;
`;

const TextSection = styled.div`
  position: absolute;
  top: 45%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  color: #fff;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const ascending = keyframes`
  0% {
    transform: translateY(50px);
    opacity: 0;
  }
  100% {
    transform: translateY(0);
    opacity: 1;
  }
`;

const Heading = styled.h1`
  font-size: 4rem;
  margin-bottom: 1rem;
  color: #b57edc;
  text-shadow: 0 0 10px rgba(181, 126, 220, 0.8);
  animation: ${ascending} 1s ease-out forwards;
`;

const Subheading = styled.h2`
  font-size: 2rem;
  margin-bottom: 2rem;
  color: #fff;
  opacity: 0.9;
  text-shadow: 0 0 10px rgba(181, 126, 220, 0.5);
  animation: ${ascending} 1.2s ease-out forwards;
`;

const Button = styled.button`
  padding: 15px 40px;
  background-color: #29CC57;
  border: none;
  border-radius: 30px;
  color: white;
  font-size: 1.2rem;
  cursor: pointer;
  transition: background 0.2s ease, transform 0.2s ease;
  animation: ${ascending} 1.4s ease-out forwards;

  &:hover {
    background-color: #1da84d;
  }

  &:active {
    transform: scale(0.95);
  }
`;

const HeroSection = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/register');
  };

  const iconPositions = [
    { row: 1, col: 1, icon: <FaHtml5 /> },
    { row: 2, col: 8, icon: <FaCss3Alt /> },
    { row: 4, col: 2, icon: <FaJs /> },
    { row: 1, col: 7, icon: <FaPython /> },
    { row: 5, col: 3, icon: <FaReact /> },
    { row: 2, col: 2, icon: <FaNodeJs /> },
    { row: 5, col: 6, icon: <FaJava /> },
    { row: 4, col: 7, icon: <FaPhp /> },
    { row: 5, col: 8, icon: <FaSwift /> },
    { row: 6, col: 2, icon: <FaAngular /> },
  ];

  return (
    <HeroContainer>
      <Grid>
        {iconPositions.map((item, index) => (
          <IconWrapper
            key={`icon-${index}`}
            style={{
              gridRow: item.row,
              gridColumn: item.col,
            }}
          >
            {item.icon}
          </IconWrapper>
        ))}
        {Array.from({ length: 7 }, (_, i) => (
          <VerticalLine
            key={`v-${i}`}
            style={{ left: `${(100 / 8) * (i + 1)}%` }}
          />
        ))}
        {Array.from({ length: 5 }, (_, i) => (
          <HorizontalLine
            key={`h-${i}`}
            style={{ top: `${(100 / 6) * (i + 1)}%` }}
          />
        ))}
      </Grid>

      <TextSection>
        <Heading>Achieve Your Coding Goals</Heading>
        <Subheading>Your path to coding mastery starts here</Subheading>
        <Button onClick={handleGetStarted}>Get Started</Button>
      </TextSection>
    </HeroContainer>
  );
};

export default HeroSection;
