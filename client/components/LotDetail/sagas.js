import { takeLatest, takeEvery } from 'redux-saga';
import { call, put, select } from 'redux-saga/effects';
import { success, error as err } from 'react-notification-system-redux';
import { reset } from 'redux-form';
import * as api from './api';

import {
  LOAD_LOT_DETAIL, loadLotDetailPendingAct, loadLotDetailSuccessAct, loadLotDetailFailedAct,
  SAVE_LOT_DETAIL, saveLotDetailPendingAct, saveLotDetailSuccessAct, saveLotDetailFailedAct,
  SIGN_LOT_CONTRACT, signLotContractPendingAct, signLotContractSuccessAct, signLotContractFailedAct,
  CHANGE_LOT_DETAIL_MODE, alterLotDetailModeAct,
  UPDATE_SIGNITPARTY_EMAIL, updateSignItPartyEmailPendingAct, updateSignItPartyEmailSuccessAct, updateSignItPartyEmailFailedAct,
  RESEND_SIGNITPARTY_EMAIL, resendSignItPartyEmailPendingAct, resendSignItPartyEmailSuccessAct, resendSignItPartyEmailFailedAct
} from './actions';

import { buildNotificationContent } from '../../utils';

const signITStartNotificationOpts = buildNotificationContent({
  title: 'Signing request submitted',
  message: 'The signing request has been successfully submitted. It will be processed soon.'
});

const updateSignItPartyOpts = buildNotificationContent({
  title: 'Update SignIT Party Email',
  message: 'Update SignIT party email successful'
});

const updateSignItPartyFailedOpts = buildNotificationContent({
  title: 'Update SignIT Party Email',
  message: 'Update SignIT party email failed'
});

const resendSignItPartyOpts = buildNotificationContent({
  title: 'Resend email request',
  message: 'You will receive an email shortly'
});

const getModeSelector = state => state.currentLotDetail.mode;

function* changeLotDetailModeWorker(action) {
  const previousMode = yield select(getModeSelector);
  const nextMode = action.payload.mode;
  if (previousMode === 'edit' && nextMode === 'view') {
    yield put(reset('lotDetailForm'));
  }
  yield put(alterLotDetailModeAct(action.payload.mode));
}

function* loadLotDetailWorker(action) {
  yield put(loadLotDetailPendingAct());
  try {
    const resp = yield call(api.loadLotDetail, action.payload.lotId);
    yield put(loadLotDetailSuccessAct(resp));
  } catch (error) {
    yield put(loadLotDetailFailedAct(error));
  }
}

function* saveLotDetailWorker(action) {
  yield put(saveLotDetailPendingAct());
  try {
    const { lotId, lotDetail } = action.payload;
    const resp = yield call(api.saveLotDetail, lotId, lotDetail);
    yield put(saveLotDetailSuccessAct(resp));
  } catch (error) {
    yield put(reset('lotDetailForm'));
    yield put(saveLotDetailFailedAct(error));
  }
}

function* signLotContractWorker(action) {
  const { lotId } = action.payload;

  yield put(signLotContractPendingAct(lotId));
  try {
    const resp = yield call(api.signContract, lotId);
    if (resp.data.hasError) {
      yield put(signLotContractFailedAct(resp.data.errors));
    } else {
      yield put(signLotContractSuccessAct(resp));
      yield put(success(signITStartNotificationOpts));
    }
  } catch (error) {
    yield put(signLotContractFailedAct(['unexpected server error']));
  }
}

function* updateSignItEmailWorker(action) {
  const { email, id, lotId, ldmId, projectId } = action.payload;
  yield put(updateSignItPartyEmailPendingAct(id));
  try {
    yield call(api.updateSignItPartyEmail, { email, id, lotId, ldmId, projectId });
    yield put(updateSignItPartyEmailSuccessAct(id, email));
    yield put(success(updateSignItPartyOpts));
  } catch (error) {
    yield put(updateSignItPartyEmailFailedAct(id));
    yield put(err(updateSignItPartyFailedOpts));
  }
}

function* resendSignItEmailWorker(action) {
  const { email, id, lotId, ldmId, projectId } = action.payload;
  yield put(resendSignItPartyEmailPendingAct(id));
  try {
    yield call(api.resendPartyEmail, { email, id, lotId, ldmId, projectId });
    yield put(resendSignItPartyEmailSuccessAct(id));
    yield put(success(resendSignItPartyOpts));
  } catch (error) {
    yield put(resendSignItPartyEmailFailedAct(id));
    yield put(err(updateSignItPartyFailedOpts));
  }
}

export const loadLotDetailSaga = [
  takeLatest(LOAD_LOT_DETAIL, loadLotDetailWorker),
  takeLatest(SAVE_LOT_DETAIL, saveLotDetailWorker),
  takeLatest(SIGN_LOT_CONTRACT, signLotContractWorker),
  takeEvery(CHANGE_LOT_DETAIL_MODE, changeLotDetailModeWorker),
  takeLatest(UPDATE_SIGNITPARTY_EMAIL, updateSignItEmailWorker),
  takeLatest(RESEND_SIGNITPARTY_EMAIL, resendSignItEmailWorker)
];
