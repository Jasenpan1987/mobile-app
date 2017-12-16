import { combineReducers } from 'redux';

import { routerReducer } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form';
import { reducer as notifications } from 'react-notification-system-redux';

import { currentProjectReducer } from './currentProjectReducer';
import { loginReducer } from '../../components/Login';
import { projectListReducer, projectListSearchKeywordReducer } from '../../components/ProjectList';
import { dashboardReducer } from '../../components/Dashboard';
import { lotListReducer, lotListSearchKeywordReducer } from '../../components/LotList';
import { lotDetailReducer } from '../../components/LotDetail';

export default combineReducers({
  routing: routerReducer,
  form: formReducer,
  notifications,
  loginDetail: loginReducer,
  projectList: projectListReducer,
  projectListSearchKeywords: projectListSearchKeywordReducer,
  dashboardData: dashboardReducer,
  currentProject: currentProjectReducer,
  lotListCollection: lotListReducer,
  lotListSearchKeywords: lotListSearchKeywordReducer,
  currentLotDetail: lotDetailReducer
});
