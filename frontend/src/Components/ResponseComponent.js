import React from 'react';
import styled, { css } from 'styled-components';

const ResponseWrapper = styled.label`
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
    props.checked &&
    css`
      background-color: rgba(142, 68, 173, 0.3);
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

const ResponseComponent = ({ response, value, checked, onChange }) => {
  return (
    <ResponseWrapper checked={checked}>
      <HiddenRadio
        type="radio"
        name="choice"
        value={value}
        checked={checked}
        onChange={onChange}
      />
      <TextContainer>
        <span>{response}</span>
      </TextContainer>
    </ResponseWrapper>
  );
};

export default ResponseComponent;
