import server from '../../utils/server';

export const loadLotList = projectId => {
  return server.get(`projects/${projectId}/lots`);
};
