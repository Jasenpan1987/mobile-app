import React from 'react';
import PropTypes from 'prop-types';
import localStyles from './styles.scss';
import classnames from 'classnames';

const Footer = ({ children, className, style }) => {
  return (
    <div className={classnames(localStyles.footer, className)} style={style}>
      {children}
    </div>
  );
};

Footer.propTypes = {
  children: PropTypes.any,
  style: PropTypes.object,
  className: PropTypes.string
};

export default Footer;
