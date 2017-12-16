import React, { Component } from 'react';
import { Field } from 'redux-form';
import PropTypes from 'prop-types';
import { InputGroup } from './FormDisplayComponents';

export class CurrencyField extends Component {
  state = {};
  render() {
    const { name, label, editable, placeholder, displayFormat, ...rest } = this.props;

    return (
      <div>
        <Field
          name={name}
          label={label}
          type={'number'}
          editable={editable}
          component={InputGroup}
          displayFormat={displayFormat}
          placeholder={placeholder}
          addon={'$'}
          {...rest}
        />
      </div>
    );
  }
}

CurrencyField.propTypes = {
  name: PropTypes.string.isRequired,
  editable: PropTypes.bool,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  displayFormat: PropTypes.func
};
