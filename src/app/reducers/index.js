import { combineReducers } from 'redux';

import auth from './auth';
import user from './user';
import testimonies from './testimonies';
import blogs from './blogs';

export default combineReducers({
  auth: auth,
  user: user,
  testimonies: testimonies,
  blogs: blogs
})
