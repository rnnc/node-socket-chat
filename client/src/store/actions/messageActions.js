import {
  SEND_MESSAGE
} from './types';

import {
  SOCKET_SEND_MESSAGE
} from '../socketEvents';

export const sendMessage = messageData => dispatch => {
  dispatch({
    type: SOCKET_SEND_MESSAGE,
    payload: messageData
  });
}