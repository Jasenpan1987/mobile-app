import * as React from 'react';
import PropTypes from 'prop-types';

export const Image = ({ src, ...rest }) => (
  <img src={`${window.API_BASE}/images/${src}`} {...rest} />
);

Image.propTypes = {
  src: PropTypes.string.isRequired
};
