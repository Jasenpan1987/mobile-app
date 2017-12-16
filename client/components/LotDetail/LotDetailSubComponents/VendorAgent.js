import React from 'react';
import PropTypes from 'prop-types';
import { isEditMode } from '../../../utils';
import executionTypes from '../../../shared/constants/executionTypes';

import { LotDetailSectionTitle } from './CommonFieldsComponents';
import { SelectField } from '../../UI/FormComponents/ReduxFromFields';

import classnames from 'classnames';
import global from '../../../shared/styles/global.scss';
import local from './LotDetailSection.scss';

export const VendorAgentComponent = ({ toggleCollapse, collapse, mode, vendorAgents,
  vendorAgent: { name, contact, phone, email, address, type, fax } }) => {
  return (
    <div className={local.container}>
      <LotDetailSectionTitle click={toggleCollapse} isOpenned={collapse.isOpenned} style={{ color: '#0B7D96' }} >
        <h5>{collapse.title}</h5>
      </LotDetailSectionTitle>
      <div className={classnames(local.content, collapse.isOpenned ? local.open : local.close)}>
        {isEditMode(mode) ?
          <div className={classnames(global.row, local.section)}>
            <SelectField
              name={'primaryDetail.vendorAgentId'}
              label={'Agent'}
              editable={isEditMode(mode)}
              className={global['col-sm-3']}
              options={vendorAgents.map(agent => { return { key: agent.id, value: agent.id, name: agent.name }; })}
            />
          </div> :
          [<div key={'contact1'} className={classnames(global.row, local.section)}>
            <div className={global['col-sm-3']}>
              <div><label>Name</label></div>
              <div><span>{name}</span></div>
            </div>
            <div className={global['col-sm-3']}>
              <div><label>Contact</label></div>
              <div><span>{contact}</span></div>
            </div>
            <div className={global['col-sm-3']}>
              <div><label>Phone</label></div>
              <div><span>{phone}</span></div>
            </div>
            <div className={global['col-sm-3']}>
              <div><label>Email</label></div>
              <div><span>{email}</span></div>
            </div>
          </div>,
          <div key={'contact2'} className={classnames(global.row, local.section)}>
            <div className={global['col-sm-6']}>
              <div><label>Full Address</label></div>
              <div><span>{address}</span></div>
            </div>
            <div className={global['col-sm-3']}>
              <div><label>Type: </label></div>
              <div><span>{executionTypes.getDescription(type)}</span></div>
            </div>
            <div className={global['col-sm-3']}>
              <div><label>Fax</label></div>
              <div><span>{fax}</span></div>
            </div>
          </div>]
        }
      </div>
    </div>
  );
};

VendorAgentComponent.propTypes = {
  toggleCollapse: PropTypes.func.isRequired,
  collapse: PropTypes.object.isRequired,
  input: PropTypes.object.isRequired,
  vendorAgent: PropTypes.object,
  mode: PropTypes.string.isRequired,
  vendorAgents: PropTypes.object,
  vendorAgentId: PropTypes.number
};

export const VendorAgent = VendorAgentComponent;
