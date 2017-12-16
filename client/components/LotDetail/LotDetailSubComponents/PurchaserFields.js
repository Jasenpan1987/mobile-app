import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { formValueSelector, FieldArray, change } from 'redux-form';
import classnames from 'classnames';
import executionParties from '../../../shared/constants/executionParties';
import { INDIVIDUAL, ORGANISATION } from '../../../shared/constants/partyTypes';
import positionTypes from '../../../shared/constants/positionTypes';
import exParties from '../../../shared/constants/executionParties';
import { isEditMode, isLotExchangedOrSettled } from '../../../utils';

import { Icon } from '../../UI/Icon';
import { TextField, EmailField, SelectField } from '../../UI/FormComponents/ReduxFromFields';
import { FormAddressFields, LotDetailSectionTitle, CorrespondenceCcEmailField, NoRecordFound } from './CommonFieldsComponents';
import { ExecutionPartiesFields } from './ExecutionPartiesFields';

import { innerSectoinMediumCls, innerSectoinLargeCls } from './formStyles';
import localStyles from './LotDetailSection.scss';
import globalStyles from '../../../shared/styles/global.scss';

function generateEmptyExecutionPartiesFromExecutionType(purchaserId, exeType) {
  const commonExePartyProperties = {
    name: '',
    email: '',
    id: -1,
    vendorId: null,
    purchaserId
  };
  switch (+exeType) {
    case exParties.SOLEDIRECTORANDSECRETARY:
      return [
        Object.assign({},
          commonExePartyProperties,
          { positionType: positionTypes.getDescription(positionTypes.SOLEDIRECTORANDSECRETARY), type: positionTypes.SOLEDIRECTORANDSECRETARY })
      ];
    case exParties.DIRECTORANDDIRECTOR:
      return [
        Object.assign({},
          commonExePartyProperties,
          { positionType: positionTypes.getDescription(positionTypes.DIRECTOR), type: positionTypes.DIRECTOR }),
        Object.assign({},
          commonExePartyProperties,
          { positionType: positionTypes.getDescription(positionTypes.DIRECTOR), type: positionTypes.DIRECTOR })
      ];
    case exParties.DIRECTORANDSECRETARY:
      return [
        Object.assign({},
          commonExePartyProperties,
          { positionType: positionTypes.getDescription(positionTypes.DIRECTOR), type: positionTypes.DIRECTOR }),
        Object.assign({},
          commonExePartyProperties,
          { positionType: positionTypes.getDescription(positionTypes.SECRETARY), type: positionTypes.SECRETARY })
      ];
    case exParties.POWEROFATTORNEY:
      return [
        Object.assign({},
          commonExePartyProperties,
          { positionType: positionTypes.getDescription(positionTypes.POWEROFATTORNEY), type: positionTypes.POWEROFATTORNEY })
      ];
    case exParties.INDIVIDUAL:
      return [
        Object.assign({},
          commonExePartyProperties,
          { positionType: positionTypes.getDescription(positionTypes.INDIVIDUAL), type: positionTypes.INDIVIDUAL })
      ];
    default:
      throw new 'exParties not match';
  }
}

class PurchaserFieldsComponent extends Component {
  executionTypeIndividual = [
    { value: executionParties.INDIVIDUAL, name: executionParties.getDescription(executionParties.INDIVIDUAL) },
    { value: executionParties.POWEROFATTORNEY, name: executionParties.getDescription(executionParties.POWEROFATTORNEY) }
  ];
  executionTypeOrganisation = Object.keys(executionParties).filter(exePartyName => {
    return executionParties[exePartyName] !== executionParties.INDIVIDUAL && executionParties[exePartyName] !== executionParties.NONE;
  }).map(exeParty => {
    return { key: exeParty, value: executionParties[exeParty], name: executionParties.getDescription(executionParties[exeParty]) };
  });

  toggleIndividualAndOrganization = (newValue, previousValue, field, currentPurchaser) => {
    if (`${previousValue}` === INDIVIDUAL && `${newValue}` === ORGANISATION) { // from individual to organization
      this.props.changeFormData('lotDetailForm', `${field}.executionParties`,
        generateEmptyExecutionPartiesFromExecutionType(currentPurchaser.id, exParties.SOLEDIRECTORANDSECRETARY));
    } else if (`${newValue}` === INDIVIDUAL && `${previousValue}` === ORGANISATION) { // from organization to individual
      this.props.changeFormData('lotDetailForm', `${field}.executionParties`,
        generateEmptyExecutionPartiesFromExecutionType(currentPurchaser.id, exParties.INDIVIDUAL));
    }
  }

  addPurchaserOnClick = (e) => {
    const { fields, toggleCollapse, collapse } = this.props;
    e.stopPropagation();
    fields.push({ type: INDIVIDUAL, executionType: executionParties.INDIVIDUAL });
    if (!collapse.isOpenned) toggleCollapse();
  }

