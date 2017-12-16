import { Record, List } from 'immutable';
import { createReducer, chains, createRecordListFromArray } from '../../../utils';
import { CHECKBOX } from '../../../shared/constants/customFieldTypes';
import {
  ALTER_LOT_DETAIL_MODE,
  LOAD_LOT_DETAIL_PENDING, LOAD_LOT_DETAIL_SUCCESS, LOAD_LOT_DETAIL_FAILED, CLOSE_LOAD_LOT_DETAIL_MODAL,
  SAVE_LOT_DETAIL_PENDING, SAVE_LOT_DETAIL_SUCCESS, SAVE_LOT_DETAIL_FAILED, CLOSE_SAVE_LOT_DETAIL_MODAL,
  SIGN_LOT_CONTRACT_PENDING, SIGN_LOT_CONTRACT_SUCCESS,
  SIGN_LOT_CONTRACT_FAILED, CLOSE_LOT_SIGN_IT_MODAL,
  TOGGLE_SIGNITPARTY_MODE,
  UPDATE_SIGNITPARTY_EMAIL_PENDING, UPDATE_SIGNITPARTY_EMAIL_SUCCESS, UPDATE_SIGNITPARTY_EMAIL_FAILED
 } from '../actions';
import {
  getLotPrimaryDetailsInstance, getVendorAgentInstance, getPurchaserSolicitorInstance,
  getLotlotStatusInstance, getGuarantorInstance, getPurchaserInstance, getSignItPartyInstance
} from '../models';
import moment from 'moment';

const lotPrimaryInstance = getLotPrimaryDetailsInstance();
const vendorAgentInstance = getVendorAgentInstance();
const purchaserSolicitorInstance = getPurchaserSolicitorInstance();
const lotStatusInstance = getLotlotStatusInstance();
const guarantorInstance = getGuarantorInstance();
const purchaserInstance = getPurchaserInstance();
const signItPartyInstance = getSignItPartyInstance();

const reorderCustomFields = fields => fields && fields.sort(a => (a.type === CHECKBOX ? 1 : -1));

const lotDetailInitState = Record({
  mode: 'view', // edit
  isSignErrorModalOpen: false,
  isLoadLotDetailErrorModalOpen: false,
  isSaveLotDetailErrorModalOpen: false,
  signItErrors: [], // this value will be modified once we click the signIT button and there is an error
  isLoading: true,
  primaryDetail: lotPrimaryInstance(),
  vendorAgent: vendorAgentInstance(),
  vendorAgents: null,
  purchaserSolicitor: purchaserSolicitorInstance(),
  guarantors: null,
  purchasers: null,
  customFields: [],
  signItParties: List()
});

