// Philipp Moura Srivastava
// 4 Juni 2019
// Filename: testimonies.js
// Description: Implements actions related to testimonies
// +++++++++++++++++++++++++++++++++++++
import Firebase from '../config/Firebase'

export const UPDATE_TESTIMONIES = "UPDATE_TESTIMONIES";
export const TOGGLE_TESTIMONY_LOADING = "TOGGLE_TESTIMONY_LOADING";

export const getTestimonies = () => {
  // Action: getTestimonies, action that loads testimonials and updates the reducer
  //
  // Parameter(s):
  //
  //   None

  return (dispatch) => {

    Firebase.firestore().collection('testimonies').get().then((snap) => {
      var arr = []

      snap.docs.map((doc) => {


        const obj = Object.assign({_id: doc.id}, doc.data())


        arr.push(obj)
      })
      dispatch(updateTestimonies(arr))
    }).catch((err) => {
      console.log(err)
    })

  }

}

export const toggleTestimony = () => {
  // Action: toggleTestimony, toggles loading icon on frontend  and updates the reducer
  //
  // Parameter(s):
  //
  //   None

  return (dispatch) => {
    dispatch(toggleTestimonyLoading())
  }
}

export const insertTestimony = testimony => {
  // Action: insertTestimony, action that inserts testimony  and updates the reducer
  //
  // Parameter(s):
  //
  //   testimony - object that includes body and author as fields

  return (dispatch, getState) => {

    const { body, author } = testimony;

    const date = new Date()

    Firebase.firestore().collection('testimonies').add({
      testimony: body,
      author: author,
      date: date
    }).then((doc) => {
      console.log('documnet successfully written');

      const addedTest = {
        _id: doc.id,
        testimony: body,
        author: author,
        date: date
      }

      const testimonies = getState().testimonies.testimonies

      var newTest = []

      testimonies.map((test) => {
        newTest.push(test)
      })

      newTest.push(addedTest)

      dispatch(updateTestimonies(newTest))
    }).catch((err) => {
      console.log("There was an error: ", err);
    })

  }
}

export const deleteTestimony = testId => {
  // Action: deleteTestimony, action that deletes testimony and updates the reducer
  //
  // Parameter(s):
  //
  //   testId - the id of the testimonial


  return (dispatch, getState) => {

    Firebase.firestore().collection('testimonies').doc(testId).delete().then(() => {
      console.log('Documnet Sucessfully Deleted');
      const testimonies = getState().testimonies.testimonies;

      var newTest = []

      testimonies.map((t) => {
        if(t._id != testId) {
          newTest.push(t)
        }
      })

      dispatch(updateTestimonies(newTest))
    }).catch((err) => {
      console.log("There was an error", err)
    })


  }
}


const updateTestimonies = testimonies => ({
  type: UPDATE_TESTIMONIES,
  testimonies
})

const toggleTestimonyLoading = () => ({
  type: TOGGLE_TESTIMONY_LOADING
})
