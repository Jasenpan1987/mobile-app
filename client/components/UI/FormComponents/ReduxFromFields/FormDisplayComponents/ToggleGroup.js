import React from 'react';
import PropTypes from 'prop-types';

import localStyles from './styles.scss';
import classnames from 'classnames';

export const ToggleGroup = ({ editable, input, label, className, style }) => {
  const checkCls = classnames(className, localStyles['input-toggle'], input.value && localStyles.checked, editable && localStyles.editable);
  return (
    <div
      className={checkCls}
      style={style}
      onClick={editable && (() => { input.onChange(!input.value); })}
    >
      <label>{label}</label>
    </div>
  );
};

ToggleGroup.propTypes = {
  input: PropTypes.object.isRequired,
  editable: PropTypes.bool,
  label: PropTypes.string,
  className: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  style: PropTypes.object
};
