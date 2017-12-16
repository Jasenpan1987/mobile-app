import { EXCHANGED, SETTLED } from '../shared/constants/defaultLotStatus';

export const isLotExchangedOrSettled = lotStatusId => (+lotStatusId === EXCHANGED || +lotStatusId === SETTLED);
