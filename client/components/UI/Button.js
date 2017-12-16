import React from 'react';
import PropTypes from 'prop-types';
import styled, { ThemeProvider } from 'styled-components';

const DefaultButton = styled.button`
  background-color: ${props => props.theme.inner};
  color: ${props => props.theme.main};
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid ${props => props.theme.main};
  border-radius: ${props => props.theme.br || '3px'};
`;

const Button = ({ text }) => {
  return (
    <ThemeProvider theme={window.getThemeByStr()} >
      <DefaultButton
        onClick={() => {window.BRANDING = 'maddocks'; }}
      >{text}</DefaultButton>
    </ThemeProvider>
  );
};

Button.propTypes = {
  text: PropTypes.string.isRequired
};

export default Button;
