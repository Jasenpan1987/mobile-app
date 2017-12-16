import { createSelector } from 'reselect';

const getProjectList = state => state.projectList.projectListData;
const filterKeywords = state => state.projectListSearchKeywords;

const getFilteredProjectList = (projectList, keywords) => {
  const reg = new RegExp(keywords, 'i');
  return projectList.filter(project => {
    return reg.test(project.name);
  });
};

export const selectProjectListByKeywords = createSelector(
  getProjectList,
  filterKeywords,
  getFilteredProjectList
);
