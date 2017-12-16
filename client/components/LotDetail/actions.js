import _ from 'lodash';
import { createAction } from '../../utils';
import { INDIVIDUAL } from '../../shared/constants/partyTypes';
import exParties from '../../shared/constants/executionParties';

function constructGuarantorSaveData({
  addressLine1, addressLine2, email, firstName, id,
  lastName, organisationName, partyId, phone, postcode,
  state, suburb, type, willLock
}) {
  const common = {
    addressLine1, addressLine2, email, id,
    partyId, phone, postcode,
    state, suburb, type, willLock
  };
  return type.toString() === INDIVIDUAL ?
    Object.assign({}, common, { firstName, lastName, organisationName: '' }) :
    Object.assign({}, common, { firstName: '', lastName: '', organisationName });
}

function constructExecutionPartiesSaveData(executionParties) {
  if (!executionParties) return [];
  let dummyExecutionPartyId = -1;
  return executionParties.map(({ email, name, poaNumber, type }) => {
    return {
      email, id: dummyExecutionPartyId --, name,
      poaNumber: exParties.POWEROFATTORNEY ? poaNumber : '', type
    };
  });
}

function constructCustomFields(customFields) {
  return _.flatten(Object.keys(customFields).map(key => customFields[key]))
    .map(cField => ({ id: cField.id, fieldDescriptorId: cField.descriptorId, value: cField.value }));
}

function constructPurchaserSaveData(data) {
  const { addressLine1, addressLine2, companyNumber, companyNumberType,
    correspondenceCcEmailsRequest, email, executionParties, executionType,
    firstName, id, lastName, organisationName, partyId, phone, postcode, state,
    suburb, type, willLock } = data;
  const common = {
    addressLine1, addressLine2, correspondenceCcEmailsRequest, email, companyNumberType,
    executionParties: constructExecutionPartiesSaveData(executionParties),
    executionType, id, partyId, phone, postcode, state, suburb, type, willLock
  };
  const finalObj = type.toString() === INDIVIDUAL ?
    Object.assign({}, common, { firstName, lastName, companyNumber: '', organisationName: '' }) :
    Object.assign({}, common, { firstName: '', lastName: '', companyNumber, organisationName });
  return finalObj;
}

function constructLotDetailSaveData(data) {
  const { primaryDetail, purchaserSolicitor, guarantors, purchasers, customFields } = data;
  const formattedData = {
    detail: {
      apartmentNumber: primaryDetail.apartmentNumber,
      balance: primaryDetail.balance,
      contractDate: primaryDetail.contractDate,
      deposit: primaryDetail.deposit,
      depositPercentage: primaryDetail.depositPercentage,
      fileNumber: primaryDetail.fileNumber,
      id: primaryDetail.id,
      lotStatusId: primaryDetail.lotStatusId,
      partyId: primaryDetail.partyId || null,
      purchasePrice: primaryDetail.purchasePrice,
      purchaserSolicitorAddressLine1: purchaserSolicitor.purchaserSolicitorAddressLine1,
      purchaserSolicitorAddressLine2: purchaserSolicitor.purchaserSolicitorAddressLine2,
      purchaserSolicitorContact: purchaserSolicitor.purchaserSolicitorContact,
      purchaserSolicitorCorrespondenceCcEmailsRequest: purchaserSolicitor.purchaserSolicitorCorrespondenceCcEmailsRequest || null,
      purchaserSolicitorEmail: purchaserSolicitor.purchaserSolicitorEmail,
      purchaserSolicitorFax: purchaserSolicitor.purchaserSolicitorFax,
      purchaserSolicitorName: purchaserSolicitor.purchaserSolicitorName,
      purchaserSolicitorPhone: purchaserSolicitor.purchaserSolicitorPhone,
      purchaserSolicitorPortalUserId: purchaserSolicitor.purchaserSolicitorPortalUserId || null,
      purchaserSolicitorPostcode: purchaserSolicitor.purchaserSolicitorPostcode,
      purchaserSolicitorReference: purchaserSolicitor.purchaserSolicitorReference,
      purchaserSolicitorState: purchaserSolicitor.purchaserSolicitorState,
      purchaserSolicitorSuburb: purchaserSolicitor.purchaserSolicitorSuburb,
      purchaserSolicitorType: purchaserSolicitor.purchaserSolicitorType,
      willLock: purchaserSolicitor.willLock,
      vendorAgentId: primaryDetail.vendorAgentId
    },
    guarantors: guarantors.map(guarantor => constructGuarantorSaveData(guarantor)),
    purchasers: purchasers.map(purchaser => constructPurchaserSaveData(purchaser)),
    customFields: constructCustomFields(customFields)
  };
  return formattedData;
}

