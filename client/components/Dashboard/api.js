import server from '../../utils/server';

export const loadProject = projectId => {
  return server.get(`dashboard?projectId=${projectId}`);
};

export const loadDashboard = projectId => {
  return server.get(`projects/${projectId}`);
};
