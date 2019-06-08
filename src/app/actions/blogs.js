import Firebase from '../config/Firebase';

export const UPDATE_BLOGS = "UPDATE_BLOGS";

export const loadBlogs = () => {

  return (dispatch) => {

    Firebase.firestore().collection('blogPosts').limit(20).get().then((snap) => {

      var arr = []

      snap.docs.map((doc) => {
        arr.push(doc.data())
      })

      dispatch(updateBlogs(arr))
    }).catch((err) => {
      console.log(err)
    })


  }
}

export const addBlogPost = blogPost => {

  return (dispatch, getState) => {


  }
}

export const deleteBlogPost = blogId => {

  return (dispatch, getState) => {


  }
}

const updateBlogs = blogPosts => ({
  type: UPDATE_BLOGS,
  blogPosts
})
