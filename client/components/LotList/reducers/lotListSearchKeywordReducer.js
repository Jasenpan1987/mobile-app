import { createReducer } from '../../../utils';
import { CHANGE_LOT_LIST_SEARCH_KEYWORDS } from '../actions';

export const lotListSearchKeywordReducer = createReducer('', Object.assign({
  [CHANGE_LOT_LIST_SEARCH_KEYWORDS]: (state, action) => {
    return action.payload.keywords;
  }
}));
