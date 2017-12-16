import server from '../../utils/server';

export const loadProjectList = projectId => {
  return projectId ?
    server.get(`dashboard?projectId=${projectId}`) :
    server.get('dashboard');
};

export const changeProject = projectId => server.post(`projects/${projectId}/change`);
