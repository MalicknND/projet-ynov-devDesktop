import React from 'react';
import styled from 'styled-components';

const Footer = () => {
  return (
    <Ftr>
      <a href="https://github.com/MalicknND">Malick</a>
    </Ftr>
  );
};

const Ftr = styled.footer`
  font-family: 'Helvetica Neue';
  font-weight: 400;
  font-size: 15px;
  margin-top: 10px;
  color: white;

  a {
    color: white;
    font-size: 20px;
  }
`;

export default Footer;
