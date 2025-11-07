import React from "react";
import styled from "styled-components";

// Styled Components
const FooterContainer = styled.footer`
  background-color: #000;
  color: white;
  padding: 50px 40px 20px;
  font-family: sans-serif;
`;


const FooterContent = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  max-width: 1200px;
  margin: auto;
`;

const Column = styled.div`
  flex: 1;
  min-width: 160px;
  margin: 3%;

  h4 {
    font-weight: 500;
    color: #aaa;
    margin-bottom: 10px;
  }

  a {
    display: block;
    margin: 6px 0;
    color: white;
    text-decoration: none;
    font-weight: 500;

    &:hover {
      text-decoration: underline;
    }
  }
`;
const SocialIcons = styled.div`
  display: flex;
  gap: 16px;
  margin-top: 14px;

  a {
    color: white;
    font-size: 20px;
    text-decoration: none;
  }
`;

const FooterBottom = styled.div`
  border-top: 1px solid #222;
  margin-top: 40px;
  padding-top: 20px;
  font-size: 13px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;

  a {
    color: #aaa;
    margin-right: 20px;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }

  span {
    color: #aaa;
  }
`;

const Footer = () => {
  return (
    <FooterContainer>
      <FooterContent>
        <Column>
        
        <img src="images/codecoon.svg" alt="Logo"/>
        
          
        </Column>

        <Column>
          <h4>Product</h4>
          <a href="/login">Courses</a>
          <a href="#tutorial">Tutorial</a>
          <a href="/support">Support</a>
        </Column>

        <Column>
          <h4>Company</h4>
          <a href="#">About us</a>
          <a href="#">Careers</a>
          <a href="#">Educators</a>
        </Column>

        
        <Column>
        <SocialIcons>
            <a href="#"><i className="fab fa-facebook-f" /></a>
            <a href="#"><i className="fab fa-instagram" /></a>
            <a href="#"><i className="fab fa-x-twitter" /></a>
            <a href="#"><i className="fab fa-linkedin-in" /></a>
          </SocialIcons></Column>
      </FooterContent>

      <FooterBottom>
        <div>
          <a href="#">Terms of service</a>
          <a href="#">Privacy policy</a>
        </div>
        <span>© 2025 CodeCoon Worldwide, Inc.</span>
      </FooterBottom>
    </FooterContainer>
  );
};

export default Footer;
