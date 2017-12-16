import React from 'react';
import PropTypes from 'prop-types';
import { TEXT, CHECKBOX, PARAGRAPH, DATE, DROPDOWN, CURRENCY } from '../../../../shared/constants/customFieldTypes';

import { TextField, DateField, TextAreaField, CheckField, SelectField, CurrencyField } from '../../../UI/FormComponents/ReduxFromFields';

import { isEditMode, createCustomFieldOptions, numberWithCommas, compose } from '../../../../utils';

import { innerSectoinMediumCls, innerSectoinLargeCls, innerSectoinFullRowCls } from '../formStyles';

const formatTextDisplayDefaultNaFn = value => { return value || 'N/A'; };
const formatNumberDisplay = value => formatTextDisplayDefaultNaFn(numberWithCommas(value));
const convertToFloat = value => parseFloat(value).toFixed(2);

const formatCurrencyDisplayFn = value => compose(formatTextDisplayDefaultNaFn, formatNumberDisplay, convertToFloat)(value);

const getSizeClassFromFieldTypeAndLabel = (fieldLabel) => {
  const labelLength = fieldLabel.length;
  if (labelLength > 40) return innerSectoinFullRowCls;
  if (labelLength > 20) return innerSectoinLargeCls;
  return innerSectoinMediumCls;
};

const ExistCustomFieldsComponent = ({ fields, mode }) => {
  return (
    <div>
      {fields.map((fieldName, idx) => {
        const fieldValue = fields.get(idx);
        const editable = isEditMode(mode);
        switch (fields.get(idx).type) {
          case TEXT:
            return (
              <TextField
                key={fieldName}
                name={`${fieldName}.value`}
                className={getSizeClassFromFieldTypeAndLabel(fieldValue.label)}
                label={fieldValue.label}
                editable={editable}
                displayFormat={formatTextDisplayDefaultNaFn}
                placeholder={' '}
              />
            );

          case DATE:
            return (
              <DateField
                key={fieldName}
                name={`${fieldName}.value`}
                className={getSizeClassFromFieldTypeAndLabel(fieldValue.label)}
                label={fieldValue.label}
                editable={editable}
                dateFormat={'DD/MM/YYYY'}
                displayFormat={formatTextDisplayDefaultNaFn}
              />
            );

          case PARAGRAPH:
            return (
              <TextAreaField
                key={fieldName}
                name={`${fieldName}.value`}
                className={innerSectoinFullRowCls}
                label={fieldValue.label}
                editable={editable}
                style={{ whiteSpace: 'nowrap' }}
                displayFormat={formatTextDisplayDefaultNaFn}
              />
            );
          case CHECKBOX:
            return (
              <CheckField
                key={fieldName}
                className={innerSectoinFullRowCls}
                name={`${fieldName}.value`}
                label={fieldValue.label}
                editable={editable}
              />
            );
          case DROPDOWN:
            return (
              <SelectField
                key={fieldName}
                name={`${fieldName}.value`}
                className={innerSectoinMediumCls}
                label={fieldValue.label}
                editable={editable}
                options={createCustomFieldOptions(fieldValue.options, true)}
              />
            );
          case CURRENCY:
            return (
              <CurrencyField
                key={fieldName}
                name={`${fieldName}.value`}
                className={getSizeClassFromFieldTypeAndLabel(fieldValue.label)}
                label={fieldValue.label}
                editable={editable}
                displayFormat={formatCurrencyDisplayFn}
                placeholder={' '}
              />
            );
          default:
            return null;
        }
      })}
    </div>
  );
};

ExistCustomFieldsComponent.propTypes = {
  fields: PropTypes.object.isRequired,
  mode: PropTypes.string.isRequired
};

export const ExistCustomFields = ExistCustomFieldsComponent;
