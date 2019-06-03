import { combineReducers } from 'redux';

import auth from './auth'
import user from './user'

export default combineReducers({
  auth: auth,
  user: user
})
