import React from 'react';
import Toggle from 'react-toggle';
import PropTypes from 'prop-types';
import './style.css';

const ToggleSwitchComponent = ({ defaultChecked, onChange, tag, off, on, ...rest }) => (
  <div className="toggle-switch-wrapper" {...rest}>
    <div className="toggle-switchWrapper-tag" style={{ color: '#8E8E91', fontWeight: 'bold' }}>{tag}</div>
    <div>
      <div className="toggle-switch-text" style={{ marginRight: '4px' }}>{off}</div>
      <Toggle
        defaultChecked={defaultChecked}
        onChange={onChange}
      />
      <div className="toggle-switch-text" style={{ marginLeft: '4px' }}>{on}</div>
    </div>
  </div>
);

ToggleSwitchComponent.propTypes = {
  defaultChecked: PropTypes.bool,
  onChange: PropTypes.func,
  tag: PropTypes.object,
  off: PropTypes.object,
  on: PropTypes.object,
  style: PropTypes.object
};

export const ToggleSwitch = ToggleSwitchComponent;
