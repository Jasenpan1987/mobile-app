import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { formValueSelector } from 'redux-form';
import { isEditMode, isLotExchangedOrSettled } from '../../../utils';
import { INDIVIDUAL, ORGANISATION } from '../../../shared/constants/partyTypes';
import classnames from 'classnames';
import localStyles from './LotDetailSection.scss';
import globalStyles from '../../../shared/styles/global.scss';
import { innerSectoinMediumCls } from './formStyles';

import { Icon } from '../../UI/Icon';
import { TextField, EmailField, SelectField } from '../../UI/FormComponents/ReduxFromFields';
import { FormAddressFields, LotDetailSectionTitle, NoRecordFound } from './CommonFieldsComponents';

const GuarantorFieldsComponent = ({ fields, toggleCollapse, collapse, mode, lotStatusIdValue }) => {
  const editable = isEditMode(mode);
  // check lotStatus is exchanged or settled
  const isExchangedOrSettled = isLotExchangedOrSettled(lotStatusIdValue);
  const addPurchaserOnClick = (e) => {
    e.stopPropagation();
    fields.push({ type: 2 });
    if (!collapse.isOpenned) toggleCollapse();
  };

  return (
    <div className={localStyles.container}>
      <LotDetailSectionTitle click={toggleCollapse} isOpenned={collapse.isOpenned} style={{ color: '#0B7D96' }}>
        <h5>{collapse.title}</h5>
        {isEditMode(mode) && !isExchangedOrSettled &&
          <Icon icon={'user-plus'} onClick={addPurchaserOnClick.bind(this)} className={localStyles['add-icon']} />
        }
      </LotDetailSectionTitle>

      <div className={classnames(localStyles.content, collapse.isOpenned ? localStyles.open : localStyles.close)}>
        <div className={classnames(globalStyles.row, localStyles.section)}>
          {!fields.length && <NoRecordFound />}
          <ul>
            {fields.map((field, idx) => {
              return (
                <li key={`${field}.type`}>
                  <div className={classnames(localStyles['sub-container'], localStyles.content)}>
                    <div className={globalStyles.row}>
                      <SelectField name={`${field}.type`}
                        label={"Type"} editable={editable && !isExchangedOrSettled} className={innerSectoinMediumCls}
                        options={[
                          { key: INDIVIDUAL, value: INDIVIDUAL, name: 'Individual' },
                          { key: ORGANISATION, value: ORGANISATION, name: 'Organisation' }
                        ]}
                      />
                      {fields.get(idx).type.toString() === INDIVIDUAL ?
                      [
                        <TextField
                          key={`${field}.firstName`}
                          name={`${field}.firstName`}
                          label="Firstname"
                          editable={editable && !isExchangedOrSettled}
                          className={innerSectoinMediumCls}
                        />,
                        <TextField
                          key={`${field}.lastName`}
                          name={`${field}.lastName`}
                          label="Lastname"
                          editable={editable && !isExchangedOrSettled}
                          className={innerSectoinMediumCls}
                        />
                      ] : [
                        <TextField
                          key={`${field}.organisationName`}
                          name={`${field}.organisationName`}
                          label="Organization Name"
                          editable={editable && !isExchangedOrSettled}
                          className={innerSectoinMediumCls}
                        />,
                        <div key={`${field}.innerSection`} className={innerSectoinMediumCls}></div>
                      ]}
                      {isEditMode(mode) && !isExchangedOrSettled && collapse.isOpenned && (
                        <div className={classnames(innerSectoinMediumCls, localStyles['delete-icon'])}>
                          <Icon icon={'trash'} onClick={() => fields.remove(idx)} />
                        </div>
                      )}
                    </div>
                    <div className={globalStyles.row}>
                      <EmailField
                        name={`${field}.email`}
                        label="Email"
                        editable={editable}
                        className={innerSectoinMediumCls}
                      />
                      <TextField
                        name={`${field}.phone`}
                        label="Phone"
                        editable={editable}
                        className={innerSectoinMediumCls}
                      />
                    </div>
                    <FormAddressFields
                      className={globalStyles.row}
                      field={field}
                      editable={editable}
                    />
                  </div>
                </li>
              );
            })}
          </ul>
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

GuarantorFieldsComponent.propTypes = {
  fields: PropTypes.object,
  toggleCollapse: PropTypes.func,
  collapse: PropTypes.object,
  mode: PropTypes.string,
  lotStatusIdValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};

export const GuarantorFields = connect(mapStateToProps)(GuarantorFieldsComponent);
