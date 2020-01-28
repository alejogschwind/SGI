import { combineReducers } from 'redux';
import flashMessages from './reducers/flashMessages'
import auth from './reducers/auth'
import inscriptions from './reducers/inscriptions'

export default combineReducers({
  auth,
  inscriptions,
  flashMessages,
})