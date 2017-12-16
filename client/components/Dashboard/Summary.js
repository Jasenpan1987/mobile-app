import React from 'react';
import PropTypes from 'prop-types';
import ProgressLine from './ProgressLine';
import styles from './Summary.scss';

const Summary = ({ projectName, progressLines }) => {
  return (
    <div>
      <div className={styles.header}>
        <p>Here's the lastest summary for</p>
        <h2>{projectName}</h2>
      </div>
      <div>
        {progressLines.map((progressLine, idx) =>
          <ProgressLine
            key={`progressLine-${idx}`}
            text={progressLine.text}
            hint={progressLine.hint}
            persent={progressLine.persent}
          />)}
      </div>
    </div>
  );
};

Summary.propTypes = {
  projectName: PropTypes.string.isRequired,
  progressLines: PropTypes.array.isRequired
};

export default Summary;
