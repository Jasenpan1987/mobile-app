import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import styles from './style.scss';
import { Style } from '../StyleComponents';

export const HorizontalTab = ({ children, className, maxItems, height, ...rest }) => {
  const classNames = classnames(className, styles.horizontalTab);
  const classselector = classNames.split(' ').join('.');
  return (
    <div className={classnames(className, styles.horizontalTab)} {...rest}>
      <Style selector={`.${styles.horizontalTab} > .${styles.tabItem}`}
        styles={`${maxItems ? `width: ${100 / maxItems}%;` : ''} ${height ? `line-height: ${height}; height: ${height}` : ''}`}
      />
      <Style selector={`.${classselector}.${styles.horizontalTab}`}
        styles={`${height ? `height: ${height};` : ''}`}
      />
      {children}
    </div>
  );
};

HorizontalTab.propTypes = {
  children: PropTypes.any.isRequired,
  className: PropTypes.string,
  maxItems: PropTypes.number,
  height: PropTypes.string
};
