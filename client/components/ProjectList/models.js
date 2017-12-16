import { List } from 'immutable';
import { createDataFn } from '../../utils';

const projectBriefDataInitial = {
  address: '',
  id: -1,
  lotNumberEnd: 0,
  lotNumberStart: 0,
  matter: '',
  state: -1,
  name: ''
};

const projectListInitial = {
  isLoading: false,
  projectListData: List()
};

export const getProjectBriefDataInstance = createDataFn(projectBriefDataInitial);
export const getProjectListInstance = createDataFn(projectListInitial);