  renderPurchaserNameFields = (field, editable, isExchangedOrSettled, type) => {
    return (
      <div className={globalStyles.row}>
      {type === INDIVIDUAL ?
        [
          <TextField
            key={"purchase_firstName"}
            name={`${field}.firstName`}
            label="Firstname"
            className={innerSectoinMediumCls}
            editable={editable && !isExchangedOrSettled}
          />,
          <TextField
            key={"purchase_lastName"}
            name={`${field}.lastName`}
            label="Lastname"
            className={innerSectoinMediumCls}
            editable={editable && !isExchangedOrSettled}
          />
        ] : [
          <TextField
            key={"purchase_organisationName"}
            name={`${field}.organisationName`}
            label="Company Name"
            className={innerSectoinMediumCls}
            editable={editable && !isExchangedOrSettled}
          />,
          <TextField
            key={"purchase_companyNumber"}
            name={`${field}.companyNumber`}
            label="ACN"
            className={innerSectoinMediumCls}
            editable={editable}
          />
        ]
      }
      <EmailField
        name={`${field}.email`}
        label="Email"
        className={innerSectoinMediumCls}
        editable={editable}
      />
      <TextField
        name={`${field}.phone`}
        label="Phone"
        className={innerSectoinMediumCls}
        editable={editable}
      />
    </div>
    );
  }

  renderPurchaser = (fields, idx, field, purchaser, collapse, isExchangedOrSettled) => {
    const editable = isEditMode(this.props.mode);
    return (
      <div className={classnames(localStyles['sub-container'], localStyles.content)}>
        <div className={globalStyles.row}>
          <SelectField name={`${field}.type`}
            label={"Type"}
            editable={editable && !isExchangedOrSettled}
            className={innerSectoinMediumCls}
            options={[
              { key: INDIVIDUAL, value: INDIVIDUAL, name: 'Individual' },
              { key: ORGANISATION, value: ORGANISATION, name: 'Organisation' }
            ]}
            onChange={(event, newValue, previousValue) =>
              this.toggleIndividualAndOrganization(newValue, previousValue, field, purchaser) }
          />
          <SelectField name={`${field}.executionType`}
            label={"Excution Type"} editable={editable && !isExchangedOrSettled} className={innerSectoinMediumCls}
            options={ `${purchaser.type}` === INDIVIDUAL ? this.executionTypeIndividual : this.executionTypeOrganisation}
            onChange = {(event, newValue) => {
              this.props.changeFormData('lotDetailForm', `${field}.executionParties`,
                generateEmptyExecutionPartiesFromExecutionType(purchaser.id, newValue));
            }}
          />
          {editable && !isExchangedOrSettled && collapse.isOpenned && (
            <div className={classnames(innerSectoinMediumCls, localStyles['delete-icon'])}>
              <Icon icon={'trash'} onClick={() => fields.remove(idx)} />
            </div>
          )}
        </div>

        {/* Name Fields */}

        { this.renderPurchaserNameFields(field, editable, isExchangedOrSettled, fields.get(idx).type.toString())}

        {/* Address Fields */}
        <FormAddressFields
          className={globalStyles.row}
          field={field}
          editable={editable}
        />

        <div className={globalStyles.row}>
          <CorrespondenceCcEmailField
            name={`${field}.correspondenceCcEmailsRequest`}
            className={innerSectoinLargeCls}
            editable={editable}
          />
        </div>

        <div className={globalStyles.row}>
          <FieldArray
            name={`${field}.executionParties`} component={ExecutionPartiesFields}
            currentPurchaserExecutionType={purchaser.executionType}
            mode={this.props.mode}
          />
        </div>
      </div>
    );
  }

  render() {
    const { purchasersValues, fields, toggleCollapse, collapse, mode, lotStatusIdValue } = this.props;
    const isExchangedOrSettled = isLotExchangedOrSettled(lotStatusIdValue);
    return (
      <div>
        <LotDetailSectionTitle click={toggleCollapse} isOpenned={collapse.isOpenned} style={{ color: '#0B7D96' }}>
          <h5>{collapse.title}</h5>
          {isEditMode(mode) && !isExchangedOrSettled &&
            <Icon icon={'user-plus'} className={localStyles['add-icon']} onClick={this.addPurchaserOnClick.bind(this)} />
          }
        </LotDetailSectionTitle>

        <div className={classnames(localStyles.content, collapse.isOpenned ? localStyles.open : localStyles.close)}>
          <div className={localStyles.section}>
            {!fields.length && <NoRecordFound />}
            <ul>
              {fields.map((field, idx) => {
                const currentPurchaser = purchasersValues[idx];
                return (
                  <li key={`field-${idx}`}>
                    {this.renderPurchaser(fields, idx, field, currentPurchaser, collapse, isExchangedOrSettled)}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

PurchaserFieldsComponent.propTypes = {
  fields: PropTypes.object,
  toggleCollapse: PropTypes.func,
  changeFormData: PropTypes.func,
  collapse: PropTypes.object,
  mode: PropTypes.string,
  purchasersValues: PropTypes.array,
  lotStatusIdValue: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ])
};

function mapStateToProps(state) {
  const selector = formValueSelector('lotDetailForm');
  const purchasersValues = selector(state, 'purchasers');
  const lotStatusIdValue = selector(state, 'primaryDetail.lotStatusId');
  return {
    purchasersValues, lotStatusIdValue
  };
}

function mapDispatchToProps(dispatch) {
  return {
    changeFormData: (formName, fieldName, value) => dispatch(change(formName, fieldName, value))
  };
}
export const PurchaserFields = connect(mapStateToProps, mapDispatchToProps)(PurchaserFieldsComponent);