export const lotDetailReducer = createReducer(lotDetailInitState(), Object.assign({},
  {
    [ALTER_LOT_DETAIL_MODE]: (state, action) => {
      return state.set('mode', action.payload.mode);
    },
    /* Load lot detail start */
    [LOAD_LOT_DETAIL_PENDING]: state => {
      return state.set('isLoading', true);
    },
    [LOAD_LOT_DETAIL_FAILED]: state => {
      return state.set('isLoading', false)
        .set('isLoadLotDetailErrorModalOpen', true);
    },
    [LOAD_LOT_DETAIL_SUCCESS]: (state, action) => {
      const { detail, detail: { vendorAgent, vendorAgents, lotStatus, guarantors, purchasers },
        customFields, signItParties } = action.payload.response.data;

      const purchasersTransform = purchasers.map((purchaser) => {
        return { ...purchaser, correspondenceCcEmailsRequest: purchaser.correspondenceCcEmails.join(';'), willLock: purchaser.isLocked };
      });

      const guarantorsTransform = guarantors.map(guarantor => {
        return { ...guarantor, willLock: guarantor.isLocked };
      });

      const customFieldsTransform = Object.keys(customFields).reduce((obj, key) => { obj[key] = reorderCustomFields(customFields[key]); return obj; }, {});
      const parimaryDetailTransform = { ...detail, contractDate: detail.contractDate && moment(detail.contractDate).format('DD/MM/YYYY') };

      const newLotStatus = lotStatusInstance(lotStatus);
      const newGuarantors = createRecordListFromArray(guarantorsTransform, guarantorInstance);
      const newPurchasers = createRecordListFromArray(purchasersTransform, purchaserInstance);
      const newSignItParties = createRecordListFromArray(signItParties, signItPartyInstance);

      return chains(state)
        .setProp('isLoading', false) // set isLoading flag
        /* set primaryDetail */
        .setPropGroup('primaryDetail', [
          'id', 'number', 'lotStatusId', 'apartmentNumber', 'purchasePrice', 'depositPercentage', 'partyId', 'has66W',
          'deposit', 'balance', 'contractDate', 'apartmentNumber', 'fileNumber', 'vendorAgentId', 'signContractError',
          'signContractStatus', 'signContractLabel', 'signContractMessage', 'signContractOrderId', 'signContractUrl'
        ], parimaryDetailTransform)
        /* set lotStatus */
        .setIn(['primaryDetail', 'lotStatus'], newLotStatus)
        /* set vendorAgent */
        .setPropGroup('vendorAgent', [
          'id', 'name', 'phone', 'contact', 'email', 'addressLine1', 'addressLine2',
          'state', 'suburb', 'fullAddress', 'fax', 'reference', 'type'
        ], vendorAgent)
        /* set purchaserSolicitor */
        .setPropGroup('purchaserSolicitor', [
          'purchaserSolicitorName', 'purchaserSolicitorContact', 'purchaserSolicitorPhone', 'purchaserSolicitorEmail', 'purchaserSolicitorFullAddress',
          'purchaserSolicitorAddressLine1', 'purchaserSolicitorAddressLine2', 'purchaserSolicitorSuburb', 'purchaserSolicitorPostcode', 'purchaserSolicitorState',
          'purchaserSolicitorFax', 'purchaserSolicitorReference', 'purchaserSolicitorType', 'purchaserSolicitorCorrespondenceCcEmails'
        ], parimaryDetailTransform)
        .setProp(['purchaserSolicitor', 'willLock'], detail.isLocked) // need to set seperately since isLocked is on detail
        .setProp(['purchaserSolicitor', 'purchaserSolicitorCorrespondenceCcEmailsRequest'], detail.purchaserSolicitorCorrespondenceCcEmails.join(';'))
        /* set vendorAgents */
        .setIn(['vendorAgents'], createRecordListFromArray(vendorAgents, vendorAgentInstance))
        /* set guarantors */
        .setIn(['guarantors'], newGuarantors)
        /* set purchasers */
        .setIn(['purchasers'], newPurchasers)
        .setIn(['customFields'], customFieldsTransform)
        .setIn(['signItParties'], newSignItParties)
        .peek()
        .value();
    },
    [CLOSE_LOAD_LOT_DETAIL_MODAL]: state => {
      return state.set('isLoadLotDetailErrorModalOpen', false);
    },
    /* Load lot detail end */

    /* save lot detail start */
    [SAVE_LOT_DETAIL_PENDING]: state => {
      return state.set('isLoading', true);
    },
    [SAVE_LOT_DETAIL_FAILED]: state => {
      return state.set('isLoading', false)
        .set('isSaveLotDetailErrorModalOpen', true);
    },
    [SAVE_LOT_DETAIL_SUCCESS]: (state, action) => {
      const { detail, detail: { guarantors, purchasers }, customFields, lotStatus } = action.payload.response.data.data;
      const DetailTransform = { ...detail, contractDate: detail.contractDate && moment(detail.contractDate).format('DD/MM/YYYY') };
      const purchasersTransform = purchasers.map((purchaser) => {
        return { ...purchaser, correspondenceCcEmailsRequest: purchaser.correspondenceCcEmails.join(';'), willLock: purchaser.isLocked };
      });
      const guarantorsTransform = guarantors.map((guarantor) => {
        return { ...guarantor, willLock: guarantor.isLocked };
      });
      const newLotStatus = lotStatusInstance(lotStatus);
      const newGuarantors = createRecordListFromArray(guarantorsTransform, guarantorInstance);
      const newPurchasers = createRecordListFromArray(purchasersTransform, purchaserInstance);

      const customFieldsTransform = Object.keys(customFields).reduce((obj, key) => { obj[key] = reorderCustomFields(customFields[key]); return obj; }, {});

      return chains(state)
        .setProp('isLoading', false)
        /* set primaryDetail */
        .setPropGroup('primaryDetail', [
          'id', 'number', 'lotStatusId', 'apartmentNumber', 'purchasePrice', 'depositPercentage', 'partyId', 'has66W',
          'deposit', 'balance', 'contractDate', 'apartmentNumber', 'fileNumber', 'vendorAgentId', 'signContractError',
          'signContractStatus', 'signContractLabel', 'signContractMessage', 'signContractOrderId', 'signContractUrl'
        ], DetailTransform)
        /* set purchaserSolicitor */
        .setPropGroup('purchaserSolicitor', [
          'purchaserSolicitorName', 'purchaserSolicitorContact', 'purchaserSolicitorPhone', 'purchaserSolicitorEmail', 'purchaserSolicitorFullAddress',
          'purchaserSolicitorAddressLine1', 'purchaserSolicitorAddressLine2', 'purchaserSolicitorSuburb', 'purchaserSolicitorPostcode', 'purchaserSolicitorState',
          'purchaserSolicitorFax', 'purchaserSolicitorReference', 'purchaserSolicitorType'
        ], DetailTransform)
        .setProp(['purchaserSolicitor', 'willLock'], detail.isLocked)
        .setIn(['primaryDetail', 'lotStatus'], newLotStatus)
        .setProp(['purchaserSolicitor', 'purchaserSolicitorCorrespondenceCcEmailsRequest'], DetailTransform.purchaserSolicitorCorrespondenceCcEmails.join(';'))
        .setIn(['guarantors'], newGuarantors)
        /* set purchasers */
        .setIn(['purchasers'], newPurchasers)
        .setIn(['customFields'], customFieldsTransform)
        .value();
    },
    [CLOSE_SAVE_LOT_DETAIL_MODAL]: state => {
      return state.set('isSaveLotDetailErrorModalOpen', false);
    },
    /* save lot detail end */

    /* sign lot detail start */
    [SIGN_LOT_CONTRACT_PENDING]: state => {
      return state.set('isLoading', true);
    },
    [SIGN_LOT_CONTRACT_SUCCESS]: (state, action) => {
      const {
        signContractError, signContractLabel, signContractMessage,
        signContractOrderId, signContractStatus, signContractUrl
      } = action.payload.response.data;
      return chains(state)
        .setProp('isLoading', false)
        .setPropGroup('primaryDetail', [
          'signContractError', 'signContractLabel', 'signContractMessage',
          'signContractOrderId', 'signContractStatus', 'signContractUrl'
        ], {
          signContractError, signContractLabel, signContractMessage,
          signContractOrderId, signContractStatus, signContractUrl }
        )
        .setIn(['signItErrors'], [])
        // .peek()
        .value();
    },
    [SIGN_LOT_CONTRACT_FAILED]: (state, action) => {
      return chains(state)
        .setProp('isLoading', false)
        .setIn(['signItErrors'], action.payload.errors)
        .setProp('isSignErrorModalOpen', true)
        // .peek()
        .value();
    },
    [CLOSE_LOT_SIGN_IT_MODAL]: state => {
      return state.set('isSignErrorModalOpen', false);
    },
    /* sign lot detail end */

    /* change signItParty start */
    [TOGGLE_SIGNITPARTY_MODE]: (state, action) => {
      const { id, mode } = action.payload;
      const targetPartyIdx = state.signItParties.findIndex(party => party.id === id);
      return state.setIn(['signItParties', targetPartyIdx, 'isEditMode'], mode);
    },
    [UPDATE_SIGNITPARTY_EMAIL_PENDING]: (state, action) => {
      const { id } = action.payload;
      const targetPartyIdx = state.signItParties.findIndex(party => party.id === id);
      return state.setIn(['signItParties', targetPartyIdx, 'isUpdating'], true);
    },
    [UPDATE_SIGNITPARTY_EMAIL_SUCCESS]: (state, action) => {
      const { id, email } = action.payload;
      const targetPartyIdx = state.signItParties.findIndex(party => party.id === id);
      return state
        .setIn(['signItParties', targetPartyIdx, 'email'], email)
        .setIn(['signItParties', targetPartyIdx, 'isEditMode'], false)
        .setIn(['signItParties', targetPartyIdx, 'isUpdating'], false);
    },
    [UPDATE_SIGNITPARTY_EMAIL_FAILED]: (state, action) => {
      const { id } = action.payload;
      const targetPartyIdx = state.signItParties.findIndex(party => party.id === id);
      return state
        .setIn(['signItParties', targetPartyIdx, 'isUpdating'], false)
        .setIn(['signItParties', targetPartyIdx, 'isEditMode'], false);
    }
    /* change signItParty end */
  }
));
