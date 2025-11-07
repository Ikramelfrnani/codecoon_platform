// Components/ChoiceComponent.js
import React from 'react';
import styled, { css } from 'styled-components';

const ChoiceWrapper = styled.label`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem 0.5rem;
  border-radius: 1.25rem;
  background-color: transparent;
  width: 100%;
  border: 2px solid rgba(255, 255, 255, 0.3);
  cursor: pointer;
  transition: all 0.3s ease;
  text-align: center;
  box-sizing: border-box;

  &:hover {
    background-color: rgba(128, 128, 128, 0.2);
    border: 2px solid #8E44AD;
  }

  ${(props) =>
    props.$isSelected &&
    css`
      background-color: rgba(128, 128, 128, 0.2);
      border: 2px solid #8E44AD;
    `}
`;

const HiddenRadio = styled.input`
  display: none;
`;

const TextContainer = styled.div`
  text-align: center;
  width: 100%;
  span {
    margin: 0;
    font-size: 1rem;
    color: white;
    font-family: "Inter", sans-serif;
    font-weight: 600;
  }
`;

const ChoiceComponent = ({ choice, isSelected, onSelect }) => {
  return (
    <ChoiceWrapper $isSelected={isSelected}>
      <HiddenRadio
        type="radio"
        name="choice"
        value={choice}
        checked={isSelected}
        onChange={() => onSelect(choice)}
      />
      <TextContainer>
        <span>{choice}</span>
      </TextContainer>
    </ChoiceWrapper>
  );
};

export default ChoiceComponent;
