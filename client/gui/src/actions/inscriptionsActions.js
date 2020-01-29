import axios from 'axios';
import { API_HOST } from '../config';
import * as TYPES from './types';

export function setUserInscriptions(inscriptions) {
  return {
    type: TYPES.SET_USER_INSCRIPTIONS,
    inscriptions
  }
}

export function requestInscription(data) {
  return dispatch => {
    return axios.post(`${API_HOST}/inscriptions/`, data);
  }
}

export const setInscriptions = () => {
  return dispatch => {
    axios.get(`${API_HOST}/inscriptions/`)
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
    return axios.get(`${API_HOST}/adm/inscriptions/`)
  }
}

export const requestInscriptionApproved = (id) => {
  return dispatch => {
    return axios.patch(`${API_HOST}/adm/inscriptions/${id}`, {status: 'approved'})
  }
}