import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import global from '../../../../shared/styles/global.scss';
const styles = require('./styles.scss');

class TextFieldGroupComponent extends Component {
  state = {
    isActive: false
  }

  render() {
    const { floatingLabelText, iconName, inputType, onChange } = this.props;
    return (
      <div style={{ width: '100%' }}>
        <div style={{ width: '100%', padding: '0 0.25rem', marginBottom: '5px' }}>
          {iconName && <i className={classnames(styles.inputAvatar, `fa fa-${iconName}`)}></i>}
          <label
            className={classnames(styles.inputLabel)}
            htmlFor={floatingLabelText}
            className={classnames(styles.inputLabel, (this.state.isActive || (this.textInput && this.textInput.value)) && 'active')}
          >
            {floatingLabelText}
          </label>
        </div>

        <div style={{ width: '100%' }}>
          <div>
            <input
              className={classnames(global['form-control'], global['form-control-highlight'], styles.inputField, styles.sm, 'theme-form-control')}
              type={inputType || 'text'}
              id={floatingLabelText}
              onFocus={() => this.setState({ isActive: true })}
              onBlur={() => this.setState({ isActive: false })}
              onChange={(e) => onChange(e.target.value)}
              ref={(input) => { this.textInput = input; }}
            />
            {/* <i className={classnames('fa fa-check-circle')}
              style={{ color: '#6CBC3F', fontSize: '1.3rem', float: 'right', marginRight: '0.5rem', marginTop: '-1.8rem', position: 'relative' }}
            /> */}
          </div>
        </div>
      </div>
    );
  }
}

TextFieldGroupComponent.propTypes = {
  floatingLabelText: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  iconName: PropTypes.string,
  inputType: PropTypes.string
};

export const TextFieldGroup = TextFieldGroupComponent;
