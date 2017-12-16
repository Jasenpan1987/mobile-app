import server from '../../utils/server';

export const loginUser = payload => server.post('auth', payload);

export const currentUser = () => server.get('users/current');
