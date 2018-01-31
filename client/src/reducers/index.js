import { combineReducers } from 'redux';

import decksReducer from './decksReducers';
import flashcardsReducer from './flashcardsReducers';
import notesReducer from './notesReducers';
import usersReducer from './usersReducers';
import messagesReducer from './messagesReducers';
import videosReducer from './videosReducers';
import authReducer from './authReducers';
import userIdReducer from './userIdReducers';

const reducers = combineReducers({
  decks: decksReducer,
  flashcards: flashcardsReducer,
  notes: notesReducer,
  user: usersReducer,
  users: usersReducer,
  messages: messagesReducer,
  videos: videosReducer,
  isAuth: authReducer,
  userId: userIdReducer,
});

export default reducers;
