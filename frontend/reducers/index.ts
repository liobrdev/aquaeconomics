import { combineReducers } from 'redux';

import { entryReducer, initialEntryState } from './entry';
import { navigationReducer, initialNavigationState } from './navigation';
import { userReducer, initialUserState } from './user';


const reducers = {
  entry: entryReducer,
  navigation: navigationReducer,
  user: userReducer,
};

export const initialAppState = {
  entry: initialEntryState,
  navigation: initialNavigationState,
  user: initialUserState,
};

export default combineReducers(reducers);