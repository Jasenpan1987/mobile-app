import React from 'react';
import PropTypes from 'prop-types';
import { Icon } from '../../../UI/Icon/';

import classnames from 'classnames';
import localStyles from './styles.scss';
import globalStyles from '../../../../shared/styles/global.scss';

export const LotDetailSectionTitle = ({ click, isOpenned, classNames, children, ...rest }) => {
  return (
    <div className={classnames(globalStyles.row, localStyles['section-title-container'], classNames)} onClick={click} {...rest}>
      <div className={classnames(globalStyles['col-sm-4'], globalStyles['col-xs-8'])}>
        { children }
      </div>
      <div className={classnames(globalStyles['col-sm-8'], globalStyles['col-xs-4'])}>
        <div className={classnames(globalStyles['pull-right-xs'], localStyles['list-decoration'])}>
          <Icon icon={isOpenned ? 'angle-up' : 'angle-down'} />
        </div>
      </div>
    </div>
  );
};

LotDetailSectionTitle.propTypes = {
  click: PropTypes.func.isRequired,
  isOpenned: PropTypes.bool,
  classNames: PropTypes.string,
  children: PropTypes.any
};
