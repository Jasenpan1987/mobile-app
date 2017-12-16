import React from 'react';
import PropTypes from 'prop-types';

import styles from './CircleDecoration.scss';
import { GeneralAlignment } from '../AlignmentComponents';
import classnames from 'classnames';

const getFontSizeFromCircleLabel = circle => {
  const chars = circle.length;
  if (chars > 7) return styles.xs;
  if (chars > 6) return styles.md;
  if (chars > 4) return styles.sm;
  return styles.lg;
};

export const CircleDecoration = ({ circle, children, ...rest }) => {
  const circleContainerCls = classnames(styles['circle-container'], 'theme-shadow-lighter');
  const circleTextCls = classnames('theme-color-lighter', getFontSizeFromCircleLabel(circle));
  return (
    <div className={styles.container} {...rest}>
      <GeneralAlignment alignment={'center'} className={circleContainerCls}>
        <span className={circleTextCls}>{circle}</span>
      </GeneralAlignment>

      <div className={styles['text-container']}>
        <div className={styles['text-inner']}>
          {children}
        </div>
      </div>
    </div>
  );
};

CircleDecoration.propTypes = {
  circle: PropTypes.string.isRequired,
  children: PropTypes.any
};
