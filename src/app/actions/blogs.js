// Philipp Moura Srivastava
// 4 Juni 2019
// Filename: blogs.js
// Description: Implements blog related actions
// +++++++++++++++++++++++++++++++++++++
import Firebase from '../config/Firebase';

export const UPDATE_BLOGS = "UPDATE_BLOGS";
export const TOGGLE_BLOG_LOADING = "TOGGLE_BLOG_LOADING";

export const loadBlogs = () => {
  // Action: loadBlogs, action that loads the blogs and updates the reducer
  //
  // Parameter(s):
  //
  //   None
  //

  return (dispatch) => {

    Firebase.firestore().collection('blogPosts').get().then((snap) => {

      var arr = []

      snap.docs.map((doc) => {
        const obj = Object.assign({_id: doc.id}, doc.data())

        arr.push(obj)
      })

      dispatch(updateBlogs(arr))
    }).catch((err) => {
      console.log(err)
    })


  }
}

export const toggleBlog = () => {
  // Action: toggleBlog, toggles loading icon and updates the reducer
  //
  // Parameter(s):
  //
  //   None
  return (dispatch) => {
    dispatch(toggleBlogLoading())
  }
}

export const addBlogPost = blogPost => {
  // Action: addBlogPost, action that addsBlogPost and updates the reducer
  //
  // Parameter(s):
  //
  //   blogPost - a string that is the blogPost
  return (dispatch, getState) => {

    const date = new Date()

    Firebase.firestore().collection('blogPosts').add({
      text: blogPost,
      date: date
    }).then((doc) => {
      console.log('documnet successfully written');

      const newBlog = {
        _id: doc.id,
        text: blogPost,
        date: date
      }
      const blogPosts = getState().blogs.blogPosts

      var newBlogPosts = []

      blogPosts.map((bp) => {
        newBlogPosts.push(bp)
      })

      newBlogPosts.push(newBlog)

      dispatch(updateBlogs(newBlogPosts))

    }).catch((err) => {
      console.log("There was an error: ", err);
    })

  }
}

export const deleteBlogPost = blogId => {
  // Action: deleteBlogPost, delered blog post and updates the reducer
  //
  // Parameter(s):
  //
  //   blogId - the id of the blog
  return (dispatch, getState) => {

    Firebase.firestore().collection('blogPosts').doc(blogId).delete().then(() => {
      console.log('Documnet Sucessfully Deleted');
      const blogPosts = getState().blogs.blogPosts;

      var newBlogs = []

      blogPosts.map((b) => {
        if(b._id != blogId) {
          newBlogs.push(b)
        }
      })

      dispatch(updateBlogs(newBlogs))
    }).catch((err) => {
      console.log("There was an error", err)
    })

  }
}

const updateBlogs = blogPosts => ({
  type: UPDATE_BLOGS,
  blogPosts
})

const toggleBlogLoading = () => ({
  type: TOGGLE_BLOG_LOADING
})
