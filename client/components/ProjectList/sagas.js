import { takeLatest } from 'redux-saga';
import { call, put } from 'redux-saga/effects';
import * as api from './api';
import { push } from 'react-router-redux';
import { buildRouteUrl } from '../../utils';

import {
  LOAD_PROJECT_LIST,
  loadProjectListPendingAct, loadProjectListSuccessAct, loadProjectListFailedAct,
  CHANGE_PROJECT,
  changeProjectPendingAct, changeProjectSuccessAct, changeProjectFailedAct
} from './actions';

function* loadProjectListWorker() {
  yield put(loadProjectListPendingAct());
  try {
    const resp = yield call(api.loadProjectList);
    yield put(loadProjectListSuccessAct(resp));
  } catch (error) {
    yield put(loadProjectListFailedAct(error));
  }
}

function* changeProjectWorker(action) {
  yield put(changeProjectPendingAct());
  try {
    const resp = yield call(api.changeProject, action.payload.projectId);
    if (resp.data) {
      yield put(changeProjectSuccessAct(resp));
      yield put(push(buildRouteUrl(`${ROUTE_BASE}/projects/${action.payload.projectId}`)));
    } else {
      yield put(changeProjectFailedAct(resp.error));
    }
  } catch (error) {
    yield put(changeProjectFailedAct(error));
  }
}

export const projectListSaga = [
  takeLatest(LOAD_PROJECT_LIST, loadProjectListWorker),
  takeLatest(CHANGE_PROJECT, changeProjectWorker)
];
