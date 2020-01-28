import * as TYPES from '../actions/types';
import { updateObject } from '../utils/updateObject'

const initialState = {
  token: null,
  user: null,
  error: null,
  loading: false
}

const authStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true
  });
}

const authSuccess = (state, action) => {
  return updateObject(state, {
    token: action.token,
    error: null,
    loading: false
  });
}

const authFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
}

const authLogout = (state, action) => {
  return updateObject(state, {
    token: null,
    user: null,
  });
}

const setCurrentUser = (state, action) => {
  return updateObject(state, {
    user: action.user,
  });
}

const auth = (state = initialState, action) => {
  switch(action.type) {
    case TYPES.SET_CURRENT_USER: return setCurrentUser(state, action);
    case TYPES.AUTH_START: return authStart(state, action);
    case TYPES.AUTH_SUCCESS: return authSuccess(state, action);
    case TYPES.AUTH_FAIL: return authFail(state, action);
    case TYPES.AUTH_LOGOUT: return authLogout(state, action);
    default:
      return state;
  }
}

export default auth;