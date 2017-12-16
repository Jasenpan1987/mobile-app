import * as React from 'react';
import PropTypes from 'prop-types';

export const Style = ({ selector, styles }) => {
  return (
    <style>
      { `${selector} { ${styles} }` }
    </style>
  );
};

Style.propTypes = {
  selector: PropTypes.string.isRequired,
  styles: PropTypes.string.isRequired
};
