import { browserHistory, hashHistory } from 'react-router';
import { routerMiddleware } from 'react-router-redux';

import {
  applyMiddleware,
  compose,
  createStore
} from 'redux';

import createSagaMiddleware from 'redux-saga';
import reducers from './shared/reducers';
import { isOldIE } from './utils/';

const sagaMiddleware = createSagaMiddleware();

export default () => {
  const store = createStore(
    reducers,
    compose(
      applyMiddleware(
        routerMiddleware((isOldIE() ? hashHistory : browserHistory)), sagaMiddleware
      )
    ),
  );

  store.runSaga = sagaMiddleware.run;

  return store;
};
