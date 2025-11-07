import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const Section = styled.section`
  position: relative;
  min-height: 60vh;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  text-align: center;
  padding: 2rem 1rem;
  overflow: hidden;

  @media (max-width: 768px) {
    min-height: 50vh;
    padding: 1.5rem 1rem;
  }

  @media (max-width: 480px) {
    min-height: 45vh;
    padding: 1rem 0.5rem;
  }
`;

const BackgroundImage = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: 0;
`;

const Overlay = styled.div`
  position: absolute;
  inset: 0;
  background: rgba(49, 21, 58, 0.7);
  z-index: 1;
`;

const Content = styled.div`
  position: relative;
  max-width: 1200px;
  margin: auto;
  z-index: 2;
  padding: 0 1rem;
`;

const Title = styled.h1`
  font-size: 5rem;
  margin-bottom: 1rem;

  @media (max-width: 992px) {
    font-size: 3.5rem;
  }

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }

  @media (max-width: 480px) {
    font-size: 1.8rem;
  }
`;

const Subtitle = styled.p`
  font-size: 1.25rem;
  margin-bottom: 1.5rem;

  @media (max-width: 768px) {
    font-size: 1rem;
  }

  @media (max-width: 480px) {
    font-size: 0.9rem;
  }
`;

const Button = styled.button`
  padding: 15px 40px;
  background-color: #29cc57;
  border: none;
  border-radius: 30px;
  color: white;
  font-size: 1.2rem;
  cursor: pointer;
  transition: background 0.2s ease, transform 0.2s ease;

  &:hover {
    background-color: #1da84d;
  }

  &:active {
    transform: scale(0.95);
  }

  @media (max-width: 480px) {
    padding: 12px 30px;
    font-size: 1rem;
  }
`;
const StyledLink = styled(Link)`
  text-decoration: none;
`;

export default function Hero() {
  return (
    <Section>
      <BackgroundImage src="/images/Wallpaper.jpg" alt="Background" />
      <Overlay />
      <Content>
        <Title>Start your journey</Title>
        <Subtitle>Join over 10 million people learning interactively.</Subtitle>
        <StyledLink to="/register">
          <Button>Get Started</Button>
        </StyledLink>
      </Content>
    </Section>
  );
}
