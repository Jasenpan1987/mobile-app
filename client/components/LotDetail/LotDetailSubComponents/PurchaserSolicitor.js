import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { formValueSelector } from 'redux-form';

import { isEditMode, isLotExchangedOrSettled } from '../../../utils';
import states from '../../../shared/constants/states';

import classnames from 'classnames';

import localStyles from './LotDetailSection.scss';

import { FieldArray } from 'redux-form';
import { TextField, SelectField, EmailField } from '../../UI/FormComponents/ReduxFromFields';
import { innerSectoinSmallCls, innerSectoinMediumCls, innerSectoinLargeCls, sectionCls } from './formStyles';
import { LotDetailSectionTitle, CorrespondenceCcEmailField, ExistCustomFields } from './CommonFieldsComponents';

const stateOptions = Object.keys(states).map(state => { return { key: state, value: state, name: state }; });

const PurchaserSolicitorComponent = ({ toggleCollapse, collapse, mode, currentLotDetail: { purchaserSolicitor }, lotStatusIdValue }) => {
  // check if the field is in edit mode
  const editable = isEditMode(mode);
  // check lotStatus is exchanged or settled
  const isExchangedOrSettled = isLotExchangedOrSettled(lotStatusIdValue);
  const contentCls = classnames(localStyles.content, collapse.isOpenned ? localStyles.open : localStyles.close);
  return (
    <div className={localStyles.container}>
      <LotDetailSectionTitle
        click={toggleCollapse}
        isOpenned={collapse.isOpenned}
        style={{ color: '#0B7D96' }}
      >
        <h5>{collapse.title}</h5>
      </LotDetailSectionTitle>

      <div className={contentCls}>
        <div className={sectionCls}>
          <TextField
            name={'purchaserSolicitor.purchaserSolicitorName'}
            label={'Name'}
            editable={editable && !isExchangedOrSettled}
            className={innerSectoinMediumCls}
          />
          <TextField
            name={'purchaserSolicitor.purchaserSolicitorContact'}
            label={'Contact'}
            editable={editable}
            className={innerSectoinMediumCls}
          />
          <TextField
            name={'purchaserSolicitor.purchaserSolicitorPhone'}
            label={'Phone'}
            editable={editable}
            className={innerSectoinMediumCls}
          />
          <EmailField
            name={'purchaserSolicitor.purchaserSolicitorEmail'}
            label={'Email'}
            editable={editable}
            className={innerSectoinMediumCls}
          />
        </div>
        <div className={sectionCls}>
          {editable ? [
            <TextField
              name={'purchaserSolicitor.purchaserSolicitorAddressLine1'}
              key={'addressLine1'}
              label={'Address Line 1'}
              editable={editable}
              className={innerSectoinLargeCls}
            />,
            <TextField
              name={'purchaserSolicitor.purchaserSolicitorAddressLine2'}
              key={'addressLine2'}
              label={'Address Line 2'}
              editable={editable}
              className={innerSectoinLargeCls}
            />,
            <TextField
              name={'purchaserSolicitor.purchaserSolicitorSuburb'}
              key={'suburb'}
              label={'Suburb'}
              editable={editable}
              className={innerSectoinMediumCls}
            />,
            <SelectField
              name={'purchaserSolicitor.purchaserSolicitorState'}
              key={'state'}
              label={'State'}
              editable={editable}
              className={innerSectoinSmallCls}
              options={stateOptions}
            />,
            <TextField
              name={'purchaserSolicitor.purchaserSolicitorPostcode'}
              label={'Postcode'}
              editable={editable}
              className={innerSectoinSmallCls}
              key={'postcode'}
            />] :
            <div className={classnames(innerSectoinLargeCls, localStyles.innerSection)}>
              <div><label>Full Address</label></div>
              <div><span>{purchaserSolicitor.purchaserSolicitorFullAddress}</span></div>
            </div>
          }
        </div>
        <div className={sectionCls}>
          <TextField
            name={'purchaserSolicitor.purchaserSolicitorFax'}
            label={'Fax'}
            editable={editable}
            className={innerSectoinMediumCls}
          />
          <TextField
            name={'purchaserSolicitor.purchaserSolicitorReference'}
            label={'Reference'}
            editable={editable}
            className={innerSectoinMediumCls}
          />
          <TextField
            name={'purchaserSolicitor.purchaserSolicitorType'}
            label={'Type'}
            editable={editable}
            className={innerSectoinMediumCls}
          />
        </div>
        <div className={sectionCls}>
          <CorrespondenceCcEmailField
            name={'purchaserSolicitor.purchaserSolicitorCorrespondenceCcEmailsRequest'}
            className={innerSectoinLargeCls}
            editable={editable}
          />
        </div>
        <div className={sectionCls}>
          <FieldArray
            name="customFields.['purchaser solicitor']"
            component={ExistCustomFields}
            mode={mode}
          />
        </div>
      </div>
    </div>
  );
};

function mapStateToProps(state) {
  const selector = formValueSelector('lotDetailForm');
  return {
    lotStatusIdValue: selector(state, 'primaryDetail.lotStatusId')
  };
}

PurchaserSolicitorComponent.propTypes = {
  toggleCollapse: PropTypes.func.isRequired,
  collapse: PropTypes.object.isRequired,
  purchaserSolicitor: PropTypes.object,
  mode: PropTypes.string.isRequired,
  currentLotDetail: PropTypes.object.isRequired,
  lotStatusIdValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};

export const PurchaserSolicitor = connect(mapStateToProps)(PurchaserSolicitorComponent);
