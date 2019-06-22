import Firebase from '../config/Firebase'

export const UPDATE_TESTIMONIES = "UPDATE_TESTIMONIES";
export const TOGGLE_TESTIMONY_LOADING = "TOGGLE_TESTIMONY_LOADING";

export const getTestimonies = () => {


  return (dispatch) => {

    Firebase.firestore().collection('testimonies').limit(20).get().then((snap) => {
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

  return (dispatch) => {
    dispatch(toggleTestimonyLoading())
  }
}

export const insertTestimony = testimony => {

  return (dispatch, getState) => {

    Firebase.firestore().collection('testimonies').set({

    }).then(() => {
      console.log('documnet successfully written');
    }).catch((err) => {
      console.log("There was an error: ", err);
    })

  }
}

export const deleteTestimony = testId => {

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
