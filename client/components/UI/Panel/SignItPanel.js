import React from 'react';
import PropTypes from 'prop-types';
import styles from './Panel.scss';
import { Icon } from '../../UI/Icon';

const isVendor = partyTypeName => /vendor/ig.test(partyTypeName);

const SignItPanel = ({ partyTypeName, children }) => {
  const isVendorParty = isVendor(partyTypeName);
  return (
    <div>
      <Icon
        icon={'user'}
        style={{ fontSize: '3.4rem', color: isVendorParty ? '#0696B7' : '#469D48' }}
      />
      <div className={styles.panelBodyContent}>
        {children}
      </div>
    </div>
  );
};

SignItPanel.propTypes = {
  partyTypeName: PropTypes.string,
  children: PropTypes.object
};

export { SignItPanel };
