import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { change, formValueSelector } from 'redux-form';

import { FieldArray } from 'redux-form';
import { TextField, NumberField, SelectField, DateField } from '../../UI/FormComponents/ReduxFromFields';
import { LotDetailSectionTitle, ExistCustomFields } from './CommonFieldsComponents';

import { formatCurrency, isEditMode, isLotExchangedOrSettled } from '../../../utils';

import classnames from 'classnames';
import localStyles from './LotDetailSection.scss';
import { sectionCls, innerSectoinSmallCls, innerSectoinMediumCls } from './formStyles';

// deposit percentage field options
const depositPercentageOptions = [
  { value: 0, name: 'other' },
  { value: 5, name: '5%' },
  { value: 10, name: '10%' },
  { value: 15, name: '15%' },
  { value: 20, name: '20%' }
];

// display format functions
const formatCurrencyDisplayDefaultNaFn = (value) => { return value ? formatCurrency(value, 2) : 'N/A'; };
const formatTextDisplayDefaultNaFn = (value) => { return value || 'N/A'; };
const formatCurrencyDisplayDefaultZeroFn = (value) => { return formatCurrency(value || 0, 2); };

// event functions
const fieldPricesOnChange = (purchasePrice, dispatchFormChange, depositPercentage, deposit) => {
  const depositPercent = depositPercentage / 100;
  const depositValue = depositPercent ? (depositPercent * purchasePrice).toFixed(2) : deposit;
  const balanceValue = purchasePrice - depositValue;

  dispatchFormChange('lotDetailForm', 'primaryDetail.balance', balanceValue);
  dispatchFormChange('lotDetailForm', 'primaryDetail.deposit', depositValue);
};

// render component
const PrimaryDetailComponent = ({ toggleCollapse, collapse, mode, lotListStatuses,
  dispatchFormChange, purchasePrice, depositPercentage, deposit, lotStatusIdValue }) => {
  // style class
  const contentClass = classnames(localStyles.content, collapse.isOpenned ? localStyles.open : localStyles.close);
  // check mode is editable
  const editable = isEditMode(mode);
  // check lotStatus is exchanged or settled
  const isExchangedOrSettled = isLotExchangedOrSettled(lotStatusIdValue);
  // lot status options
  const lotStatusOptions = lotListStatuses.map(status => {
    return { key: status.id, value: status.id, name: status.name };
  });
  return (
    <div className={localStyles.container}>
      <LotDetailSectionTitle
        click={toggleCollapse}
        isOpenned={collapse.isOpenned}
        style={{ color: '#0B7D96' }}
      >
        <h5>{collapse.title}</h5>
      </LotDetailSectionTitle>

      <div className={contentClass}>
        <div className={sectionCls}>
          <SelectField
            name={'primaryDetail.lotStatusId'}
            className={innerSectoinMediumCls}
            label={'Status'}
            editable={editable}
            options={lotStatusOptions}
          />
          <NumberField
            name={'primaryDetail.purchasePrice'}
            className={innerSectoinMediumCls}
            label={'Purchase Price'}
            editable={editable && !isExchangedOrSettled}
            displayFormat={formatCurrencyDisplayDefaultNaFn}
            onChange={(event) => fieldPricesOnChange(event.target.value, dispatchFormChange, depositPercentage, deposit)}
          />
          <SelectField
            name={'primaryDetail.depositPercentage'}
            className={innerSectoinSmallCls}
            label={'Deposit %'}
            editable={editable && !isExchangedOrSettled}
            options={depositPercentageOptions}
            onChange={(event) => fieldPricesOnChange(purchasePrice, dispatchFormChange, event.target.value, deposit)}
          />
          <NumberField
            name={'primaryDetail.deposit'}
            className={innerSectoinSmallCls}
            label={'Deposit'}
            editable={editable && !isExchangedOrSettled && +depositPercentage === 0}
            displayFormat={formatCurrencyDisplayDefaultNaFn}
            onChange={(event) => fieldPricesOnChange(purchasePrice, dispatchFormChange, depositPercentage, event.target.value)}
          />
          <NumberField
            name={'primaryDetail.balance'}
            className={innerSectoinSmallCls}
            label={'Balance'}
            displayFormat={formatCurrencyDisplayDefaultZeroFn}
          />
        </div>

        <div className={sectionCls}>
          <DateField
            name={'primaryDetail.contractDate'}
            className={innerSectoinMediumCls}
            label={'Contract Date'}
            editable={editable && !isExchangedOrSettled}
            dateFormat={'DD/MM/YYYY'}
            displayFormat={formatTextDisplayDefaultNaFn}
          />
          <TextField
            name={'primaryDetail.apartmentNumber'}
            className={innerSectoinMediumCls}
            label={'Apartment No.'}
            editable={editable}
            displayFormat={formatTextDisplayDefaultNaFn}
          />
          <TextField
            name={'primaryDetail.fileNumber'}
            className={innerSectoinSmallCls}
            label={'File No.'}
            editable={editable}
            displayFormat={formatTextDisplayDefaultNaFn}
          />
        </div>

        <div className={sectionCls}>
          <FieldArray
            name="customFields['primary details']"
            component={ExistCustomFields}
            mode={mode}
          />
        </div>
      </div>
    </div>
  );
};

PrimaryDetailComponent.propTypes = {
  toggleCollapse: PropTypes.func.isRequired,
  collapse: PropTypes.object.isRequired,
  lotListStatuses: PropTypes.object.isRequired,
  mode: PropTypes.string,
  primaryDetail: PropTypes.object,
  dispatchFormChange: PropTypes.func,
  purchasePrice: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  depositPercentage: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  deposit: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  lotStatusIdValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};

function mapStateToProps(state) {
  const selector = formValueSelector('lotDetailForm');
  const purchasePrice = selector(state, 'primaryDetail.purchasePrice');
  const lotStatusIdValue = selector(state, 'primaryDetail.lotStatusId');
  const depositPercentage = selector(state, 'primaryDetail.depositPercentage');
  const deposit = selector(state, 'primaryDetail.deposit');
  return { purchasePrice, depositPercentage, deposit, lotStatusIdValue };
}

function mapDispatchToProps(dispatch) {
  return {
    dispatchFormChange: (form, field, value) => dispatch(change(form, field, value))
  };
}
export const PrimaryDetail = connect(mapStateToProps, mapDispatchToProps)(PrimaryDetailComponent);
