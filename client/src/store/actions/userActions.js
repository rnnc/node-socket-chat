import {
  USER_LOGGING_IN
} from './types';

import { SOCKET_USER_LOGIN } from '../socketEvents';

export const loginUserServer = loginCreds => dispatch => {
  dispatch({
    type: SOCKET_USER_LOGIN,
    payload: loginCreds
  })
}

export const displayUserLoginForm = () => dispatch => {
  dispatch({
    type: USER_LOGGING_IN,
    payload: true
  })
}

export const hideUserLoginForm = () => dispatch => {
  dispatch({
    type: USER_LOGGING_IN,
    payload: false
  })
}