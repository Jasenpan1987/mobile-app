import React from 'react';
import PropTypes from 'prop-types';
import localStyles from './styles.scss';
import classnames from 'classnames';

const Body = ({ children, className, style }) => {
  return (
    <div className={classnames(localStyles.body, className)} style={style}>
      {children}
    </div>
  );
};

Body.propTypes = {
  children: PropTypes.any,
  style: PropTypes.object,
  className: PropTypes.string
};

export default Body;
