const trimEnd = require('lodash/trimEnd');
const trimStart = require('lodash/trimStart');

export const buildRouteUrl = (path) => {
  return `${trimEnd(API_BASE, '/')}/${trimStart(path, '/')}`;
};
