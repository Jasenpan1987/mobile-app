import React from 'react';
import PropTypes from 'prop-types';

import localStyles from './VerticalAlignment.scss';
import classnames from 'classnames';

export const VerticalAlignment = ({ children, alignment, className, ...rest }) => {
  const containerClassnames = classnames(localStyles.container, className);
  const verticalClassnames = classnames(localStyles[alignment]);

  return (
    <div className={containerClassnames} {...rest}>
      <div className={verticalClassnames}>
        <div className={localStyles.inner}>
          {children}
        </div>
      </div>
    </div>
  );
};

VerticalAlignment.propTypes = {
  children: PropTypes.any,
  alignment: PropTypes.oneOf(['top', 'middle', 'bottom']).isRequired,
  className: PropTypes.string
};
