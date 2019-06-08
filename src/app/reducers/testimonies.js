import { UPDATE_TESTIMONIES } from '../actions/testimonies';

const initialState = {
  testimonies: []
}

export default (state = initialState, action) => {
  switch(action.type) {
    case UPDATE_TESTIMONIES:
      return { ...state, testimonies: action.testimonies }
    default:
      return state

  }
}
