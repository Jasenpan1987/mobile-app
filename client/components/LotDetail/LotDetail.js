import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { success } from 'react-notification-system-redux';
import {
  loadLotDetailAct, saveLotDetailAct, changeLotDetailModeAct,
  signLotContractAct, closeLotSignItModalAct, closeLoadLotDetailErrorModalAct,
  closeSaveLotDetailErrorModalAct
} from './actions';
import States from '../../shared/constants/states';
import { loadLotListAct } from '../LotList/actions';
import { LotDetailForm } from './LotDetailForm';
import { ToggleSwitch } from '../UI/ToggleSwitch';
import { SignItErrorModal } from '../../shared/components/SignItErrorModal';
import { submit } from 'redux-form';
import { CircleDecoration } from '../UI/ListComponents';
import { LotStatus } from '../../shared/components';
import { SignItParties } from './LotDetailSubComponents';
import { Icon } from '../UI/Icon';
import { isEditMode } from '../../utils';
import { LoadingLayer } from '../UI/LoadingLayer';

import localStyles from './LotDetail.scss';
import globalStyles from '../../shared/styles/global.scss';
import classnames from 'classnames';

import { lotDetailErrorModalFactory } from './lotDetailModalFactory';

const LotDetailLoadErrorModal = lotDetailErrorModalFactory(
  'Load Lot Detail Error',
  'Unable to load lot data due to an expected server error, please try again later.'
);

const LotDetailSaveErrorModal = lotDetailErrorModalFactory(
  'Save Lot Detail Error',
  'Unable to save lot data due to an expected server error, please try again later.'
);

class LotDetailComponent extends Component {

  /**
   * NEED SERIOUS REFACTOR !!!!!!
   * 1. MOVE collapse to redux
   * 2. initial load customSections from reducer
   */
  state = {
    collapses: {
      primaryDetails: { title: 'Primary Details', isOpenned: false },
      vendorAgent: { title: 'Vendor Agent', isOpenned: false },
      purchaserSolicitor: { title: 'Purchasers Solicitor', isOpen: false },
      guarantors: { title: 'Guarantors', isOpenned: false },
      purchasers: { title: 'Purchasers', isOpenned: false },
      tenancy: { title: 'Tenancy', isOpenned: false },
      gstTextableSupply: { title: 'GST Textable Supply', isOpenned: false },
      taxable: { title: 'Taxable', isOpenned: false },
      choices: { title: 'Choices', isOpenned: false },
      colorScheme: { title: 'Color Scheme', isOpenned: false },
      message: { title: 'Message', isOpenned: false },
      customSections: {}
    }
  }

  /**
   * NEED SERIOUS REFACTOR !!!!!!
   * 1. MOVE collapse to redux
   * 2. initial load customSections from reducer
   */
  updateCustomSections = sections => {
    this.setState({ collapses: { ...this.state.collapses, customSections: Object.assign(sections, this.state.collapses.customSections) } });
  }

  toggleCollapse = target => {
    this.setState({
      collapses: {
        ...this.state.collapses,
        [target]: {
          ...this.state.collapses[target],
          isOpenned: !this.state.collapses[target].isOpenned
        }
      }
    });
  }

  /**
   * NEED SERIOUS REFACTOR !!!!!!
   * 1. MOVE collapse to redux
   * 2. initial load customSections from reducer
   */
  toggleCollapseCustomSection = target => {
    this.setState({
      collapses: {
        ...this.state.collapses,
        customSections: {
          ...this.state.collapses.customSections,
          [target]: {
            ...this.state.collapses.customSections[target],
            isOpenned: !this.state.collapses.customSections[target].isOpenned
          }
        }
      }
    });
  }

  componentDidMount() {
    this.props.loadLotList(this.props.params.projectId);
    this.props.loadLotDetail(this.props.params.lotId);
  }

  saveLotDetail = (data) => {
    const { params: { lotId } } = this.props;
    this.props.saveLotDetail(lotId, data);
  }

