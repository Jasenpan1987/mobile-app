import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { formValueSelector } from 'redux-form';
import { isEditMode, isLotExchangedOrSettled } from '../../../utils';
import executionParties from '../../../shared/constants/executionParties';

import { TextField, EmailField } from '../../UI/FormComponents/ReduxFromFields';
import { Icon } from '../../UI/Icon';

import localStyles from './LotDetailSection.scss';
import globalStyles from '../../../shared/styles/global.scss';
import { innerSectoinMediumCls, sectionCls } from './formStyles';

const MAX_NUMBER_OF_POWER_OF_ATTERNIES = 5;

const renderSimpleSectionFields = (field, editable, isExchangedOrSettled) => {
  return (
    <li key={field}>
      <div className={sectionCls}>
        <TextField name={`${field}.name`}
          label={"Name"}
          editable={editable && !isExchangedOrSettled}
          className={innerSectoinMediumCls}
        />
        <TextField name={`${field}.positionType`}
          label={"Position"}
          className={innerSectoinMediumCls}
        />
        <EmailField name={`${field}.email`}
          label={"Email"}
          editable={editable}
          className={innerSectoinMediumCls}
        />
      </div>
    </li>
  );
};

const renderPOASectionFields = (field, editable, isExchangedOrSettled) => {
  return (
    <li key={field}>
      <div className={sectionCls}>
        <TextField name={`${field}.name`}
          label={"Name"}
          editable={editable && !isExchangedOrSettled}
          className={innerSectoinMediumCls}
        />
        <TextField name={`${field}.positionType`}
          editable={editable && !isExchangedOrSettled}
          label={"Position"}
          className={innerSectoinMediumCls}
        />
        <EmailField name={`${field}.email`}
          label={"Email"}
          editable={editable}
          className={innerSectoinMediumCls}
        />
        <TextField name={`${field}.poaNumber`}
          label={"POA"}
          editable={editable}
          className={innerSectoinMediumCls}
        />
      </div>
    </li>
  );
};

const addPoaOnClick = (e, fields) => {
  e.stopPropagation();
  fields.push({
    type: executionParties.POWEROFATTORNEY,
    positionType: 'Power of Attorney'
  });
};

const ExecutionPartiesFieldsComponent = ({ fields, mode, currentPurchaserExecutionType, lotStatusIdValue }) => {
  const editable = isEditMode(mode);
  // check lotStatus is exchanged or settled
  const isExchangedOrSettled = isLotExchangedOrSettled(lotStatusIdValue);
  const moreThanMaxNumber = fields.length < MAX_NUMBER_OF_POWER_OF_ATTERNIES;
  const isPoa = +currentPurchaserExecutionType === executionParties.POWEROFATTORNEY;
  // style classes
  const columnFillCls = globalStyles['col-xs-12'];
  const subHeadingCls = localStyles['sub-heading'];
  const addIconCls = localStyles['add-icon'];

  return (
    +currentPurchaserExecutionType !== executionParties.INDIVIDUAL &&
    <div className={sectionCls}>
      <div className={columnFillCls}>
        <h5 className={subHeadingCls} style={{ color: '#8E8E91' }}>
          {executionParties.getDescription(currentPurchaserExecutionType)}
        </h5>
        {isPoa && moreThanMaxNumber && !isExchangedOrSettled &&
          <Icon icon={'user-plus'} onClick={(e) => addPoaOnClick(e, fields)} className={addIconCls} />}
      </div>
      <div className={columnFillCls}>
        <ul>
          {fields.map((field) => {
            switch (+currentPurchaserExecutionType) {
              case executionParties.SOLEDIRECTORANDSECRETARY:
              case executionParties.DIRECTORANDDIRECTOR:
              case executionParties.DIRECTORANDSECRETARY:
                return renderSimpleSectionFields(field, editable, isExchangedOrSettled);

              case executionParties.POWEROFATTORNEY:
                return renderPOASectionFields(field, editable, isExchangedOrSettled);

              default:
                return null;
            }
          })}
        </ul>
      </div>
    </div>
  );
};

const selector = formValueSelector('lotDetailForm');

function mapStateToProps(state) {
  const lotStatusIdValue = selector(state, 'primaryDetail.lotStatusId');
  return { lotStatusIdValue };
}

ExecutionPartiesFieldsComponent.propTypes = {
  lotStatusIdValue: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ])
};

export const ExecutionPartiesFields = connect(mapStateToProps)(ExecutionPartiesFieldsComponent);
