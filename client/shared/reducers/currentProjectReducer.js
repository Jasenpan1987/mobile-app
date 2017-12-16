import { getCurrentProjectInstance } from '../models';
import { createReducer } from '../../utils';
import { CHANGE_PROJECT_PENDING, CHANGE_PROJECT_SUCCESS } from '../../components/ProjectList/actions';
import { LOAD_CURRENT_PROJECT_PENDING, LOAD_CURRENT_PROJECT_SUCCESS, LOAD_CURRENT_PROJECT_FAILED } from '../../components/Dashboard/actions';
import { chains } from '../../utils';

const initCurrentProject = getCurrentProjectInstance();

export const currentProjectReducer = createReducer(initCurrentProject(), Object.assign(
  {
    [CHANGE_PROJECT_PENDING]: state => {
      return state.set('isLoading', true);
    },
    [CHANGE_PROJECT_SUCCESS]: (state, action) => {
      return initCurrentProject(action.payload.response.data);
    },
    [LOAD_CURRENT_PROJECT_PENDING]: state => {
      return state.set('isLoading', true);
    },
    [LOAD_CURRENT_PROJECT_SUCCESS]: (state, action) => {
      const { currentProject, currentProject: {
          vendors, correspondenceCcEmails, lotStatuses, masterAdjustments, signItCcEmails,
          vendorAgents, vendorSolicitorCorrespondenceCcEmails, vendorSolicitorSignItCcEmails, notes
        } } = action.payload.response.data;
      const initProject = initCurrentProject(currentProject);
      return chains(initProject)
        .setProp('vendors', vendors)
        .setProp('correspondenceCcEmails', correspondenceCcEmails)
        .setProp('lotStatuses', lotStatuses)
        .setProp('masterAdjustments', masterAdjustments)
        .setProp('signItCcEmails', signItCcEmails)
        .setProp('vendorAgents', vendorAgents)
        .setProp('vendorSolicitorCorrespondenceCcEmails', vendorSolicitorCorrespondenceCcEmails)
        .setProp('vendorSolicitorSignItCcEmails', vendorSolicitorSignItCcEmails)
        .setProp('notes', notes)
        .value();
    },
    [LOAD_CURRENT_PROJECT_FAILED]: (state /* , action*/) => {
      return state;
    }
  }
));
