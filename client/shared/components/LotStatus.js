import React from 'react';
import PropTypes from 'prop-types';
import { Icon } from '../../components/UI/Icon';
import localStyles from './LotStatus.scss';

export const LotStatus = ({ children, status }) => {
  function getStatusColor() {
    if (status.match(/\/\d\sSigned/)) return '#e89435';
    switch (status) {
      case 'Not Signed': return '#4fa6eb';
      case 'Pending': return '#eac341';
      case 'Error': return '#ea4d3d';
      case 'All Signed': return '#6cbc3f';
      case 'Exchanged': return '#4fa6eb';
      case 'Signed': return '#e89435';
      default: return '#f5f6f7';
    }
  }

  return (
    <div className={localStyles.container}>
      <div style={{ lineHeight: '1.2rem' }}>
        { children }
      </div>
      <span style={{ color: '#ACAEB0', lineHeight: '1.2rem', float: 'left' }}>
        <Icon icon={'circle'} style={{ color: getStatusColor(), marginRight: '0.5rem' }} />
        { status }
      </span>
    </div>
  );
};

LotStatus.propTypes = {
  children: PropTypes.any,
  status: PropTypes.string,
  statusLabel: PropTypes.string
};
