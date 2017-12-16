import React from 'react';
import { Icon } from '../../../UI/Icon/';
import styles from './styles.scss';

export const NoRecordFound = () => {
  return (
    <div className={styles['no-record-found']}>
      <div>
        <Icon icon={'file-excel-o'} />
      </div>
      <div>
        <span>No records found</span>
      </div>
    </div>
  );
};
