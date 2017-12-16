import React from 'react';
import PropTypes from 'prop-types';

import Chart from './Chart';

import styles from './ChartGroup.scss';
import classnames from 'classnames';

const ChartGroup = ({ name, charts }) => {
  return (
    <div className={styles.container}>
      <div className={classnames(styles.header, 'theme-border-bottom-lighter')}>
        <title className={'theme-color-lighter'}>{name}</title>
      </div>
      {charts.map((chart, idx) =>
        <Chart key={`chart-${idx}`} {...chart} />
      )}
    </div>
  );
};

ChartGroup.propTypes = {
  name: PropTypes.string.isRequired,
  charts: PropTypes.array.isRequired
};

export default ChartGroup;
