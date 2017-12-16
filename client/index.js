import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Root from './Root';
import './components/UI/reset.scss';
import './shared/styles/global.scss';

import * as themes from './components/UI/themes';

window.BRANDING = 'site';
window.getThemeByStr = () => {
  return themes[window.BRANDING];
};

window.API_BASE = window.API_BASE || '';
window.ROUTE_BASE = window.ROUTE_BASE || '';

ReactDOM.render(
  <Root />,
  document.querySelector('#root'),
);
