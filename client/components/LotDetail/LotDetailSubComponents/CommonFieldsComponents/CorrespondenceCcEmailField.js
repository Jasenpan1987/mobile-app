import React from 'react';
import { TextAreaField } from '../../../UI/FormComponents/ReduxFromFields';
import PropTypes from 'prop-types';
export const CorrespondenceCcEmailField = ({ className, name, editable }) => {
  return (
    <TextAreaField
      name={name}
      label={'Correspondence Cc Emails'}
      editable={editable}
      className={className}
      style={{ whiteSpace: 'nowrap' }}
      displayFormat={(value) => { return value ? `${value}`.split(';').map((email, idx) => <p key={`email-${idx}`}>{email}</p>) : ''; }}
      placeholder={'(e.g. john@domain.com;rosey@domain.com)'}
    />
  );
};

CorrespondenceCcEmailField.propTypes = {
  className: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  name: PropTypes.string,
  editable: PropTypes.bool
};
