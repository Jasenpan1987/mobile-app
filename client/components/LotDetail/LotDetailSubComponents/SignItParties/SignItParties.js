import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { LotDetailSectionTitle } from '../CommonFieldsComponents';

import { PartyPanel } from './PartyPanel';

import { selectSignItParties } from '../../selectors';
import {
  changeSignItPartyToEditModeAct,
  updateSignItPartyEmailAct, resendSignItPartyEmailAct
} from '../../actions';

import localStyles from './SignItParties.scss';
import globalStyles from '../../../../shared/styles/global.scss';
import sectionStyles from '../LotDetailSection.scss';
import classnames from 'classnames';

class SignItPartiesComponent extends Component {
  state = {
    collapse: false
  }

  toggleCollapse = () => {
    this.setState({ collapse: !this.state.collapse });
  }

  render() {
    const { vendors, nonVendors } = this.props.signItParties;
    const { projectId, lotId, resendSignItPartyEmail, updateSignItPartyEmail,
      changeSignItPartyToEditMode, has66W, signContractMessage, signContractLabel
    } = this.props;

    const signStatusCls = classnames(global.row, localStyles['sign-contract-message'], {
      [localStyles.error]: signContractLabel === 'Error'
    });

    return (
      <div className={localStyles.container}>
        <div className={sectionStyles.container}>
          <LotDetailSectionTitle
            click={this.toggleCollapse}
            isOpenned={!this.state.collapse}
            style={{ color: '#0B7D96' }}
          >
            <h5>Sign It Parties</h5>
          </LotDetailSectionTitle>

          <div className={classnames(sectionStyles.content, localStyles.content, this.state.collapse ? sectionStyles.close : sectionStyles.open)}>
            <div className={classnames(localStyles['inner-content'])}>
            {signContractMessage &&
              <div className={signStatusCls}>
                <span>{signContractMessage}</span>
              </div>
            }
              {vendors.size > 0 &&
                <div className={classnames(globalStyles.row, localStyles.section)}>
                  <h4 className={localStyles['section-title']}>Vendors</h4>
                  {vendors.map(vendor => {
                    return (
                      <PartyPanel
                        key={vendor.id}
                        party={vendor}
                        has66W={has66W}
                        projectId={projectId}
                        lotId={lotId}
                        className={localStyles['section-item']}
                        updateSignItPartyEmail={updateSignItPartyEmail}
                        resendSignItPartyEmail={resendSignItPartyEmail}
                        changeSignItPartyToEditMode={changeSignItPartyToEditMode}
                      />
                    );
                  })}
                </div>
              }
              {nonVendors.size > 0 &&
                <div className={classnames(globalStyles.row, localStyles.section)}>
                  <h4 className={localStyles['section-title']}>Purchasers</h4>
                  {nonVendors.map(nonVendor => {
                    return (
                      <PartyPanel
                        key={nonVendor.id}
                        party={nonVendor}
                        has66W={has66W}
                        projectId={projectId}
                        lotId={lotId}
                        className={localStyles['section-item']}
                        updateSignItPartyEmail={updateSignItPartyEmail}
                        resendSignItPartyEmail={resendSignItPartyEmail}
                        changeSignItPartyToEditMode={changeSignItPartyToEditMode}
                      />
                    );
                  })}
                </div>}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    has66W: state.currentLotDetail.primaryDetail.has66W,
    signItParties: selectSignItParties(state)
  };
}

function mapDispatchToProps(dispatch) {
  return {
    changeSignItPartyToEditMode: (id, isEditMode) => dispatch(changeSignItPartyToEditModeAct(id, isEditMode)),
    updateSignItPartyEmail: (email, id, lotId, ldmId, projectId) => dispatch(updateSignItPartyEmailAct(email, id, lotId, ldmId, projectId)),
    resendSignItPartyEmail: (email, id, lotId, ldmId, projectId) => dispatch(resendSignItPartyEmailAct(email, id, lotId, ldmId, projectId))
  };
}

SignItPartiesComponent.propTypes = {
  signItParties: PropTypes.object,
  has66W: PropTypes.bool,
  changeSignItPartyToEditMode: PropTypes.func.isRequired,
  updateSignItPartyEmail: PropTypes.func.isRequired,
  resendSignItPartyEmail: PropTypes.func.isRequired,
  projectId: PropTypes.string.isRequired,
  lotId: PropTypes.string.isRequired,
  signContractMessage: PropTypes.string.isRequired,
  signContractLabel: PropTypes.string.isRequired
};

export const SignItParties = connect(mapStateToProps, mapDispatchToProps)(SignItPartiesComponent);
