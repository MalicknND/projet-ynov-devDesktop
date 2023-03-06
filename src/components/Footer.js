import React from 'react';
import styled from 'styled-components';

const Footer = () => {
  return (
    <FooterStyle>
      Made by <br />
      <a href="https://github.com/MalicknND" target="_blank" rel="noreferrer">
        Malick Siguy NDIAYE
      </a>
    </FooterStyle>
  );
};

const FooterStyle = styled.p`
  padding: 50px;
  text-align: center;
  font-size: 15px;
`;

export default Footer;
