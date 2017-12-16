import React, { Component } from 'react';
import { Field } from 'redux-form';
import PropTypes from 'prop-types';
import { DateGroup } from './FormDisplayComponents';

export class DateField extends Component {
  state = {};
  render() {
    const { name, label, editable, dateFormat, displayFormat, ...rest } = this.props;

    return (
      <Field
        name={name}
        label={label}
        editable={editable}
        component={DateGroup}
        dateFormat={dateFormat}
        displayFormat={displayFormat}
        placeholder={'DD/MM/YYYY'}
        {... rest}
      />
    );
  }
}

DateField.propTypes = {
  name: PropTypes.string.isRequired,
  editable: PropTypes.bool,
  label: PropTypes.string,
  displayFormat: PropTypes.func,
  dateFormat: PropTypes.string
};
