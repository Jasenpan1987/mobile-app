
import { createDataFn } from '../../utils';
import exTypes from '../../shared/constants/executionTypes';

const lotStatus = {
  id: null,
  attributes: 0,
  index: -1,
  isPredefined: false,
  name: 'For Sale',
  projectId: null
};

const signItParty = {
  dateSignedOrDeclined: '',
  dateSignedOrDeclinedDisplay: '',
  email: '',
  id: '',
  isRepresentative: '',
  ldmId: '',
  name: '',
  orderId: '',
  ordinal: '',
  role: '',
  status: '',
  partyTypeName: '',
  paryTypeNameDescription: '',
  statusDescription: '',
  isUpdating: false,
  isEditMode: false
};

const lotPrimaryDetails = {
  lotStatus: null,
  lotStatusId: 0,
  id: null,
  has66W: false,
  purchasePrice: null,
  depositPercentage: null,
  deposit: null,
  balance: null,
  contractDate: null,
  number: '',
  apartmentNumber: null,
  fileNumber: null,
  vendorAgentId: null,
  signContractStatus: 0,
  signContractLabel: 'Not Signed',
  signContractError: null,
  signContractOrderId: null,
  signContractMessage: '',
  signContractUrl: null,
  partyId: null
};

const vendorAgent = {
  id: null,
  name: null,
  contact: null,
  phone: null,
  email: null,
  addressLine1: null,
  addressLine2: null,
  suburb: null,
  state: null,
  fullAddress: null,
  fax: null,
  reference: '',
  type: null
};

const purchaserSolicitor = {
  purchaserSolicitorName: null,
  purchaserSolicitorPhone: null,
  purchaserSolicitorContact: null,
  purchaserSolicitorEmail: null,
  purchaserSolicitorFullAddress: null,
  purchaserSolicitorAddressLine1: null,
  purchaserSolicitorAddressLine2: null,
  purchaserSolicitorSuburb: null,
  purchaserSolicitorPostcode: null,
  purchaserSolicitorState: null,
  purchaserSolicitorFax: null,
  purchaserSolicitorReference: '',
  purchaserSolicitorType: null,
  purchaserSolicitorCorrespondenceCcEmails: '',
  purchaserSolicitorCorrespondenceCcEmailsRequest: '',
  willLock: false
};

const executionParty = {
  email: '',
  id: null,
  poaNumber: '',
  positionType: exTypes.INDIVIDUAL,
  purchaserId: null,
  type: null,
  vendorId: null
};

const guarantor = {
  addressLine1: '',
  addressLine2: '',
  email: null,
  firstName: '',
  fullAddress: '',
  id: null,
  // isLocked: false,
  lastName: '',
  lotId: null,
  name: '',
  organisationName: '',
  partyId: null,
  phone: null,
  postcode: null,
  state: null,
  suburb: null,
  type: null,
  willLock: false
};

const purchaser = {
  addressLine1: '',
  addressLine2: '',
  companyNumber: null,
  companyNumberType: '0',
  correspondenceCcEmails: [],
  correspondenceCcEmailsRequest: '',
  email: '',
  executionParties: [],
  executionType: '2',
  firstName: '',
  fullAddress: '',
  id: null,
  // isLocked: false,
  lastName: '',
  lotId: null,
  name: '',
  organisationName: '',
  partyId: null,
  phone: null,
  postcode: null,
  signItCcEmails: [],
  signItCcEmailsRequest: '',
  state: null,
  suburb: null,
  type: null,
  willLock: false
};

export const getLotPrimaryDetailsInstance = createDataFn(lotPrimaryDetails);
export const getVendorAgentInstance = createDataFn(vendorAgent);
export const getPurchaserSolicitorInstance = createDataFn(purchaserSolicitor);
export const getLotlotStatusInstance = createDataFn(lotStatus);
export const getGuarantorInstance = createDataFn(guarantor);
export const getPurchaserInstance = createDataFn(purchaser);
export const getExecutionPartyInstance = createDataFn(executionParty);
export const getSignItPartyInstance = createDataFn(signItParty);
