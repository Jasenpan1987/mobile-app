import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import styles from './style.scss';

export const TabItem = ({ children, className, activeClassName, active, ...rest }) => {
  return (
    <div className={classnames(className, styles.tabItem, active && activeClassName)} {...rest}>
      {children}
    </div>
  );
};

TabItem.propTypes = {
  children: PropTypes.object.isRequired,
  className: PropTypes.string,
  active: PropTypes.bool,
  activeClassName: PropTypes.string
};
