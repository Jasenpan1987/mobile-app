import { createAction } from '../../utils';

export const LOGIN = 'LOGIN';
export const LOGIN_PENDING = 'LOGIN_PENDING';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILED = 'LOGIN_FAILED';
export const LOGOUT = 'LOGOUT';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';

export const loginAct = (username, password) => createAction(LOGIN, { username, password });

export const loginPendingAct = () => createAction(LOGIN_PENDING);

export const loginSuccessAct = (response) => createAction(LOGIN_SUCCESS, { response });

export const loginFailAct = (error) => createAction(LOGIN_FAILED, { error });

export const logoutAct = () => createAction(LOGOUT);

export const logoutSuccessAct = () => createAction(LOGOUT_SUCCESS);
