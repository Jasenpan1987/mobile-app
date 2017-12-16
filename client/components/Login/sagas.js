import { takeLatest } from 'redux-saga';
import { call, put } from 'redux-saga/effects';
import { success, error } from 'react-notification-system-redux';
import * as api from './api';
import { rememberUser, forgetUser } from '../../utils';
import { push } from 'react-router-redux';
import { buildRouteUrl } from '../../utils';
import {
  LOGIN, loginFailAct, loginPendingAct, loginSuccessAct,
  LOGOUT, logoutSuccessAct
} from './actions';

import { buildNotificationContent } from '../../utils';

const loginSuccessNotificationOpt = buildNotificationContent({
  title: 'Login success'
});

const loginErrorNotification_username_passwordOpt = buildNotificationContent({
  title: 'Login failed',
  message: 'Incorrect username or password'
});

const loginErrorNotification_server_errorOpt = buildNotificationContent({
  title: 'Login failed',
  message: 'Incorrect username or password'
});

function* loginWorker(action) {
  try {
    yield put(loginPendingAct());
    const resp = yield call(api.loginUser, action.payload);
    if (resp.data.statusCode === 200) {
      rememberUser(resp.data);
      const currentUserResp = yield call(api.currentUser);
      const respData = resp.data;
      respData.identity = currentUserResp.data;
      rememberUser(respData);
      yield put(loginSuccessAct(respData));
      yield put(success(loginSuccessNotificationOpt));
      yield put(push(buildRouteUrl(`${ROUTE_BASE}/projects`)));
    } else {
      if (resp.data.statusCode === 400) {
        yield put(loginFailAct(resp.data.statusCode));
        yield put(error(loginErrorNotification_username_passwordOpt));
      } else {
        yield put(loginFailAct('Unable to login due to the unexpected server error.'));
        yield put(error(loginErrorNotification_server_errorOpt));
      }
    }
  } catch (err) {
    yield put(loginFailAct('Unable to login due to the unexpected server error.'));
    yield put(error(loginErrorNotification_server_errorOpt));
  }
}

function* logoutWorker() {
  yield call(forgetUser);
  yield put(logoutSuccessAct());
  yield put(push(buildRouteUrl(`${ROUTE_BASE}/login`)));
}

export const loginSaga = [
  takeLatest(LOGIN, loginWorker),
  takeLatest(LOGOUT, logoutWorker)
];
