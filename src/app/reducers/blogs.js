import { UPDATE_BLOGS, TOGGLE_BLOG_LOADING } from '../actions/blogs';

const initialState = {
  blogPosts: [],
  blogLoading: false
}

export default (state = initialState, action) => {
  switch(action.type) {
    case UPDATE_BLOGS:
      return { ...state, blogPosts: action.blogPosts }
    case TOGGLE_BLOG_LOADING:
      return { ...state, blogLoading: !state.blogLoading }
    default:
      return state
  }
}
