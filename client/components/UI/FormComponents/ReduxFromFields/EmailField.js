import React, { Component } from 'react';
import { Field } from 'redux-form';
import PropTypes from 'prop-types';
import { InputGroup } from './FormDisplayComponents';

const emailValidator = (value) => (!value || /^[^\s]+@.+\..+/.test(value) ? undefined : 'Invalid email address');

export class EmailField extends Component {
  state = {};
  render() {
    const { name, label, editable, displayFormat, validate, ...rest } = this.props;

    return (
      <Field
        name={name}
        label={label}
        type={'email'}
        editable={editable}
        component={InputGroup}
        displayFormat={displayFormat}
        validate={validate || emailValidator}
        {... rest}
      />
    );
  }
}

EmailField.propTypes = {
  name: PropTypes.string.isRequired,
  editable: PropTypes.bool,
  label: PropTypes.string,
  displayFormat: PropTypes.func,
  validate: PropTypes.func
};
