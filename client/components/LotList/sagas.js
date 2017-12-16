import { takeLatest } from 'redux-saga';
import { call, put } from 'redux-saga/effects';
import * as api from './api';

import { LOAD_LOT_LIST, loadLotListPendingAct, loadLotListSuccessAct, loadLotListFailedAct } from './actions';

function* loadListWorker(action) {
  yield put(loadLotListPendingAct());
  try {
    const resp = yield call(api.loadLotList, action.payload.projectId);
    yield put(loadLotListSuccessAct(resp));
  } catch (error) {
    yield put(loadLotListFailedAct('Unexpected server error.'));
  }
}

export const loadLotListSaga = [
  takeLatest(LOAD_LOT_LIST, loadListWorker)
];
