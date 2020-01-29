import axios from 'axios';
import { API_HOST } from '../config';

const headers = {'Content-Type': 'application/json'}
export function updatePersonal(data, id) {
  return dispatch => {
    return axios.patch(`${API_HOST}/accounts/personal/${id}`, data, {headers:headers});
  }
}

export function updateMedicalRecords(data, id) {
  return dispatch => {
    return axios.patch(`${API_HOST}/accounts/medical/${id}`, data, {headers:headers});
  }
}

export function updateEmergencyContact(data, id) {
  return dispatch => {
    return axios.patch(`${API_HOST}/accounts/emergency-contact/${id}`, data, {headers:headers});
  }
}

export function updateInstitutional(data, id) {
  return dispatch => {
    return axios.patch(`${API_HOST}/accounts/institutional/${id}`, data, {headers:headers});
  }
}

export function updateProfile(data, id) {
  return dispatch => {
    return axios.patch(`${API_HOST}/accounts/profile/${id}`, data, {headers:headers});
  }
}