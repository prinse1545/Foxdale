import { UPDATE_TESTIMONIES, TOGGLE_TESTIMONY_LOADING } from '../actions/testimonies';

const initialState = {
  testimonies: [],
  testimonyLoading: false
}

export default (state = initialState, action) => {
  switch(action.type) {
    case UPDATE_TESTIMONIES:
      return { ...state, testimonies: action.testimonies }
    case TOGGLE_TESTIMONY_LOADING:
      return { ...state, testimonyLoading: !state.testimonyLoading }
    default:
      return state

  }
}
