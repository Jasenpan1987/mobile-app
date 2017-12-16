import React from 'react';
import PropTypes from 'prop-types';
import { Icon } from '../UI/Icon';
import styles from './ChartLegendLine.scss';
import { formatCurrency } from '../../utils';

const ChartLegendLine = ({ color, name, value, isCurrency }) => {
  return (
    <div className={ styles.container }>
      <Icon icon="circle" style={{ color: `${color}` }} />
      <div className={ isCurrency ? styles.currency : styles.value }>
        <span>{name}</span>
        <span>{isCurrency ? formatCurrency(value, 0) : value}</span>
      </div>
    </div>
  );
};

ChartLegendLine.propTypes = {
  color: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
  valueBottom: PropTypes.bool,
  isCurrency: PropTypes.bool
};

export default ChartLegendLine;
