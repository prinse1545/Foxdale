import { UPDATE_BLOGS } from '../actions/blogs';

const initialState = {
  blogPosts: []
}

export default (state = initialState, action) => {
  switch(action.type) {
    case UPDATE_BLOGS:
      return { ...state, blogPosts: action.blogPosts }
    default:
      return state
  }
}
