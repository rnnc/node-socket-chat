import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import thunk from 'redux-thunk';

import socketMiddleware from './socketMiddleware';
import socket from '../socket';

import rootReducer from './reducers';

const initialState = {};

const middleware = [thunk, socketMiddleware(socket)];

const store = createStore(
  rootReducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
)

export default store;