import axios from 'axios';
import * as TYPES from './types';

export function setUserInscriptions(inscriptions) {
  return {
    type: TYPES.SET_USER_INSCRIPTIONS,
    inscriptions
  }
}

export function requestInscription(data) {
  return dispatch => {
    return axios.post(`http://192.168.1.104:8000/inscriptions/`, data);
  }
}

export const setInscriptions = () => {
  return dispatch => {
    axios.get('http://192.168.1.104:8000/inscriptions/')
      .then(
        (res) => {
          dispatch(setUserInscriptions(res.data));
        }
      )
      .catch(err => {
        console.error(err)
      })
  }
}

// Only RDR
export const getInscriptionsRequests = () => {
  return dispatch => {
    return axios.get('http://192.168.1.104:8000/adm/inscriptions/')
  }
}

export const requestInscriptionApproved = (id) => {
  return dispatch => {
    return axios.patch(`http://192.168.1.104:8000/adm/inscriptions/${id}`, {status: 'approved'})
  }
}