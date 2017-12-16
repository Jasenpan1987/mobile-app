import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Field, Fields, FieldArray, reduxForm } from 'redux-form';
import { mapFieldsPathByName } from '../../utils';

import {
  PrimaryDetail, VendorAgent, PurchaserSolicitor,
  PurchaserFields, GuarantorFields, CustomFields
} from './LotDetailSubComponents';

import localStyles from './LotDetailForm.scss';
import globalStyles from '../../shared/styles/global.scss';
import classnames from 'classnames';

class LotDetailFormComponent extends Component {
  state = {}
  componentWillMount() {
    const { currentLotDetail: { customFields }, updateCustomSections } = this.props;
    // not primary detail or solicitor custom fields, add to names
    const customSections = Object.keys(customFields).reduce((sections, key) => {
      if (key !== 'primary details' && key !== 'purchaser solicitor') {
        sections[key] = { title: key, isOpenned: false, name: `customFields['${key}']` };
      }
      return sections;
    }, {});
    updateCustomSections(customSections);
  }

  render() {
    // props
    const { handleSubmit, currentLotDetail, lotListStatuses, mode, toggleCollapse, toggleCollapseCustomSection, collapses } = this.props;

    // state;
    const { collapses: { customSections } } = this.props;
    // style classes
    const sectionCls = classnames(globalStyles.row, localStyles.section);

    return (
      <form onSubmit={handleSubmit}>
        {/* <button type="submit">Save</button> */}
        <div className={sectionCls}>
          <Fields
            collapse={collapses.primaryDetails}
            toggleCollapse={() => toggleCollapse('primaryDetails')}
            names={mapFieldsPathByName('primaryDetail', [
              'apartmentNumber', 'purchasePrice', 'depositPercentage', 'fileNumber', 'deposit',
              'balance', 'contractDate', 'lotStatus', 'lotStatusId'
            ])}
            component={PrimaryDetail}
            currentLotDetail={currentLotDetail}
            lotListStatuses={lotListStatuses}
            mode={mode}
          />
        </div>
        <div className={sectionCls}>
          <Field
            collapse={collapses.vendorAgent}
            toggleCollapse={() => toggleCollapse('vendorAgent')}
            name="primaryDetail.vendorAgentId"
            component={VendorAgent}
            vendorAgent={currentLotDetail.vendorAgent}
            vendorAgents={currentLotDetail.vendorAgents}
            vendorAgentId={currentLotDetail.primaryDetail.vendorAgentId}
            mode={mode}
          />
        </div>
        <div className={sectionCls}>
          <Fields
            collapse={collapses.purchaserSolicitor}
            toggleCollapse={() => toggleCollapse('purchaserSolicitor')}
            names={mapFieldsPathByName('purchaserSolicitor', [
              'purchaserSolicitorName', 'purchaserSolicitorContact', 'purchaserSolicitorPhone', 'purchaserSolicitorEmail',
              'purchaserSolicitorFullAddress', 'purchaserSolicitorAddressLine1', 'purchaserSolicitorAddressLine2', 'purchaserSolicitorSuburb',
              'purchaserSolicitorState', 'purchaserSolicitorPostcode',
              'purchaserSolicitorFax', 'purchaserSolicitorReference', 'purchaserSolicitorType',
              'purchaserSolicitorCorrespondenceCcEmailsRequest'
            ])}
            component={PurchaserSolicitor}
            currentLotDetail={currentLotDetail}
            mode={mode}
          />
        </div>
        <div className={sectionCls}>
          <FieldArray
            name="guarantors"
            collapse={collapses.guarantors}
            toggleCollapse={() => toggleCollapse('guarantors')}
            component={GuarantorFields}
            currentLotDetail={currentLotDetail}
            mode={mode}
          />
        </div>
        <div className={sectionCls}>
          <FieldArray
            name="purchasers"
            collapse={collapses.purchasers}
            toggleCollapse={() => toggleCollapse('purchasers')}
            component={PurchaserFields}
            currentLotDetail={currentLotDetail}
            mode={mode}
          />
        </div>
        {Object.keys(customSections).map((key) => {
          const section = customSections[key];
          return (
            <div className={sectionCls} key={key}>
              <Field
                key={section.name}
                collapse={section}
                toggleCollapse={() => toggleCollapseCustomSection(key)}
                name={section.name}
                filedArrayName={section.name}
                component={CustomFields}
                mode={mode}
              />
            </div>
          );
        })}
      </form>
    );
  }
}

LotDetailFormComponent.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  currentLotDetail: PropTypes.object.isRequired,
  mode: PropTypes.string.isRequired,
  lotListStatuses: PropTypes.object.isRequired,
  toggleCollapse: PropTypes.func.isRequired,
  toggleCollapseCustomSection: PropTypes.func.isRequired,
  collapses: PropTypes.object.isRequired,
  updateCustomSections: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    currentProject: state.currentProject,
    lotListStatuses: state.lotListCollection.lotListStatuses,
    initialValues: state.currentLotDetail.toJS(),
    currentLotDetail: state.currentLotDetail,
    mode: state.currentLotDetail.mode
  };
}

const LotDetailWithForm = reduxForm({
  form: 'lotDetailForm'
})(LotDetailFormComponent);

export const LotDetailForm = connect(mapStateToProps)(LotDetailWithForm);
