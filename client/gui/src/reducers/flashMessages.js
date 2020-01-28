import  * as TYPES from '../actions/types'
import shortid from 'shortid'

export default (state = [], action = {}) => {
  switch(action.type) {
    case TYPES.ADD_FLASH_MESSAGE:
      return [
        ...state,
        {
          id: shortid.generate(),
          type: action.message.type,
          text: action.message.text,
        }
      ];
    case TYPES.DELETE_FLASH_MESSAGE:
      return state.filter(message => message.id !== action.id);
    case TYPES.DELETE_ALL_FLASH_MESSAGE:
      return state.filter(message => false);
    default:
      return state
  }
}