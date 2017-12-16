
const roles = {
  SIGNER: 0,
  APPROVER: 4
};

const roleLookup = {
  [roles.SIGNER]: 'Signer',
  [roles.APPROVER]: 'Approver'
};

Object.defineProperty(roles, 'getDescription', {
  enumerable: false,
  writable: false,
  value(partyType) {
    return roleLookup[partyType];
  }
});

export default roles;
