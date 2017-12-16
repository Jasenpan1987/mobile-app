import React, { Component } from 'react';
import { Field } from 'redux-form';
import PropTypes from 'prop-types';
import { InputGroup } from './FormDisplayComponents';

export class NumberField extends Component {
  state = {};
  render() {
    const { name, label, editable, displayFormat, placeholder, ...rest } = this.props;

    return (
      <Field
        name={name}
        label={label}
        type={'number'}
        editable={editable}
        component={InputGroup}
        displayFormat={displayFormat}
        placeholder={placeholder}
        {...rest}
      />
    );
  }
}

NumberField.propTypes = {
  name: PropTypes.string.isRequired,
  editable: PropTypes.bool,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  displayFormat: PropTypes.func
};
