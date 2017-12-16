import { push } from 'react-router-redux';
import { bindActionCreators } from 'redux';
import { buildRouteUrl } from './buildRouteUrl';

export function createRedirect(dispatch) {
  const redirect = bindActionCreators(push, dispatch);
  return (path) => {
    redirect(buildRouteUrl(path));
  };
}
