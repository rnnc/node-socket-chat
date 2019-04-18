import {
  INIT_MESSAGES,
  USERS_LIST_INIT,
  USER_LIST_REMOVE,
  SERVER_CONNECTED,
  ADD_MESSAGE,
  CLEAR_MESSAGES,
  USER_LOGGED_IN_LOADING,
  USER_LOGGED_IN_SUCCESS,
  USER_LOGGED_IN_FAILURE
} from './actions/types';

import {
  SOCKET_CONNECTED,
  SOCKET_INIT_CHAT,
  SOCKET_USER_LOGIN,
  SOCKET_SEND_MESSAGE,
  SOCKET_CLEAR_MESSAGES,
  SOCKET_USER_LOGIN_STATUS,
  SOCKET_RECIEVE_MESSAGE
} from './socketEvents';

export default function socketMiddleware(socket) {
  return storeAPI => {

    socket.on(SOCKET_CONNECTED, (status) => {
      storeAPI.dispatch({
        type: SERVER_CONNECTED,
        payload: status
      })
    })

    socket.on(SOCKET_INIT_CHAT, (chat_cache, current_users) => {

      storeAPI.dispatch({
        type: USERS_LIST_INIT,
        payload: current_users
      });

      storeAPI.dispatch({
        type: INIT_MESSAGES,
        payload: chat_cache
      })

    });

    socket.on(SOCKET_USER_LOGIN_STATUS, (payload) => {

      storeAPI.dispatch({
        type: payload.status
          ? USER_LOGGED_IN_SUCCESS
          : USER_LOGGED_IN_FAILURE,
        payload
      });

    });

    socket.on(SOCKET_RECIEVE_MESSAGE, (message) => {
      storeAPI.dispatch({
        type: ADD_MESSAGE,
        payload: message
      })
    })

    socket.on(SOCKET_CLEAR_MESSAGES, () => {
      storeAPI.dispatch({
        type: CLEAR_MESSAGES
      })
    })

    return next => action => {

      const { type, payload } = action;

      switch (type) {

        case SOCKET_USER_LOGIN:
          socket.emit(type, payload);
          storeAPI.dispatch({
            type: USER_LOGGED_IN_LOADING
          })
          return;

        case SOCKET_SEND_MESSAGE:
          socket.emit(type, payload);
          return;

        /* case SOCKET_USER_LOGIN:
          socket.emit(type, payload);
          return; */
      }

      return next(action);
    }
  }
}
