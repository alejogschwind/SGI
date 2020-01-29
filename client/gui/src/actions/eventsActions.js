import axios from 'axios';
import { API_HOST } from '../config';
import * as TYPES from './types';

export function getEvents() {
  return dispatch => {
    return axios.get(`${API_HOST}/events/`);
  }
}

// Only RDR
export const getEventsAsRDR = () => {
  return dispatch => {
    return axios.get(`${API_HOST}/adm/events/`)
  }
}

export const requestInscriptionApproved = (id) => {
  return dispatch => {
    return axios.patch(`${API_HOST}/adm/inscriptions/${id}`, {status: 'approved'})
  }
}