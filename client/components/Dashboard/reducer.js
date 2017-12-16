import { createReducer } from '../../utils';
import {
  LOAD_CURRENT_PROJECT_PENDING,
  LOAD_DASHBOARD_SUCCESS,
  LOAD_DASHBOARD_FAILED,
  CLOSE_DASHBOARD_LOAD_ERROR_MODAL
} from './actions';
import { getDashboardInstance } from './models';

const initState = getDashboardInstance();

export const dashboardReducer = createReducer(initState(), Object.assign(
  {
    [LOAD_CURRENT_PROJECT_PENDING]: state => {
      return state.set('isLoading', true);
    },
    [LOAD_DASHBOARD_SUCCESS]: (state, action) => {
      return initState(action.payload.response.data)
        .set('isLoading', false);
    },
    [LOAD_DASHBOARD_FAILED]: state => {
      return state.set('isLoading', false)
        .set('isDashboardErrorModalOpen', true);
    },
    [CLOSE_DASHBOARD_LOAD_ERROR_MODAL]: state => {
      return state.set('isDashboardErrorModalOpen', false);
    }
  }
));
