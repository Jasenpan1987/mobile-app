import { createSelector } from 'reselect';

const getLotList = state => state.lotListCollection.lotList;
const filterKeywords = state => state.lotListSearchKeywords;

const getFilteredLotList = (lotList, keywords) => {
  const reg = new RegExp(keywords, 'i');
  return lotList.filter(project => {
    return reg.test(project.lotStatusName);
  });
};

export const selectLotListByKeywords = createSelector(
  getLotList,
  filterKeywords,
  getFilteredLotList
);
