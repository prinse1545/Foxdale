import Firebase from '../config/Firebase';

export const UPDATE_BLOGS = "UPDATE_BLOGS";
export const TOGGLE_BLOG_LOADING = "TOGGLE_BLOG_LOADING";

export const loadBlogs = () => {

  return (dispatch) => {

    Firebase.firestore().collection('blogPosts').limit(20).get().then((snap) => {

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

  return (dispatch) => {
    dispatch(toggleBlogLoading())
  }
}

export const addBlogPost = blogPost => {

  return (dispatch, getState) => {

    Firebase.firestore().collection('blogPosts').set({

    }).then(() => {
      console.log('documnet successfully written');
    }).catch((err) => {
      console.log("There was an error: ", err);
    })

  }
}

export const deleteBlogPost = blogId => {

  return (dispatch, getState) => {

    Firebase.firestore().collection('testimonies').doc(blogId).delete().then(() => {
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
