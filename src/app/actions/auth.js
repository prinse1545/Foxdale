// Philipp Moura Srivastava
// 4 Juni 2019
// Filename: auth.js
// Description: Implements firebase authentication actions
// +++++++++++++++++++++++++++++++++++++
import Firebase from '../config/Firebase'

export const LOG_IN = "LOG_IN"
export const LOG_OUT = "LOG_OUT"
export const IS_LOGGED_IN = "IS_LOGGED_IN"

export const loginWithFirebase = loginInfo => (dispatch) => {
  // Action: loginWithFirebase, a function that logs user into firebase and updates the reducer
  //
  // Parameter(s):
  //
  //   object - loginInfo with fields username and password
  //


  return new Promise((resolve, reject) => {
    const data = {
      loggedIn: true,
      lastVerification: new Date()
    }

    Firebase.auth().signInWithEmailAndPassword(loginInfo.username, loginInfo.password).then((user) => {
      resolve(user)
      dispatch(login(data))
    }).catch((err) => {
      reject(err)
      dispatch(login({loggedIn: false, lastVerification: null}))
    })
  })

}

export const isUserLoggedIn = () => {
  // Action: isUserLoggedIn, checks if user is logged in and updates the reducer
  //
  // Parameter(s):
  //
  //   None
  //


  return (dispatch) => {
    const user = Firebase.auth();

    console.log(user)
  }
}

export const createAccountWithFirebase = accountInfo => (dispatch) => {
  // Action: createAccountWithFirebase, creates account with firebase and updates the reducer
  //
  // Parameter(s):
  //
  //   accountInfo - object with fields email and password
  //


  return new Promise((resolve, reject) => {

    const data = {
      loggedIn: true,
      lastVerification: new Date()
    }

    Firebase.auth().createUserWithEmailAndPassword(accountInfo.email, accountInfo.password).then((user) => {

      resolve(user)
      dispatch(login(data))
    }).catch((err) => {

      reject(err)
      dispatch(login({loggedIn: false, lastVerification: null}))
    })
  })

}

export const logoutWithFirebase = () => {
  // Action: logoutWithFirebase, action that logs out of firebase and updates the reducer
  //
  // Parameter(s):
  //
  //   None
  //

  return (dispatch) => {

    Firebase.auth().signOut().then((error) => {
      if(error) {
        console.log(error)
      }
      else {
        console.log("Logged Out Succesfully")
      }
    })

  }
}


const login = data => ({
  type: LOG_IN,
  data
})

const logout = () => ({
  type: LOG_OUT
})

const isLoggedIn = bool => ({
  type: IS_LOGGED_IN,
  bool
})
