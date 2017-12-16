
const signItParties = {
  VENDOR: 1,
  GUARANTOR: 2,
  VENDOR_SOLICITOR: 3,
  PURCHASER: 4,
  PURCHASER_SOLICITOR: 5,
  VENDOR_AGENT: 6
};

const partyLookup = {
  [signItParties.VENDOR]: 'Vendor',
  [signItParties.GUARANTOR]: 'Guarantor',
  [signItParties.VENDOR_SOLICITOR]: 'Vendor Solicitor',
  [signItParties.PURCHASER]: 'Purchaser',
  [signItParties.PURCHASER_SOLICITOR]: 'Purchaser Solicitor',
  [signItParties.VENDOR_AGENT]: 'Vendor Agent'
};

Object.defineProperty(signItParties, 'getDescription', {
  enumerable: false,
  writable: false,
  value(partyType) {
    return partyLookup[partyType];
  }
});

export default signItParties;
