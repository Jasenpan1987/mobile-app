import React from 'react';
import PropTypes from 'prop-types';

import localStyles from './HorizontalAlignment.scss';
import classnames from 'classnames';

export const HorizontalAlignment = ({ children, alignment, className, ...rest }) => {
  const containerClassnames = className;
  const horizontalClassnames = classnames(localStyles[alignment]);

  return (
    <div className={containerClassnames} {...rest}>
      <div className={horizontalClassnames}>
        <div className={localStyles.inner}>
          {children}
        </div>
      </div>
    </div>
  );
};

HorizontalAlignment.propTypes = {
  children: PropTypes.any,
  alignment: PropTypes.oneOf(['left', 'middle', 'right']).isRequired,
  className: PropTypes.string
};
