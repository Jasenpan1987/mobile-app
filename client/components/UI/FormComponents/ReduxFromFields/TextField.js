import React, { Component } from 'react';
import { Field } from 'redux-form';
import PropTypes from 'prop-types';
import { InputGroup } from './FormDisplayComponents';

export class TextField extends Component {
  state = {};
  render() {
    const { name, label, editable, placeholder, displayFormat, ...rest } = this.props;

    return (
      <Field
        name={name}
        label={label}
        type={'text'}
        editable={editable}
        component={InputGroup}
        displayFormat={displayFormat}
        placeholder={placeholder}
        {...rest}
      />
    );
  }
}

TextField.propTypes = {
  name: PropTypes.string.isRequired,
  editable: PropTypes.bool,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  displayFormat: PropTypes.func
};
