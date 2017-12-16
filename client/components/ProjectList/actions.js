import { createAction } from '../../utils';

export const LOAD_PROJECT_LIST = 'LOAD_PROJECT_LIST';
export const LOAD_PROJECT_LIST_PENDING = 'LOAD_PROJECT_LIST_PENDING';
export const LOAD_PROJECT_LIST_SUCCESS = 'LOAD_PROJECT_LIST_SUCCESS';
export const LOAD_PROJECT_LIST_FAILED = 'LOAD_PROJECT_LIST_FAILED';
export const CHANGE_PROJECT_LIST_SEARCH_KEYWORDS = 'CHANGE_PROJECT_LIST_SEARCH_KEYWORDS';

export const CHANGE_PROJECT = 'CHANGE_PROJECT';
export const CHANGE_PROJECT_PENDING = 'CHANGE_PROJECT_PENDING';
export const CHANGE_PROJECT_SUCCESS = 'CHANGE_PROJECT_SUCCESS';
export const CHANGE_PROJECT_FAILED = 'CHANGE_PROJECT_FAILED';

export const loadProjectListAct = projectId => createAction(LOAD_PROJECT_LIST, { projectId: projectId || null });
export const loadProjectListPendingAct = () => createAction(LOAD_PROJECT_LIST_PENDING);
export const loadProjectListSuccessAct = response => createAction(LOAD_PROJECT_LIST_SUCCESS, { response });
export const loadProjectListFailedAct = error => createAction(LOAD_PROJECT_LIST_FAILED, { error });

export const changeProjectAct = projectId => createAction(CHANGE_PROJECT, { projectId });
export const changeProjectPendingAct = () => createAction(CHANGE_PROJECT_PENDING);
export const changeProjectSuccessAct = response => createAction(CHANGE_PROJECT_SUCCESS, { response });
export const changeProjectFailedAct = error => createAction(CHANGE_PROJECT, { error });

export const changeProjectListSearchKeywordsAct = keywords => createAction(CHANGE_PROJECT_LIST_SEARCH_KEYWORDS, { keywords });
