import Firebase from '../config/Firebase';

export const UPDATE_BLOGS = "UPDATE_BLOGS";
export const TOGGLE_BLOG_LOADING = "TOGGLE_BLOG_LOADING";

export const loadBlogs = () => {

  return (dispatch) => {

    Firebase.firestore().collection('blogPosts').limit(20).get().then((snap) => {

      var arr = []

      snap.docs.map((doc) => {
        const obj = Object.assign({_id: doc.id}, doc.data())
        console.log(obj)
        arr.push(obj)
      })

      dispatch(updateBlogs(arr))
    }).catch((err) => {
      console.log(err)
    })


  }
}

export const toggleBlog = () => {

  return (dispatch) => {
    dispatch(toggleBlogLoading())
  }
}

export const addBlogPost = blogPost => {

  return (dispatch, getState) => {

    const date = new Date()

    Firebase.firestore().collection('blogPosts').add({
      text: blogPost,
      date: date
    }).then((doc) => {
      console.log('documnet successfully written');
      console.log(doc.id)
      const newBlog = {
        _id: doc.id,
        text: blogPost,
        date: date
      }
      var blogPosts = getState().blogs.blogPosts

      blogPosts.push(newBlog)

      dispatch(updateBlogs(blogPosts))

    }).catch((err) => {
      console.log("There was an error: ", err);
    })

  }
}

export const deleteBlogPost = blogId => {

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
