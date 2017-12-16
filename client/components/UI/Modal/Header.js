import React from 'react';
import PropTypes from 'prop-types';
import localStyles from './styles.scss';
import classnames from 'classnames';

const Header = ({ children, className, style }) => {
  return (
    <div className={classnames(localStyles.header, className)} style={style}>
      {children}
    </div>
  );
};

Header.propTypes = {
  children: PropTypes.any,
  style: PropTypes.object,
  className: PropTypes.string
};


export default Header;
