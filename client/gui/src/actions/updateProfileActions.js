import axios from 'axios';

const headers = {'Content-Type': 'application/json'}
export function updatePersonal(data, id) {
  return dispatch => {
    return axios.patch(`http://192.168.1.104:8000/accounts/personal/${id}`, data, {headers:headers});
  }
}

export function updateMedicalRecords(data, id) {
  return dispatch => {
    return axios.patch(`http://192.168.1.104:8000/accounts/medical/${id}`, data, {headers:headers});
  }
}

export function updateEmergencyContact(data, id) {
  return dispatch => {
    return axios.patch(`http://192.168.1.104:8000/accounts/emergency-contact/${id}`, data, {headers:headers});
  }
}

export function updateInstitutional(data, id) {
  return dispatch => {
    return axios.patch(`http://192.168.1.104:8000/accounts/institutional/${id}`, data, {headers:headers});
  }
}

export function updateProfile(data, id) {
  return dispatch => {
    return axios.patch(`http://192.168.1.104:8000/accounts/profile/${id}`, data, {headers:headers});
  }
}