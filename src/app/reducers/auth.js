
import {
  LOG_IN,
  LOG_OUT
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
    default:
      return state
  }
}
