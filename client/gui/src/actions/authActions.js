import axios from 'axios';
import setAuthoritationToken from '../utils/setAuthorization'
import { addFlashMessage, deleteAllFlashMessage } from './flashMessages'
import { setInscriptions } from './inscriptionsActions';
import * as TYPES from '../actions/types';
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
    axios.get('http://192.168.1.104:8000/auth/user/', {headers:headers})
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
    return axios.post('http://192.168.1.104:8000/auth/login/', {username, password}, {headers:headers})
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
    axios.post('http://192.168.1.104:8000/auth/registration/', {username, email, password1, password2}, {headers:headers})
      .then(
        (res) => {
          console.log(res.data)
        }
      )
      .catch(err => {
        dispatch(authFail(err));
      }) 
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


// export function userSignupRequest(userData) {
//   return dispatch => {
//     return axios.post('http://192.168.1.104:8000/auth/registration/', userData, {headers:headers});
//   }
// }

// export const userLogoutRequest = () => {
//   console.log('logout user')
//   localStorage.removeItem('token');
//   localStorage.removeItem("expirationDate");
//   setAuthoritationToken(false);
//   return dispatch => {
//     dispatch(setCurrentUser({}))
//   }
// }

// export const checkAuthTimeout = expirationTime => {
//   return dispatch => {
//     // console.log('time out')
//     setTimeout(() => {
//       dispatch(userLogoutRequest());
//     }, expirationTime * 1000);
//   };
// };

// export function userLoginRequest(userData) {
//   return dispatch => {
//     return axios.post('http://192.168.1.104:8000/auth/login/', userData, {headers:headers})
//       .then(
//         (res) => {
//           const token = res.data.token;
//           console.log(res.data.user)
//           const expirationDate = new Date(new Date().getTime() + 3600 * 1000)
//           const user = jwt.decode(token)
//           localStorage.setItem('token',token);
//           localStorage.setItem('userId',user.user_id);
//           localStorage.setItem('expirationDate', expirationDate);
//           setAuthoritationToken(token);
//           dispatch(checkAuthTimeout(3600));
//           console.log(res.data.user)
//           dispatch(setCurrentUser(res.data.user));
//         }
//       )
//   }
// }

export function userVerifyEmailConfirm(key) {
  return dispatch => {
    return axios.post(`http://192.168.1.104:8000/account-confirm-email/`, key, {headers:headers});
  }
}

// export const authCheckState = () => {
//   return dispatch => {
//     console.log('authCheck')
//     const token = localStorage.getItem("token");
//     setAuthoritationToken(token);
//     if (token === undefined) {
//       console.log('No Token')
//       dispatch(userLogoutRequest());
//     } else {
//       const expirationDate = new Date(localStorage.getItem('expirationDate'));
//       if (expirationDate <= new Date()) {
//         console.log('authCheck')
//         dispatch(userLogoutRequest());
//       } else {
//         return axios.get('http://192.168.1.104:8000/auth/user/', {headers:headers})
//           .then(
//             (res) => {
//               console.table(res.data)
//               dispatch(
//                 checkAuthTimeout(
//                   (expirationDate.getTime() - new Date().getTime()) / 1000
//                 )
//               );
//               dispatch(setCurrentUser(res.data));
//             },

//           )
//       }
//     }
//   }
// }