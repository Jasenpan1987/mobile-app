import React, { Component } from 'react';
import PropTypes from 'prop-types';
import signItPartyStatus from '../../../../shared/constants/signItPartyStatus';

import { sectionLargeCls } from '../formStyles';
import { Panel } from '../../../UI/Panel';
import { IconButton } from './IconButton';

import { VerticalAlignment } from '../../../UI/AlignmentComponents';
import { IconDecoration } from '../../../UI/ListComponents/';

import globalStyles from '../../../../shared/styles/global.scss';
import localStyles from './PartyPanel.scss';
import classnames from 'classnames';

export class PartyPanel extends Component {
  state = { email: '' };

  isVendor = partyTypeName => /vendor/ig.test(partyTypeName);

  showLabel = (status, isRepresentative, partyTypeName, has66W) => {
    // status is pending
    // not representaive
    // if is representaive also show label if it is not vendor and has 66
    const notVendorWith66 = !this.isVendor(partyTypeName) && has66W;
    return status !== signItPartyStatus.NONE
      && (!isRepresentative || notVendorWith66);
  };

  getStatusColorClass = (status) => {
    if ([signItPartyStatus.DECLIEND, signItPartyStatus.AUTHENTICATION_FAILED].filter(x => x === status).length > 0) {
      return localStyles.error;
    }
    if (status === signItPartyStatus.SIGNED) {
      return localStyles.success;
    }
    if ([signItPartyStatus.PENDING, signItPartyStatus.DELIVERED, signItPartyStatus.NONE].filter(x => x === status).length > 0) {
      return localStyles.pending;
    }
    return localStyles.default;
  }

  componentWillMount() {
    const { party: { email } } = this.props;
    this.setState({ email });
  }

  render () {
    const { party: {
      id, partyTypeName, paryTypeNameDescription, statusDescription, isUpdating,
      name, email, isRepresentative, status, isEditMode, ldmId, role
    }, has66W, projectId, lotId, className,
    resendSignItPartyEmail, updateSignItPartyEmail, changeSignItPartyToEditMode } = this.props;

    const showLabel = this.showLabel(status, isRepresentative, partyTypeName, has66W);

    const panelBorder = status === signItPartyStatus.PENDING && showLabel ? 'warning' : 'default';
    const editable = (role === 0 || role === 4) && status !== signItPartyStatus.SIGNED && !isUpdating;
    const updating = editable && isUpdating;
    const editmode = isEditMode && showLabel;
    return (
      <div className={classnames(sectionLargeCls, className)}>
        <Panel
          key={id}
          className={localStyles.container}
          border={panelBorder}
        >
          {/* first section status */}
          <IconDecoration icon={'user-circle-o'}
            className={localStyles['status-container']}
            contentClassName={localStyles['status-content']}
            iconClassName={localStyles['status-icon']}
          >
            <VerticalAlignment alignment={'middle'} className={localStyles['status-detail']}>
              <h5>{paryTypeNameDescription}</h5>
              {showLabel &&
                <IconDecoration icon={'circle'} iconClassName={this.getStatusColorClass(status)} >
                  <span>{statusDescription}</span>
                </IconDecoration>
              }
            </VerticalAlignment>
            {editable &&
              <IconButton icon={'send'} label={'Resend'} onClick={() => resendSignItPartyEmail(this.state.email, id, lotId, ldmId, projectId)} />
            }
            {updating &&
              <IconButton icon={'spinner'} spin={1} />
            }
          </IconDecoration>

          {/* second section party detail */}
          {!editmode &&
          <VerticalAlignment alignment={'middle'} className={localStyles['party-container']}>
            <VerticalAlignment alignment={'middle'} className={localStyles['party-detail']}>
              <h5>{name}</h5>
              <span>{this.state.email}</span>
            </VerticalAlignment>
            {editable &&
              <IconButton icon={'pencil'} label={'Modify'} onClick={() => changeSignItPartyToEditMode(id, true)} />
            }
          </VerticalAlignment>}

          {/* second section party detail */}
          {editmode &&
          <VerticalAlignment alignment={'middle'} className={localStyles['party-container']}>
            <VerticalAlignment alignment={'middle'} className={localStyles['party-detail']}>
              <h5>{name}</h5>
              <input type={'email'}
                value={this.state.email}
                className={globalStyles['form-control']}
                onChange={(e) => this.setState({ email: e.target.value })}
              />
            </VerticalAlignment>
            {editable &&
              <IconButton icon={'save'} label={'Save'} onClick={() => updateSignItPartyEmail(this.state.email, id, lotId, ldmId, projectId)} />
            }
            {editable &&
              <IconButton icon={'close'} label={'Cancel'} onClick={() => { this.setState({ email }); changeSignItPartyToEditMode(id, false); }} />
            }
            {updating &&
              <IconButton icon={'spinner'} spin={1} />
            }
          </VerticalAlignment>}
        </Panel>
      </div>
    );
  }
}

PartyPanel.propTypes = {
  has66W: PropTypes.bool,
  projectId: PropTypes.string.isRequired,
  lotId: PropTypes.string.isRequired,
  className: PropTypes.string.isRequired,
  party: PropTypes.object.isRequired,
  resendSignItPartyEmail: PropTypes.func.isRequired,
  updateSignItPartyEmail: PropTypes.func.isRequired,
  changeSignItPartyToEditMode: PropTypes.func.isRequired
};
