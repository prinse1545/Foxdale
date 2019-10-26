// Philipp Moura Srivastava
// 4 Juni 2019
// Filename: auth.js
// Description: reducer for auth
// +++++++++++++++++++++++++++++
import {
  LOG_IN,
  LOG_OUT,
  IS_LOGGED_IN
} from '../actions/auth'


const initialState = {
  loggedIn: false,
  lastVerification: ''
}

export default (state = initialState, action) => {
  switch (action.type) {
    case LOG_IN:
      return {...state, loggedIn: action.loggedIn, lastVerification: action.lastVerification}
    case LOG_OUT:
      return {...state, loggedIn: false}
    case IS_LOGGED_IN:
      return {...state, loggedIn: action.bool}
    default:
      return state
  }
}
