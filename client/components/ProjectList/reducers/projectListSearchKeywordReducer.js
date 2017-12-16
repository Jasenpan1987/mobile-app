import { createReducer } from '../../../utils';
import { CHANGE_PROJECT_LIST_SEARCH_KEYWORDS } from '../actions';

export const projectListSearchKeywordReducer = createReducer('', Object.assign({
  [CHANGE_PROJECT_LIST_SEARCH_KEYWORDS]: (state, action) => {
    return action.payload.keywords;
  }
}));
