import React from 'react';
import PropTypes from 'prop-types';
import globalStyles from '../../../../../shared/styles/global.scss';

export const SelectGroup = ({ editable, input, label, options, hint, className, style }) => {
  // convert numbet to string and compare
  const matchedOption = options.find(option => `${option.value}` === `${input.value}`);
  return (
    <div className={className} style={style}>
      {label && <div><label>{label}</label></div>}
      <div>{editable ?
        <select className={globalStyles['form-control']} {...input}>
          {hint && <option value={''}>{hint}</option>}
          {options.map(option => {
            return (<option key={option.key || option.value} value={option.value}>{option.name}</option>);
          })}
        </select> :
        <span>{matchedOption && (matchedOption.name || matchedOption.value)}</span>}
      </div>
    </div>
  );
};

SelectGroup.propTypes = {
  input: PropTypes.object.isRequired,
  editable: PropTypes.bool,
  options: PropTypes.any.isRequired,
  label: PropTypes.string,
  hint: PropTypes.string,
  className: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  style: PropTypes.object
};
