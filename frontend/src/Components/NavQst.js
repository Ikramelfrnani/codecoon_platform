import React from 'react';
import styled from 'styled-components';

const Navbar = styled.nav`
  height: 8vh;
  background-color: #13002c;
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: 2px solid rgba(255, 255, 255, 0.2);
`;

const LogoWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Logo = styled.img`
  width: 90%;
  height: auto;
`;

const NavQst = () => {
  return (
    <Navbar>
      <LogoWrapper>
        <Logo src='/images/Logo.svg' alt='CodeCoon Logo' />
      </LogoWrapper>
    </Navbar>
  );
};

export default NavQst;
