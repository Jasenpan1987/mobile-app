import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import style from './Panel.scss';

const Panel = ({ className, children, border }) => {
  return (
    <div className={classnames(className, (border ? style[`border-${border}`] : ''))}>
      {children}
    </div>
  );
};

Panel.propTypes = {
  children: PropTypes.any.isRequired,
  border: PropTypes.string,
  className: PropTypes.string
};

export { Panel };
