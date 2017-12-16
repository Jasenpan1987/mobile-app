import { Record, List } from 'immutable';
import { createReducer } from '../../../utils';
import { LOAD_LOT_LIST_PENDING, LOAD_LOT_LIST_SUCCESS, LOAD_LOT_LIST_FAILED, LOT_LIST_ERROR_MODAL_CLOSE } from '../actions';
import { getLotListItemInstance, getLotStatusInstance } from '../models';
import { simpleSetProp, createRecordListFromArray } from '../../../utils';

const lotListInitState = Record({
  lotList: List(),
  lotListStatuses: List(),
  isLoading: false,
  error: null,
  isLoadErrorModalOpen: false
});

export const lotListReducer = createReducer(lotListInitState(), Object.assign({},
  {
    [LOAD_LOT_LIST_PENDING]: state => {
      return simpleSetProp(state, 'isLoading', true);
    },
    [LOAD_LOT_LIST_SUCCESS]: (state, action) => {
      const newLotList = createRecordListFromArray(action.payload.data.items, getLotListItemInstance());
      const newLotStatuses = createRecordListFromArray(action.payload.meta.lotStatuses, getLotStatusInstance());
      return state.set('lotList', newLotList)
        .set('lotListStatuses', newLotStatuses)
        .set('isLoading', false);
    },
    [LOAD_LOT_LIST_FAILED]: (state, action) => {
      return state.set('error', action.payload.error)
        .set('isLoading', false)
        .set('isLoadErrorModalOpen', true);
    },
    [LOT_LIST_ERROR_MODAL_CLOSE]: state => {
      return state.set('isLoadErrorModalOpen', false);
    }
  }
));
