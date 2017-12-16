import axios from 'axios';
import { getUser } from './security';

function createDefaultOptions() {
  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'x-planit-client-id': window.CLIENT_ID
  };

  const user = getUser();
  if (user.accessToken) {
    headers.Authorization = `Bearer ${user.accessToken}`;
  }
  return headers;
}

function buildURL(path) {
  const baseUrl = API_BASE;
  if (path.indexOf('?') > 0) {
    return `${baseUrl}/api/${path}&nocache=${Math.random()}`;
  }
  return `${baseUrl}/api/${path}?nocache=${Math.random()}`;
}

function get(path, options = {}) {
  return axios({
    method: 'get',
    url: buildURL(path),
    headers: {
      ...createDefaultOptions(),
      ...options
    }
  })
  .then(resp => {
    if (resp.meta) {
      return {
        data: resp.data,
        meta: resp.meta
      };
    }
    return resp.data;
  });
}

function post(path, data, options = {}) {
  return axios({
    method: 'post',
    url: buildURL(path),
    headers: {
      ...createDefaultOptions(),
      ...options
    },
    data
  })
  .then(resp => {
    if (resp.meta) {
      return {
        data: resp.data,
        meta: resp.meta
      };
    }
    return resp.data;
  });
}

function put(path, data, options = {}) {
  return axios({
    method: 'put',
    url: buildURL(path),
    headers: {
      ...createDefaultOptions(),
      ...options
    },
    data
  });
}

function del(path, data, options = {}) { // because delete is a reserved word
  return axios({
    method: 'put',
    url: buildURL(path),
    headers: {
      ...createDefaultOptions(),
      ...options
    },
    data
  });
}

export default {
  buildURL,
  get,
  post,
  put,
  delete: del
};
