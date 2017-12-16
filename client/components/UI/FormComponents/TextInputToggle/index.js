import React from 'react';
import PropTypes from 'prop-types';
import signItPartyStatus from '../../../../shared/constants/signItPartyStatus';

const renderTextInputGroup = (config) => {
  const {
    id, ldmId, isUpdating, requestValue, onChange,
    boundChangeSignItPartyToEditModeFalse, onSave
  } = config;
  if (isUpdating) {
    return (
      <div><i className="fa fa-spinner fa-spin" aria-hidden="true"></i></div>
    );
  }
  return (
    <div>
      <input
        type="text"
        value={requestValue}
        onFocus={e => e.target.select()}
        onChange={e => onChange(id, e.target.value)}
      />
      <button
        onClick={() => { onSave(requestValue, id, ldmId); }}
      >OK</button>
      <button onClick={boundChangeSignItPartyToEditModeFalse}>Cancel</button>
    </div>
  );
};

const renderText = (config) => {
  const {
    id, status, ldmId, defaultValue, requestValue,
    boundChangeSignItPartyToEditModeTrue, onResend
  } = config;
  return (
    <div>
      {status === signItPartyStatus.SIGNED ?
        <p>{defaultValue}</p>
        :
        <p>
          {defaultValue}
          <button onClick={boundChangeSignItPartyToEditModeTrue} >Modify</button>
          <button
            onClick={() => onResend(requestValue, id, ldmId)}
          >Resent</button>
        </p>
      }
    </div>
  );
};

const TextInputToggle = ({
  id, status, ldmId, isEditMode, label, requestValue, isUpdating,
  defaultValue, onChange, changeSignItPartyToEditMode, onSave, onResend
}) => {
  const boundChangeSignItPartyToEditModeTrue = changeSignItPartyToEditMode.bind(null, id, true);
  const boundChangeSignItPartyToEditModeFalse = changeSignItPartyToEditMode.bind(null, id, false);
/**
 *     id, ldmId, defaultValue, requestValue,
    boundChangeSignItPartyToEditModeTrue, onResend
 */
  return (
    <div className="form-control">
      <label>{label}</label>
      {isEditMode ?
        renderTextInputGroup({ id, ldmId, isUpdating, requestValue, onChange, boundChangeSignItPartyToEditModeFalse, onSave }) :
        renderText({ id, status, ldmId, defaultValue, requestValue, boundChangeSignItPartyToEditModeTrue, onResend })}
    </div>
  );
};

TextInputToggle.propTypes = {
  id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  status: PropTypes.number,
  ldmId: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  isEditMode: PropTypes.bool,
  isUpdating: PropTypes.bool,
  label: PropTypes.string.isRequired,
  requestValue: PropTypes.string,
  defaultValue: PropTypes.string,
  onChange: PropTypes.func,
  changeSignItPartyToEditMode: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  onResend: PropTypes.func.isRequired
};

export { TextInputToggle };