export const CHANGE_LOT_DETAIL_MODE = 'CHANGE_LOT_DETAIL_MODE'; // for saga, will dispatch CHANGE_LOT_DETAIL_MODE and reset(form)
export const ALTER_LOT_DETAIL_MODE = 'ALTER_LOT_DETAIL_MODE'; // for reducer only responsible for tweek the mode of the form

export const LOAD_LOT_DETAIL = 'LOAD_LOT_DETAIL';
export const LOAD_LOT_DETAIL_PENDING = 'LOAD_LOT_DETAIL_PENDING';
export const LOAD_LOT_DETAIL_SUCCESS = 'LOAD_LOT_DETAIL_SUCCESS';
export const LOAD_LOT_DETAIL_FAILED = 'LOAD_LOT_DETAIL_FAILED';
export const CLOSE_LOAD_LOT_DETAIL_MODAL = 'CLOSE_LOAD_LOT_DETAIL_MODAL';

export const SAVE_LOT_DETAIL = 'SAVE_LOT_DETAIL';
export const SAVE_LOT_DETAIL_PENDING = 'SAVE_LOT_DETAIL_PENDING';
export const SAVE_LOT_DETAIL_SUCCESS = 'SAVE_LOT_DETAIL_SUCCESS';
export const SAVE_LOT_DETAIL_FAILED = 'SAVE_LOT_DETAIL_FAILED';
export const CLOSE_SAVE_LOT_DETAIL_MODAL = 'CLOSE_SAVE_LOT_DETAIL_MODAL';

export const SIGN_LOT_CONTRACT = 'SIGN_LOT_CONTRACT';
export const SIGN_LOT_CONTRACT_PENDING = 'SIGN_LOT_CONTRACT_PENDING';
export const SIGN_LOT_CONTRACT_SUCCESS = 'SIGN_LOT_CONTRACT_SUCCESS';
export const SIGN_LOT_CONTRACT_FAILED = 'SIGN_LOT_CONTRACT_FAILED';
export const CLOSE_LOT_SIGN_IT_MODAL = 'CLOSE_LOT_SIGN_IT_MODAL';

export const OPEN_EDIT_MODE = 'OPEN_EDIT_MODE';
export const CLOSE_EDIT_MODE = 'CLOSE_EDIT_MODE';

export const TOGGLE_SIGNITPARTY_MODE = 'TOGGLE_SIGNITPARTY_MODE';

export const CHANGE_SIGNITPARTY_EMAIL = 'CHANGE_SIGNITPARTY_EMAIL'; // when user type in the input box

export const UPDATE_SIGNITPARTY_EMAIL = 'UPDATE_SIGNITPARTY_EMAIL'; // when user click the check button
export const UPDATE_SIGNITPARTY_EMAIL_PENDING = 'UPDATE_SIGNITPARTY_EMAIL_PENDING';
export const UPDATE_SIGNITPARTY_EMAIL_SUCCESS = 'UPDATE_SIGNITPARTY_EMAIL_SUCCESS';
export const UPDATE_SIGNITPARTY_EMAIL_FAILED = 'UPDATE_SIGNITPARTY_EMAIL_FAILED';

