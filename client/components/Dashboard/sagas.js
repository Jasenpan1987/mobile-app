import { takeLatest } from 'redux-saga';
import { call, put } from 'redux-saga/effects';
import * as api from './api';
import {
  LOAD_DASHBOARD, loadDashboardPendingAct, loadDashboardSuccessAct, loadDashboardFailedAct,
  LOAD_CURRENT_PROJECT, loadProjectPendingAct, loadProjectSuccessAct, loadProjectFailedAct
} from './actions';

function* loadDashboardWorker (action) {
  try {
    yield put(loadDashboardPendingAct());
    const resp = yield call(api.loadDashboard, action.payload.projectId);
    yield put(loadDashboardSuccessAct(resp));
  } catch (error) {
    yield put(loadDashboardFailedAct(error));
  }
}

function* loadCurrentProjectWorker (action) { // the projectList reducer will handle this
  yield put(loadProjectPendingAct());
  try {
    const resp = yield call(api.loadProject, action.payload.projectId);
    yield put(loadProjectSuccessAct(resp));
  } catch (error) {
    yield put(loadProjectFailedAct(error));
  }
}

export const dashboardSaga = [
  takeLatest(LOAD_DASHBOARD, loadDashboardWorker),
  takeLatest(LOAD_CURRENT_PROJECT, loadCurrentProjectWorker)
];
