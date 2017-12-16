export const Pending = 0;
export const Delivered = 1;
export const Signed = 2;
export const Declined = 3;
export const None = 4;
export const AuthenticationFailed = 5;

const signItPartyStatus = {
  PENDING: 0,
  DELIVERED: 1,
  SIGNED: 2,
  DECLIEND: 3,
  NONE: 4,
  AUTHENTICATION_FAILED: 5
};

const statusLookup = {
  [signItPartyStatus.PENDING]: 'Pending',
  [signItPartyStatus.DELIVERED]: 'Delivered',
  [signItPartyStatus.SIGNED]: 'Signed',
  [signItPartyStatus.DECLIEND]: 'Decliend',
  [signItPartyStatus.NONE]: 'None',
  [signItPartyStatus.AUTHENTICATION_FAILED]: 'Authentication Failed'
};

Object.defineProperty(signItPartyStatus, 'getDescription', {
  enumerable: false,
  writable: false,
  value(statusType) {
    return statusLookup[statusType];
  }
});

export default signItPartyStatus;
