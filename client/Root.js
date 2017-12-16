import React from 'react';
import { Provider } from 'react-redux';
import { Router, browserHistory, hashHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import sagas from './shared/sagas';
import routes from './routes';
import configStore from './configStore';
import { isOldIE } from './utils';

const store = configStore();
store.runSaga(sagas);
const history = syncHistoryWithStore((isOldIE() ? hashHistory : browserHistory), store);

export default () => (
  <Provider store={store}>
    <Router history={history}>
      {routes}
    </Router>
  </Provider>
);