export const RESEND_SIGNITPARTY_EMAIL = 'RESEND_SIGNITPARTY_EMAIL';
export const RESEND_SIGNITPARTY_EMAIL_PENDING = 'RESEND_SIGNITPARTY_EMAIL_PENDING';
export const RESEND_SIGNITPARTY_EMAIL_SUCCESS = 'RESEND_SIGNITPARTY_EMAIL_SUCCESS';
export const RESEND_SIGNITPARTY_EMAIL_FAILED = 'RESEND_SIGNITPARTY_EMAIL_FAILED';

export const changeLotDetailModeAct = mode => createAction(CHANGE_LOT_DETAIL_MODE, { mode }); // for saga
export const alterLotDetailModeAct = mode => createAction(ALTER_LOT_DETAIL_MODE, { mode }); // for reducer

export const loadLotDetailAct = lotId => createAction(LOAD_LOT_DETAIL, { lotId });
export const loadLotDetailPendingAct = () => createAction(LOAD_LOT_DETAIL_PENDING);
export const loadLotDetailSuccessAct = response => createAction(LOAD_LOT_DETAIL_SUCCESS, { response });
export const loadLotDetailFailedAct = error => createAction(LOAD_LOT_DETAIL_FAILED, { error });
export const closeLoadLotDetailErrorModalAct = () => createAction(CLOSE_LOAD_LOT_DETAIL_MODAL);

export const saveLotDetailAct = (lotId, lotData) => createAction(SAVE_LOT_DETAIL, { lotId, lotDetail: constructLotDetailSaveData(lotData) });
export const saveLotDetailPendingAct = () => createAction(SAVE_LOT_DETAIL_PENDING);
export const saveLotDetailSuccessAct = response => createAction(SAVE_LOT_DETAIL_SUCCESS, { response });
export const saveLotDetailFailedAct = error => createAction(SAVE_LOT_DETAIL_FAILED, { error });
export const closeSaveLotDetailErrorModalAct = () => createAction(CLOSE_SAVE_LOT_DETAIL_MODAL);

export const signLotContractAct = lotId => createAction(SIGN_LOT_CONTRACT, { lotId });
export const signLotContractPendingAct = lotId => createAction(SIGN_LOT_CONTRACT_PENDING, { lotId });
export const signLotContractSuccessAct = response => createAction(SIGN_LOT_CONTRACT_SUCCESS, { response });
export const signLotContractFailedAct = errors => createAction(SIGN_LOT_CONTRACT_FAILED, { errors });
export const closeLotSignItModalAct = () => createAction(CLOSE_LOT_SIGN_IT_MODAL);

export const changeSignItPartyToEditModeAct = (id, mode) => createAction(TOGGLE_SIGNITPARTY_MODE, { id, mode });

export const updateSignItPartyEmailAct = (email, id, lotId, ldmId, projectId) => createAction(UPDATE_SIGNITPARTY_EMAIL, { email, id, lotId, ldmId, projectId });
export const updateSignItPartyEmailPendingAct = id => createAction(UPDATE_SIGNITPARTY_EMAIL_PENDING, { id });
export const updateSignItPartyEmailSuccessAct = (id, email) => createAction(UPDATE_SIGNITPARTY_EMAIL_SUCCESS, { id, email });
export const updateSignItPartyEmailFailedAct = id => createAction(UPDATE_SIGNITPARTY_EMAIL_FAILED, { id });

export const resendSignItPartyEmailAct = (email, id, lotId, ldmId, projectId) => createAction(RESEND_SIGNITPARTY_EMAIL, { email, id, lotId, ldmId, projectId });
export const resendSignItPartyEmailPendingAct = id => createAction(RESEND_SIGNITPARTY_EMAIL_PENDING, { id });
export const resendSignItPartyEmailSuccessAct = (id, email) => createAction(RESEND_SIGNITPARTY_EMAIL_SUCCESS, { id, email });
export const resendSignItPartyEmailFailedAct = id => createAction(RESEND_SIGNITPARTY_EMAIL_FAILED, { id });
