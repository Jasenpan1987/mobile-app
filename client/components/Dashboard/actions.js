import { createAction } from '../../utils';

/**
 * Load Current Project
 */
export const LOAD_CURRENT_PROJECT = 'LOAD_CURRENT_PROJECT';
export const LOAD_CURRENT_PROJECT_PENDING = 'LOAD_CURRENT_PROJECT_PENDING';
export const LOAD_CURRENT_PROJECT_SUCCESS = 'LOAD_CURRENT_PROJECT_SUCCESS';
export const LOAD_CURRENT_PROJECT_FAILED = 'LOAD_CURRENT_PROJECT_FAILED';
/**
 * Poll dashboard actions
 */
export const LOAD_DASHBOARD = 'POLL_DASHBOARD';
export const LOAD_DASHBOARD_PENDING = 'POLL_DASHBOARD_PENDING';
export const LOAD_DASHBOARD_SUCCESS = 'POLL_DASHBOARD_SUCCESS';
export const LOAD_DASHBOARD_FAILED = 'POLL_DASHBOARD_FAILED';

export const CLOSE_DASHBOARD_LOAD_ERROR_MODAL = 'CLOSE_DASHBOARD_LOAD_ERROR_MODAL';

export const loadDashboardAct = projectId => createAction(LOAD_DASHBOARD, { projectId });
export const loadDashboardPendingAct = projectId => createAction(LOAD_DASHBOARD_PENDING, { projectId });
export const loadDashboardSuccessAct = response => createAction(LOAD_DASHBOARD_SUCCESS, { response });
export const loadDashboardFailedAct = error => createAction(LOAD_DASHBOARD_FAILED, { error });

export const loadProjectAct = projectId => createAction(LOAD_CURRENT_PROJECT, { projectId });
export const loadProjectPendingAct = () => createAction(LOAD_CURRENT_PROJECT_PENDING);
export const loadProjectSuccessAct = response => createAction(LOAD_CURRENT_PROJECT_SUCCESS, { response });
export const loadProjectFailedAct = error => createAction(LOAD_CURRENT_PROJECT_FAILED, { error });

export const closeDashboardLoadErrorModalAct = () => createAction(CLOSE_DASHBOARD_LOAD_ERROR_MODAL);
