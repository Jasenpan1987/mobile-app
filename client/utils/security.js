import Lockr from 'lockr';

const appKey = 'planly';

export function rememberUser(user) {
  // console.log('remember: ', user);
  Lockr.set(`${appKey}@user`, user);
}

export function forgetUser() {
  Lockr.set(`${appKey}@user`, null);
}

export function getUser() {
  return Lockr.get(`${appKey}@user`) || {};
}

export function getPermission(user) {
  return user.permission || {};
}

export function getRoles() {
  const user = getUser();
  if (!user || !user.identity) {
    return [];
  }
  return user.identity.roles || [];
}
