import server from '../../utils/server';

export const loadLotDetail = lotId => {
  return server.get(`lots/${lotId}`);
};

export const saveLotDetail = (lotId, data) => {
  return server.put(`lots/${lotId}`, { ...data });
};

export const signContract = lotId => {
  return server.post(`lots/${lotId}/signContract`);
};

export const updateSignItPartyEmail = ({ email, id, lotId, ldmId, projectId }) => {
  return server.put('lots/signIt/updatePartyEmail', { email, id, lotId, ldmId, projectId });
};

export const resendPartyEmail = ({ email, id, lotId, ldmId, projectId }) => {
  return server.put('lots/signIt/resendPartyEmail', { email, id, lotId, ldmId, projectId });
};
