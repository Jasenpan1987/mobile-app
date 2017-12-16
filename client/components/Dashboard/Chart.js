import React from 'react';
import PropTypes from 'prop-types';

import ChartLegend from './ChartLegend';
import { PieChart } from 'react-easy-chart';
import { GeneralAlignment } from '../UI/AlignmentComponents';

import classnames from 'classnames';
import styles from './Chart.scss';

const Chart = ({ name, dataset, total }) => {
  const containerCls = classnames(styles.container, 'theme-background-color-default', 'theme-border-lightest');
  return (
    <div className={containerCls}>
      <div className={styles.legend}>
        <ChartLegend name={name} total={total} lines={dataset} />
      </div>
      <GeneralAlignment alignment={'center'} className={styles.chart}>
        <PieChart
          size={280}
          data={dataset.map((data, index) => { return { key: index, value: data.value, color: data.color }; })}
        />
      </GeneralAlignment>
    </div>
  );
};

Chart.propTypes = {
  total: PropTypes.object,
  dataset: PropTypes.array.isRequired,
  name: PropTypes.string.isRequired
};

export default Chart;
