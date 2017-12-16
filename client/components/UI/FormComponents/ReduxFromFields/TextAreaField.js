import React, { Component } from 'react';
import { Field } from 'redux-form';
import PropTypes from 'prop-types';
import { TextAreaGroup } from './FormDisplayComponents';

export class TextAreaField extends Component {
  state = {};
  render() {
    const { name, label, editable, displayFormat, placeholder, ...rest } = this.props;

    return (
      <Field
        name={name}
        label={label}
        editable={editable}
        component={TextAreaGroup}
        placeholder={placeholder}
        displayFormat={displayFormat}
        {...rest}
      />
    );
  }
}

TextAreaField.propTypes = {
  name: PropTypes.string.isRequired,
  editable: PropTypes.bool,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  displayFormat: PropTypes.func
};
