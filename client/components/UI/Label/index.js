import classnames from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';

import styles from './Label.scss';
import BetaTag from './BetaTag';

const Label = ({ className, children, success, info, pending, error, orange, onClick, ...rest }) => {
  const modifiers = {
    [styles.default]: !success && !info && !pending && !error,
    [styles.success]: success,
    [styles.orange]: orange,
    [styles.info]: info,
    [styles.pending]: pending,
    [styles.error]: error,
    [styles.clickable]: !!onClick
  };

  return (
    <label className={classnames(styles.label, modifiers, className)} onClick={onClick} {...rest}>
      {children}
    </label>
  );
};

Label.propTypes = {
  className: PropTypes.string,
  children: PropTypes.any,
  success: PropTypes.bool,
  orange: PropTypes.bool,
  info: PropTypes.bool,
  pending: PropTypes.bool,
  error: PropTypes.bool,
  onClick: PropTypes.func
};

Label.BetaTag = BetaTag;

export { Label };
