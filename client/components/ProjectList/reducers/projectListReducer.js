import { createReducer } from '../../../utils';
import { LOAD_PROJECT_LIST_PENDING, LOAD_PROJECT_LIST_SUCCESS } from '../actions';
import { getProjectBriefDataInstance, getProjectListInstance } from '../models';
import { createRecordListFromArray } from '../../../utils';

const initStateProject = getProjectBriefDataInstance();
const initProjectList = getProjectListInstance();

export const projectListReducer = createReducer(initProjectList(), Object.assign(
  {
    [LOAD_PROJECT_LIST_PENDING]: (state) => {
      return state.set('isLoading', true);
    },
    [LOAD_PROJECT_LIST_SUCCESS]: (state, action) => {
      const projectListData = createRecordListFromArray(action.payload.response.data.projects, initStateProject);
      return state.set('projectListData', projectListData)
        .set('isLoading', false);
    }
  }
));
