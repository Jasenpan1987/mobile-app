import { createDataFn } from '../../utils';

const lotListItem = {
  apartmentNumber: '',
  fileNumber: '',
  id: null,
  lotStatusId: null,
  lotStatusName: '',
  number: '',
  price: '',
  purchaserSolicitorName: '',
  purchasers: '',
  settlementDatePart: '',
  signContractLabel: 'Not Signed',
  signContractMessage: '',
  signContractOrderId: null,
  signContractStatus: null,
  signContractUrl: null
};

const lotStatus = {
  id: null,
  projectId: null,
  name: '',
  attributes: 0,
  isPredefined: false,
  purchasers: ''
};

export const getLotListItemInstance = createDataFn(lotListItem);
export const getLotStatusInstance = createDataFn(lotStatus);
