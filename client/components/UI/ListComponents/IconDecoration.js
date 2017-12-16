import React from 'react';
import PropTypes from 'prop-types';

import { Icon } from '../Icon';
import { GeneralAlignment, VerticalAlignment } from '../AlignmentComponents';
import classnames from 'classnames';

import localStyles from './IconDecoration.scss';

export const IconDecoration = ({ icon, children, className, iconClassName, contentClassName, ...rest }) => {
  return (
    <VerticalAlignment alignment={'middle'} className={classnames(localStyles.container, className)} {...rest}>
      <GeneralAlignment alignment={'center'} className={classnames(localStyles['icon-container'], iconClassName)}>
        <Icon icon={icon} />
      </GeneralAlignment>
      <VerticalAlignment alignment={'middle'} className={contentClassName}>
        {children}
      </VerticalAlignment>
    </VerticalAlignment>
  );
};

IconDecoration.propTypes = {
  icon: PropTypes.string.isRequired,
  iconClassName: PropTypes.string,
  contentClassName: PropTypes.string,
  className: PropTypes.string,
  children: PropTypes.any
};
