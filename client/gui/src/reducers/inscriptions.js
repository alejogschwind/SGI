import * as TYPES from '../actions/types';
import { updateObject } from '../utils/updateObject'

const setUserInscriptions = (state, action) => {
  return action.inscriptions
}

const inscriptions = (state = [], action) => {
  switch(action.type) {
    case TYPES.SET_USER_INSCRIPTIONS: return setUserInscriptions(state, action);
    default:
      return state;
  }
}

export default inscriptions;