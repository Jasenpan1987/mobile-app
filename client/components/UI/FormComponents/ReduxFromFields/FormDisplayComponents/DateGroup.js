import React from 'react';
import PropTypes from 'prop-types';

import globalStyles from '../../../../../shared/styles/global.scss';
import localStyles from './styles.scss';
import moment from 'moment';

export const DateGroup = ({ editable, input, label, className, style, placeholder,
  dateFormat, displayFormat, meta: { touched, error } }) => {
  return (
    <div className={className} style={style}>
      {label && <div><label>{label}</label></div>}
      <div>{editable ?
        [<input
          key={'input'}
          type={'date'}
          className={globalStyles['form-control']}
          placeholder={placeholder}
          onChange={(e) => {
            return input.onChange(moment(e.target.value).format(dateFormat));
          }}
          value={moment(input.value, dateFormat).format('YYYY-MM-DD')}
        />,
        (touched && error) && <span data-type={'error'} key={'error'} className={localStyles['input-error']}>{error}</span>
        ] :
        <span key={'display'}>{displayFormat ? displayFormat(input.value) : input.value}</span>}
      </div>
    </div>
  );
};

DateGroup.propTypes = {
  input: PropTypes.object.isRequired,
  editable: PropTypes.bool,
  label: PropTypes.string,
  displayFormat: PropTypes.func,
  placeholder: PropTypes.string,
  dateFormat: PropTypes.string,
  className: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  style: PropTypes.object,
  meta: PropTypes.object
};
