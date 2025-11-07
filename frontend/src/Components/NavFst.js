import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const NavbarWrapper = styled.div`
  position: sticky;
  top: -100px;
  z-index: 1000;
  background-color: #13002c;
  transition: top 0.3s ease, background-color 0.3s ease;
  border-bottom: 2px solid rgba(255, 255, 255, 0.2);
`;

const NavbarContainer = styled.nav`
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 8vh;

  @media (max-width: 768px) {
    padding: 0.8rem 1rem;
  }
`;

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  margin-left: 7rem;

  @media (max-width: 768px) {
    margin-left: 0;
  }
`;

const LogoImage = styled.img`
  width: 90%;
  height: auto;

  @media (max-width: 768px) {
    height: 12.5vh;
    width: auto;
  }
`;

const ButtonsContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-right: 11rem;

  @media (max-width: 768px) {
    margin-right: 0.5rem;
    gap: 0.5rem;
  }
`;

const Button = styled.button`
  background: transparent;
  border: 2px solid rgba(255, 255, 255, 0.3);
  color: ${({ green }) => (green ? 'white' : 'white')};
  padding: 0.8rem 1.5rem;
  border-radius: 50px;
  font-size: 1rem;
  line-height: 24px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;

  ${({ green }) =>
    green &&
    `
    background-color: #29CC57;
    border: 2px solid #29CC57;
    `}

  &:hover {
    background-color: ${({ green }) =>
      green ? '#1da84d' : 'rgba(255, 255, 255, 0.05)'};
    border-color: ${({ green }) =>
      green ? '#1da84d' : 'rgba(255, 255, 255, 0.2)'};
  }

  &:active {
    transform: scale(0.98);
  }

  @media (max-width: 768px) {
    font-size: 0.8rem;
    padding: 0.5rem 1rem;
  }
`;

const NavFst = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    const onResize = () => setIsMobile(window.innerWidth <= 768);

    window.addEventListener('scroll', onScroll);
    window.addEventListener('resize', onResize);

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return (
    <NavbarWrapper style={{ top: scrolled ? '0' : '-100px' }}>
      <NavbarContainer>
        <LogoContainer>
          <Link to="/">
            <LogoImage src="/images/CodeCoon_logo.svg" alt="CodeCoon Logo" />
          </Link>
        </LogoContainer>
        <ButtonsContainer>
          {isMobile ? (
            scrolled ? (
              <Link to="/register">
                <Button green>Get Started</Button>
              </Link>
            ) : (
              <Link to="/login">
                <Button>Log in</Button>
              </Link>
            )
          ) : (
            <>
              <Link to="/login">
                <Button>Log in</Button>
              </Link>
              {scrolled && (
                <Link to="/register">
                  <Button green>Get Started</Button>
                </Link>
              )}
            </>
          )}
        </ButtonsContainer>
      </NavbarContainer>
    </NavbarWrapper>
  );
};

export default NavFst;
