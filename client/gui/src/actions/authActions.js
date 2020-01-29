import axios from 'axios';
import setAuthoritationToken from '../utils/setAuthorization'
import { addFlashMessage, deleteAllFlashMessage } from './flashMessages'
import { setInscriptions } from './inscriptionsActions';
import * as TYPES from '../actions/types';
import { API_HOST } from '../config'
import jwt from 'jsonwebtoken'

export function setCurrentUser(user) {
  return {
    type: TYPES.SET_CURRENT_USER,
    user
  }
}

export const authStart = () => {
  return {
    type: TYPES.AUTH_START
  }
}

export const authSuccess = (token) => {
  return {
    type: TYPES.AUTH_SUCCESS,
    token: token
  }
}

export const authFail = (error) => {
  return {
    type: TYPES.AUTH_FAIL,
    error: error
  }
}

export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('expirationDate');
  localStorage.removeItem('userId')
  setAuthoritationToken();
  return {
    type: TYPES.AUTH_LOGOUT
  }
}

export const checkAuthTimeout = expirationDate => {
  return dispatch => {
    setTimeout(() => {
      dispatch( deleteAllFlashMessage())
      dispatch(addFlashMessage({
        type: 'error',
        text:'Tu sesión expiró. Logeate nuevamente.'
      }))
      dispatch(logout());
    }, expirationDate * 1000)
  }
}

export const authSetCurrentUser = (token) => {
  return dispatch => {
    axios.get(`${API_HOST}/auth/user/`, {headers:headers})
      .then(
        (res) => {
          dispatch(setCurrentUser(res.data));
          dispatch(authSuccess(token));
        }
      )
      .catch(err => {
        console.error(err)
      })
  }
}

const headers = {'Content-Type': 'application/json'}
export const authLogin = (username, password) => {
  return dispatch => {
    dispatch(authStart());
    return axios.post(`${API_HOST}/auth/login/`, {username, password}, {headers:headers})
      .then(
        (res) => {
          const token = res.data.token;
          const { user_id } = jwt.decode(token)
          const expirationDate = new Date(new Date().getTime() + 3600 * 1000);
          localStorage.setItem('token',token);
          localStorage.setItem('expirationDate', expirationDate);
          localStorage.setItem('userId', user_id);
          setAuthoritationToken(token);
          dispatch(authSetCurrentUser(token));
          dispatch(setInscriptions());
          dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000));
        }
      )
      .catch(err => {
        dispatch(authFail(err))
      }) 
  }
}

export const authSignup = (username, email, password1, password2) => {
  return dispatch => {
    dispatch(authStart());
    return axios.post(`${API_HOST}/auth/registration/`, {username, email, password1, password2}, {headers:headers})
  }
}

export const authCheckState = () => {
  return dispatch => {
    dispatch(authStart());
    const token = localStorage.getItem('token');
    if (token === undefined) {
      dispatch(authFail('No Token! login again.'));
      dispatch(logout())
    } else {
      const expirationDate = new Date(localStorage.getItem('expirationDate'));
      if ( expirationDate < new Date()) {
        dispatch(authFail('Token expired! login again.'));
        dispatch(logout())
      } else {
        setAuthoritationToken(token);
        dispatch(authSetCurrentUser(token));
        dispatch(setInscriptions());
        dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000));
      }
    }
  }
}

export function userVerifyEmailConfirm(key) {
  return dispatch => {
    return axios.post(`${API_HOST}/account-confirm-email/`, key, {headers:headers});
  }
}
