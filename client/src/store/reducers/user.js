import {
  USER_LOGGED_IN_STATUS,
  USER_INIT,
  USER_LOGGED_IN_LOADING,
  USER_LOGGED_IN_FAILURE,
  USER_LOGGED_IN_SUCCESS,
  USER_LOGGING_IN
} from '../actions/types';

const initialState = {
  loading: false,
  logging_in: false,
  authenticated: false,
  user: {
    username: null,
    id: null,
    socketId: null
  }
}

export default function (state = initialState, action) {

  const { type, payload } = action;

  switch (type) {

    case USER_LOGGING_IN:
      return {
        ...state,
        logging_in: payload
      }

    case USER_LOGGED_IN_LOADING:
      return {
        ...state,
        loading: true
      }

    case USER_LOGGED_IN_SUCCESS:
      return {
        ...state,
        authenticated: true,
        loading: false,
        logging_in: false
      }

    case USER_LOGGED_IN_FAILURE:
      return {
        ...state,
        authenticated: false,
        loading: false,
        error: payload.error
      }

    case USER_INIT:
      return {
        ...state,
        user: payload
      }

    default:
      return state;

  }

}