import server from './server';

export const login = payload => server.post('auth', payload);
