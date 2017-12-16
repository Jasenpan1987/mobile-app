import React from 'react';
import { Link } from 'react-router';

import { BackgroundImageStyle } from '../UI/StyleComponents';
import styles from './NotFound.scss';

export const NotFound = () => ((
  <div className={styles.container}>
    <BackgroundImageStyle
      selector={`.${styles.container}`}
      src={'mobile/grid_bg.png'}
      colorSet={[
        { hex: '#0696B7', opacity: 0.95, percent: 0 },
        { hex: '#0B7D96', opacity: 0.95, percent: 30 },
        { hex: '#146076', opacity: 0.95, percent: 60 },
        { hex: '#003E5C', opacity: 0.95, percent: 100 }]}
    />
    <div className={styles.center}>
      <h1>404 - Page not found</h1>
      <p>The resource you were looking for might not exist or has been deleted.</p>
      <Link to={"/"}>
        <i className="fa fa-arrow-circle-right" aria-hidden="true"></i>
        Click here to take me back to PlanIT
      </Link>
    </div>
  </div>
));
