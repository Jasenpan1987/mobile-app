import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

export const Icon = ({ icon, className, size, spin, ...rest }) => {
  let sizeClass = '';
  if (size) {
    sizeClass = `fa-${size}x`;
  }
  const finalClassName = classnames(`fa fa-${icon}`, sizeClass, { 'fa-spin': spin }, className);

  return (
    <i className={finalClassName} {...rest}></i>
  );
};

Icon.propTypes = {
  icon: PropTypes.string.isRequired,
  loading: PropTypes.bool,
  className: PropTypes.string,
  size: PropTypes.number,
  spin: PropTypes.bool
};