  render() {
    // props
    const { params: { lotId, projectId }, changeLotDetailMode, currentLotDetail,
      currentLotDetail: { mode, primaryDetail, isLoadLotDetailErrorModalOpen, isSaveLotDetailErrorModalOpen },
      signLotContract, submitClicked, signErrorModalErrors, isSignErrorModalOpen, closeLotSignItModal,
      signContractMessage, closeLoadLotDetailErrorModal, closeSaveLotDetailErrorModal
    } = this.props;

    // class styles
    const menuButtonCls = classnames(globalStyles.btn, 'theme-btn-warning', localStyles.button);
    const columnSmallCls = classnames(globalStyles['col-sm-4'], globalStyles['col-xs-12']);
    const columnLargeCls = classnames(globalStyles['col-sm-8'], globalStyles['col-xs-12']);
    const sectionCls = classnames(globalStyles.row, localStyles.section);
    const toggleCls = classnames(globalStyles['pull-right-xs'], localStyles.toggle);
    const rightMenuCls = classnames(globalStyles['pull-right-sm'], globalStyles['push-left-xs']);
    const buttonGroupCls = localStyles['button-group'];
    const toggleHeaderCls = localStyles['toggle-header'];

    return (
      <div className={localStyles.container}>
        {/* <button onClick={() => this.props.openLotDetailModal()}>Open</button>
        <button onClick={() => this.props.notify(notificationOpts)}>Notify</button> */}
        <div className={sectionCls}>
          <div className={columnSmallCls}>
            <CircleDecoration circle={`${primaryDetail.number}`} >
              <LotStatus status={primaryDetail.signContractLabel}>
                <h3>
                  {primaryDetail.lotStatus && primaryDetail.lotStatus.name}
                </h3>
              </LotStatus>
            </CircleDecoration>
          </div>
          <div className={columnLargeCls}>
            <div className={rightMenuCls}>
              <div className={buttonGroupCls}>
                {isEditMode(mode) && <button className={menuButtonCls} onClick={submitClicked}>Save</button>}
                <button className={menuButtonCls} onClick={() => signLotContract(lotId)}>SignIT</button>
                {/* <button className={menuButtonClass}>VoI</button> */}
              </div>
              <ToggleSwitch
                defaultChecked={false}
                className={toggleCls}
                onChange={() => (isEditMode(mode) ? changeLotDetailMode('view') : changeLotDetailMode('edit'))}
                on={(
                  <span style={{ color: isEditMode(mode) ? '#0696B7' : '#ACAEB0' }}>ON</span>
                )}
                off={(
                  <span style={{ color: isEditMode(mode) ? '#0696B7' : '#8E8E91', opacity: isEditMode(mode) ? 0.7 : 1 }}>OFF</span>
                )}
                tag={(
                  <span>
                    <span className={toggleHeaderCls}>{'EDIT MODE'}</span>
                    <Icon icon={'pencil'} style={{ color: '#272A2D' }} />
                  </span>
                )}
              />
            </div>
          </div>
        </div>
        {/* {signContractMessage &&
          <div className={signStatusCls}>
            <span>{signContractMessage}</span>
            {isNSW && primaryDetail.signContractLabel === 'All Signed' &&
              <button className={menuButtonCls} onClick={() => {}}>Exchange</button>}
          </div>
        } */}
        <div className={global.row}>
          <SignItParties
            signContractMessage={signContractMessage}
            signContractLabel={primaryDetail.signContractLabel}
            lotId={lotId}
            projectId={projectId}
          />
        </div>
        <div className={global.row}>
            { currentLotDetail.isLoading && <LoadingLayer />}
            { /* Redux form will not be re-rendered by reducer, not initalize form values when its loading */ }
            { !currentLotDetail.isLoading &&
              <LotDetailForm onSubmit={this.saveLotDetail}
                toggleCollapse={this.toggleCollapse}
                toggleCollapseCustomSection={this.toggleCollapseCustomSection}
                collapses={this.state.collapses}
                updateCustomSections={this.updateCustomSections}
              />
            }
        </div>
        <SignItErrorModal
          isOpen={isSignErrorModalOpen}
          closeModal={closeLotSignItModal}
          errors={signErrorModalErrors}
        />
        <LotDetailLoadErrorModal
          isOpen={isLoadLotDetailErrorModalOpen}
          closeModal={closeLoadLotDetailErrorModal}
        />
        <LotDetailSaveErrorModal
          isOpen={isSaveLotDetailErrorModalOpen}
          closeModal={closeSaveLotDetailErrorModal}
        />
      </div>
    );
  }
}

LotDetailComponent.propTypes = {
  params: PropTypes.object.isRequired,
  isNSW: PropTypes.bool,
  loadLotList: PropTypes.func.isRequired,
  loadLotDetail: PropTypes.func.isRequired,
  currentLotDetail: PropTypes.object.isRequired,
  changeLotDetailMode: PropTypes.func.isRequired,
  signContractMessage: PropTypes.string,
  signErrorModalErrors: PropTypes.array.isRequired,
  isSignErrorModalOpen: PropTypes.bool.isRequired,
  saveLotDetail: PropTypes.func.isRequired,
  submitClicked: PropTypes.func.isRequired,
  notify: PropTypes.func,
  signLotContract: PropTypes.func,
  closeLotSignItModal: PropTypes.func,
  closeLoadLotDetailErrorModal: PropTypes.func,
  closeSaveLotDetailErrorModal: PropTypes.func
};

function mapStateToProps(state) {
  return {
    isNSW: state.currentProject.state === States.NSW,
    currentLotDetail: state.currentLotDetail,
    mode: state.currentLotDetail.mode,
    isModalOpen: state.currentLotDetail.isModalOpen,
    isSignErrorModalOpen: state.currentLotDetail.isSignErrorModalOpen,
    signErrorModalErrors: state.currentLotDetail.signItErrors,
    signContractMessage: state.currentLotDetail.primaryDetail.signContractMessage
  };
}

function mapDispatchToProps(dispatch) {
  return {
    loadLotList: projectId => dispatch(loadLotListAct(projectId)),
    loadLotDetail: lotId => dispatch(loadLotDetailAct(lotId)),
    saveLotDetail: (lotId, lotData) => dispatch(saveLotDetailAct(lotId, lotData)),
    changeLotDetailMode: mode => dispatch(changeLotDetailModeAct(mode)),
    submitClicked: () => dispatch(submit('lotDetailForm')),
    notify: notificationOpt => dispatch(success(notificationOpt)),
    signLotContract: lotId => dispatch(signLotContractAct(lotId)),
    closeLotSignItModal: () => dispatch(closeLotSignItModalAct()),
    closeLoadLotDetailErrorModal: () => dispatch(closeLoadLotDetailErrorModalAct()),
    closeSaveLotDetailErrorModal: () => dispatch(closeSaveLotDetailErrorModalAct())
  };
}

export const LotDetail = connect(mapStateToProps, mapDispatchToProps)(LotDetailComponent);
