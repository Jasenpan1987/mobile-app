import React from 'react';

import { innerSectoinSmallCls, innerSectoinMediumCls, innerSectoinLargeCls } from '../formStyles';
import states from '../../../../shared/constants/states';
import { TextField, SelectField } from '../../../UI/FormComponents/ReduxFromFields';
import PropTypes from 'prop-types';

export const FormAddressFields = ({ className, field, editable }) => {
  return (
    <div className={className}>
      {editable ?
      [
        <TextField
          key={'addressLine1'}
          name={`${field}.addressLine1`}
          label="Address Line 1"
          editable={editable}
          className={innerSectoinLargeCls}
        />,
        <TextField
          key={'addressLine2'}
          name={`${field}.addressLine2`}
          label="Address Line 2"
          editable={editable}
          className={innerSectoinLargeCls}
        />,
        <TextField
          key={'suburb'}
          name={`${field}.suburb`}
          label="Suburb"
          editable={editable}
          className={innerSectoinMediumCls}
        />,
        <SelectField
          key={'state'}
          name={`${field}.state`}
          label={'State'}
          editable={editable}
          className={innerSectoinSmallCls}
          options={Object.keys(states).map(state => { return { key: state, value: state, name: state }; })}
        />,
        <TextField
          key={'postcode'}
          name={`${field}.postcode`}
          label="Postcode"
          editable={editable}
          className={innerSectoinMediumCls}
        />
      ] :
        <TextField
          name={`${field}.fullAddress`}
          label="Full Address"
          editable={editable}
          className={innerSectoinLargeCls}
        />
      }
    </div>
  );
};

FormAddressFields.propTypes = {
  className: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  field: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  editable: PropTypes.bool
};
