import { createDataFn } from '../../utils';

const dashboardInitProperties = {
  numberOfContractIssued: 0,
  numberOfDeposit: 0,
  numberOfExchangePartial: 0,
  numberOfExchanged: 0,
  numberOfForSale: 0,
  numberOfForeignInvestors: 0,
  numberOfLot: 0,
  numberOfOthers: 0,
  numberOfSettled: 0,
  totalBalance: 0,
  totalDeposit: 0,
  totalPurchasePrice: 0,
  isLoading: false,
  isDashboardErrorModalOpen: false
};

export const getDashboardInstance = createDataFn(dashboardInitProperties);
