import React, { Component } from 'react';
import { Field } from 'redux-form';
import PropTypes from 'prop-types';
import { ToggleGroup } from './FormDisplayComponents';

export class ToggleField extends Component {
  state = {};
  render() {
    const { name, label, editable, displayFormat, ...rest } = this.props;

    return (
      <Field
        name={name}
        label={label}
        editable={editable}
        component={ToggleGroup}
        displayFormat={displayFormat}
        {... rest}
      />
    );
  }
}

ToggleField.propTypes = {
  name: PropTypes.string.isRequired,
  editable: PropTypes.bool,
  label: PropTypes.string,
  displayFormat: PropTypes.func
};
