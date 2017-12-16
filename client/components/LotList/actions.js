import { createAction } from '../../utils';

export const LOAD_LOT_LIST = 'LOAD_LOT_LIST';
export const LOAD_LOT_LIST_PENDING = 'LOAD_LOT_LIST_PENDING';
export const LOAD_LOT_LIST_SUCCESS = 'LOAD_LOT_LIST_SUCCESS';
export const LOAD_LOT_LIST_FAILED = 'LOAD_LOT_LIST_FAILED';

export const CHANGE_LOT_LIST_SEARCH_KEYWORDS = 'CHANGE_LOT_LIST_SEARCH_KEYWORDS';

export const LOT_LIST_ERROR_MODAL_CLOSE = 'LOT_LIST_ERROR_MODAL_CLOSE';

export const loadLotListAct = projectId => createAction(LOAD_LOT_LIST, { projectId });
export const loadLotListPendingAct = () => createAction(LOAD_LOT_LIST_PENDING);
export const loadLotListSuccessAct = ({ data, meta }) => createAction(LOAD_LOT_LIST_SUCCESS, { data, meta });
export const loadLotListFailedAct = error => createAction(LOAD_LOT_LIST_FAILED, { error });

export const changeLotListSearchKeywordsAct = keywords => createAction(CHANGE_LOT_LIST_SEARCH_KEYWORDS, { keywords });

export const closeLotListErrorModalAct = () => createAction(LOT_LIST_ERROR_MODAL_CLOSE);
