import axios from 'axios';
import { API_HOST } from '../config'

// Only RDR
export function userDetailRDR(id) {
  return dispatch => {
    return axios.get(`${API_HOST}/adm/accounts/${id}`);
  }
}