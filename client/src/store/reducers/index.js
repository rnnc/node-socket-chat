import { combineReducers } from 'redux';

import presenceReducer from './presence';
import messageReducer from './messages';
import userReducer from './user';

export default combineReducers({
  presence: presenceReducer,
  messages: messageReducer,
  user: userReducer
});