import React, { Component } from 'react';
import { Field } from 'redux-form';
import PropTypes from 'prop-types';
import { SelectGroup } from './FormDisplayComponents';

export class SelectField extends Component {
  state = {};
  render() {
    const { name, label, editable, options, hint, ...rest } = this.props;
    return (
      <Field
        name={name}
        label={label}
        options={options}
        editable={editable}
        component={SelectGroup}
        hint={hint}
        {... rest}
      />
    );
  }
}

SelectField.propTypes = {
  name: PropTypes.string.isRequired,
  editable: PropTypes.bool,
  options: PropTypes.any.isRequired,
  label: PropTypes.string,
  hint: PropTypes.string
};
