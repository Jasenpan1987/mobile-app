import React from 'react';
import PropTypes from 'prop-types';
import { Icon } from '../../../UI/Icon';
import { GeneralAlignment, HorizontalAlignment } from '../../../UI/AlignmentComponents';

import globalStyles from '../../../../shared/styles/global.scss';
import localStyles from './IconButton.scss';

export const IconButton = ({ icon, spin, label, onClick }) => {
  return (
    <GeneralAlignment alignment={'center'} className={localStyles.container}>
      <div className={globalStyles['image-btn']} onClick={onClick}>
        <HorizontalAlignment alignment={'middle'}>
          <Icon icon={icon} spin={spin} />
        </HorizontalAlignment>
        <span>{label}</span>
      </div>
    </GeneralAlignment>
  );
};

IconButton.propTypes = {
  icon: PropTypes.string.isRequired,
  label: PropTypes.string,
  onClick: PropTypes.func,
  spin: PropTypes.bool
};
