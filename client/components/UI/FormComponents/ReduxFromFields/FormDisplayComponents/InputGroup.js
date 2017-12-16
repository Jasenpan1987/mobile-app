import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import globalStyles from '../../../../../shared/styles/global.scss';
import localStyles from './styles.scss';

export const InputGroup = ({ editable, input, label, type, addon, displayFormat, className, style, placeholder,
  meta: { touched, error } }) => {
  return (
    <div className={className} style={style}>
      {label && <div><label>{label}</label></div>}
      <div>{editable ?
        [<div key="value">
            {addon && <span className={classnames(globalStyles['input-addon'])}>{addon}</span>}
            <input
              className={classnames(globalStyles['form-control'], { [globalStyles['with-addon']]: addon })}
              type={type}
              placeholder={placeholder}
              {...input}
            />
          </div>,
          (touched && error) && <span data-type={'error'} key={'error'} className={localStyles['input-error']}>{error}</span>
        ] :
        <span>{addon && <span>{addon}</span>}{ displayFormat ? displayFormat(input.value) : input.value }</span>}
      </div>
    </div>
  );
};

InputGroup.propTypes = {
  input: PropTypes.object.isRequired,
  editable: PropTypes.bool,
  label: PropTypes.string,
  displayFormat: PropTypes.func,
  type: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  className: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  style: PropTypes.object,
  meta: PropTypes.object,
  addon: PropTypes.string
};
