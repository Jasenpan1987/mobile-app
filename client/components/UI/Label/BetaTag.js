import React from 'react';

import styles from './Label.scss';
import Label from '.';

const BetaTag = ({ ...props }) => (
  <Label info className={styles.beta} {...props}>BETA</Label>
);

export default BetaTag;
