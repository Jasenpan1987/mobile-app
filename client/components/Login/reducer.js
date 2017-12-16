import { Record } from 'immutable';
import { LOGIN_PENDING, LOGIN_SUCCESS, LOGIN_FAILED, LOGOUT_SUCCESS } from './actions';
import { createReducer } from '../../utils';
import { forgetUser, getUser } from '../../utils';

const Identity = Record({
  loginId: -1,
  username: '',
  roles: []
});

const InitialState = Record({
  isLoading: false,
  loginStatusCode: 200,
  user: getUser().identity
});

export const loginReducer = createReducer(InitialState(), Object.assign(
  {
    [LOGIN_PENDING]: state => {
      return state
        .set('isLoading', true)
        .set('loginStatusCode', 200);
    }
  },
  {
    [LOGIN_SUCCESS]: (state, action) => {
      const { payload: { response } } = action;
      return state
        .set('user', Identity(response.identity))
        .set('isLoading', false)
        .set('loginStatusCode', 200);
    }
  },
  {
    [LOGIN_FAILED]: (state) => {
      forgetUser();
      return state;
    }
  },
  {
    [LOGOUT_SUCCESS]: (state) => {
      return state.set('user', Identity());
    }
  }
));
