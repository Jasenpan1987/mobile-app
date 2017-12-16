import React from 'react';
import PropTypes from 'prop-types';

import { Icon } from '../../../Icon';

import localStyles from './styles.scss';
import classnames from 'classnames';

export const CheckGroup = ({ editable, input, label, className, style }) => {
  const checkCls = classnames(className, localStyles['input-checkbox']);
  const icon = input.value ? 'check-square' : 'square-o';
  return (
    <div
      className={checkCls}
      style={style}
      onClick={editable && (() => { input.onChange(!input.value); })}
      style={{ color: '#0696B7' }}
    >
      <div><label>{label}</label></div>
      <div><Icon icon={icon} /></div>
    </div>
  );
};

CheckGroup.propTypes = {
  input: PropTypes.object.isRequired,
  editable: PropTypes.bool,
  label: PropTypes.string,
  className: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  style: PropTypes.object
};
