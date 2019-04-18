import {
  USER_LOGGED_IN_STATUS,
  USERS_LIST_INIT,
  USER_LIST_ADD,
  USER_LIST_REMOVE,
  SERVER_CONNECTED,
} from '../actions/types';

const initialState = {
  server_connected: false,
  user_list: [],
  logged_in: false
};

export default function (state = initialState, action) {

  switch (action.type) {

    case SERVER_CONNECTED:
      return {
        ...state,
        server_connected: action.payload
      }

    case USERS_LIST_INIT:
      return {
        ...state,
        user_list: action.payload
      }
    case USER_LIST_ADD:
      return {
        ...state,
        user_list: [...state, action.payload]
      }
    case USER_LIST_REMOVE:
      return {
        ...state,
        user_list: state.user_list.filter(user => user.username !== action.payload)
      }

    default:
      return state;

  }

}

