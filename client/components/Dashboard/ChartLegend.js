import React from 'react';
import PropTypes from 'prop-types';

import ChartLegendLine from './ChartLegendLine';

import styles from './ChartLegend.scss';
import classnames from 'classnames';

const ChartLegend = ({ name, lines, total }) => {
  return (
    <div className={classnames(styles.container, 'theme-color-lighter')}>
        <div className={ styles.header }>
            {name}
        </div>
        <div className={ styles.body }>
            { lines.map((line, idx) =>
              <ChartLegendLine
                key={`chart-legendLine-${idx}`}
                name={line.name}
                value={line.value}
                color={line.color}
                isCurrency={line.isCurrency}
              />) }
        </div>

        { total &&
          <div className={classnames(styles.footer, 'theme-border-top-lighter')}>
            <span>{total.name}</span>
            <span>{total.value}</span>
          </div> }
    </div>
  );
};

ChartLegend.propTypes = {
  name: PropTypes.string.isRequired,
  lines: PropTypes.array.isRequired,
  total: PropTypes.object
};

export default ChartLegend;
