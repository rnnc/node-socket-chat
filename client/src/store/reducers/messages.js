import {
  ADD_MESSAGE,
  REMOVE_MESSAGE,
  INIT_MESSAGES,
  CLEAR_MESSAGES,
} from '../actions/types';

const initialState = {
  message_list: [],
  user_message_history: []
};

export default function (state = initialState, action) {

  switch (action.type) {

    case INIT_MESSAGES:
      return {
        message_list: action.payload
      }

    case ADD_MESSAGE:
      return {
        message_list: [action.payload, ...state.message_list]
      }

    case REMOVE_MESSAGE:
      return {
        message_list: state.message_list.filter(message =>
          message.id !== action.payload.id)
      }

    case CLEAR_MESSAGES:
      return {
        message_list: []
      };

    default:
      return state;

  }

}