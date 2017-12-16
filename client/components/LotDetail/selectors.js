import { List } from 'immutable';
import { createSelector } from 'reselect';
import SignItPartyRoles from '../../shared/constants/signItPartyRoles';
import SignItPartyStatuses from '../../shared/constants/signItPartyStatus';

const getSignItParties = state => state.currentLotDetail.signItParties;

const sortByRepresentative = parties => {
  return parties.sort((partyA) => {
    if (partyA.isRepresentative) return -1;
    return 1;
  });
};

const categoryByVendorAndNonVendor = parties => {
  let vendors = List();
  let nonVendors = List();
  parties.forEach(party => {
    if (/vendor/ig.test(party.partyTypeName)) {
      vendors = vendors.push(party);
    } else {
      nonVendors = nonVendors.push(party);
    }
  });
  vendors = sortByRepresentative(vendors);
  nonVendors = sortByRepresentative(nonVendors);
  return { vendors, nonVendors };
};

const getParyTypeName = ({ partyTypeName }) => {
  switch (partyTypeName) {
    case 'VendorSoleDirectorAndSecretary': return 'Vendor\'s Sole Director & Secretary';
    case 'VendorDirector': return 'Vendor\'s Director';
    case 'VendorSecretary': return 'Vendor\'s Secretary';
    case 'VendorPowerOfAttorney': return 'Vendor\'s Power of Attorney';
    case 'VendorSolicitor': return 'Vendor\'s Solicitor';
    case 'PurchaserSoleDirectorAndSecretary': return 'Purchaser\'s Sole Director & Secretary';
    case 'PurchaserDirector': return 'Purchaser\'s Director';
    case 'PurchaserSecretary': return 'Purchaser\'s Secretary';
    case 'PurchaserPowerOfAttorney': return 'Purchaser\'s Power of Attorney';
    case 'PurchaserSolicitor': return 'Purchaser\'s Solicitor';
    default: return partyTypeName;
  }
};

const getStatusDescription = party => {
  if (party.role === SignItPartyRoles.SIGNER && party.status === SignItPartyStatuses.PENDING) {
    return 'Signature Pending';
  }

  if (party.role === SignItPartyRoles.SIGNER && party.status === SignItPartyStatuses.SIGNED) {
    return `Signed ${party.dateSignedOrDeclinedDisplay}`;
  }

  if (party.role === SignItPartyRoles.APPROVER && party.status === SignItPartyStatuses.PENDING) {
    return 'Approval Pending';
  }

  if (party.role === SignItPartyRoles.APPROVER && party.status === SignItPartyStatuses.SIGNED) {
    return `Approved ${party.dateSignedOrDeclinedDisplay}`;
  }

  if (party.status === SignItPartyStatuses.DECLIEND) {
    return `Declined ${party.dateSignedOrDeclinedDisplay}`;
  }

  return '';
};

const transformSignItParties = signItParties => {
  const formattedParties = signItParties.map(party => {
    return party.set('paryTypeNameDescription', getParyTypeName(party))
      .set('statusDescription', getStatusDescription(party));
  });

  const finalParties = categoryByVendorAndNonVendor(formattedParties);
  return finalParties;
};

export const selectSignItParties = createSelector(
  getSignItParties,
  transformSignItParties
);
