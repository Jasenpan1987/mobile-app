import React from 'react';
import PropTypes from 'prop-types';
import { Icon } from '../UI/Icon';
import { Line } from 'rc-progress';
import styles from './ProgressLine.scss';

const ProgressLine = ({ text, hint, persent }) => {
  return (
    <div className={ styles.container }>
      <div className={ styles.progress }>
          <Line
            percent = {persent}
            strokeWidth={'4'}
            trailWidth={'4'}
            trailColor={'rgba(211, 211, 211, 0.5)'}
            strokeColor={'#4EAE54'}
            strokeLinecap={'butt'}
            style={{ height: '1.6rem', width: '100%' }}
          />
        <div>
          <Icon icon="flag-checkered" style={{ fontSize: '1.4rem' }} />
        </div>
      </div>
      <div className={ styles.description }>
        <h2>{text}</h2>
        <h4>{hint}</h4>
      </div>
    </div>
  );
};

ProgressLine.propTypes = {
  text: PropTypes.string.isRequired,
  hint: PropTypes.string.isRequired,
  persent: PropTypes.number.isRequired
};

export default ProgressLine;
