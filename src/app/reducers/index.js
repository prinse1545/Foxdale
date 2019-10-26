// Philipp Moura Srivastva
// 4 Juni 2019
// Filename: index.js
// Description: combines reducers
// +++++++++++++++++++++++++++++++
import { combineReducers } from 'redux';

import auth from './auth';
import testimonies from './testimonies';
import blogs from './blogs';

export default combineReducers({
  auth: auth,
  testimonies: testimonies,
  blogs: blogs
})
