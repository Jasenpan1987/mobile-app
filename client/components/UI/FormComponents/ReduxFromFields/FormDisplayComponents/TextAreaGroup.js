import React from 'react';
import PropTypes from 'prop-types';
import globalStyles from '../../../../../shared/styles/global.scss';
import localStyles from './styles.scss';
import classnames from 'classnames';

export const TextAreaGroup = ({ editable, input, placeholder, label, displayFormat, className, style }) => {
  return (
    <div className={className} style={style}>
      {label && <div><label>{label}</label></div>}
      <div>{editable ?
        <textarea
          className={classnames(globalStyles['form-control'], localStyles['textarea-default'])}
          placeholder={placeholder}
          {...input}
        /> :
        <span>{ displayFormat ? displayFormat(input.value) : input.value }</span>}
      </div>
    </div>
  );
};

TextAreaGroup.propTypes = {
  input: PropTypes.object.isRequired,
  editable: PropTypes.bool,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  displayFormat: PropTypes.func,
  className: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  style: PropTypes.object
};
