import Firebase from '../config/Firebase'

export const UPDATE_TESTIMONIES = "UPDATE_TESTIMONIES";

export const getTestimonies = () => {

  const ref = Firebase.firestore().collection('testimonies')

  return (dispatch) => {

    Firebase.firestore().collection('testimonies').limit(20).get().then((snap) => {
      var arr = []

      snap.docs.map((doc) => {

        arr.push(doc.data())
      })
      dispatch(updateTestimonies(arr))
    }).catch((err) => {
      console.log(err)
    })

  }

}

export const insertTestimony = testimony => {

  return (dispatch, getState) => {


  }
}

export const deleteTestimony = testId => {

  return (dispatch, getState) => {


  }
}


const updateTestimonies = testimonies => ({
  type: UPDATE_TESTIMONIES,
  testimonies
})
