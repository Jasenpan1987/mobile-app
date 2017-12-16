import React, { Component } from 'react';
import { Field } from 'redux-form';
import PropTypes from 'prop-types';
import { CheckGroup } from './FormDisplayComponents';

export class CheckField extends Component {
  state = {};
  render() {
    const { name, label, editable, displayFormat, ...rest } = this.props;

    return (
      <Field
        name={name}
        label={label}
        editable={editable}
        component={CheckGroup}
        displayFormat={displayFormat}
        {... rest}
      />
    );
  }
}

CheckField.propTypes = {
  name: PropTypes.string.isRequired,
  editable: PropTypes.bool,
  label: PropTypes.string,
  displayFormat: PropTypes.func
};
