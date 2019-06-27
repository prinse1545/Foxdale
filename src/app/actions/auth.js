
import Firebase from '../config/Firebase'

export const LOG_IN = "LOG_IN"
export const LOG_OUT = "LOG_OUT"
export const IS_LOGGED_IN = "IS_LOGGED_IN"
export const CREATE_ACCOUNT = "CREATE_ACCOUNT"

export const loginWithFirebase = loginInfo => (dispatch) => {

  return new Promise((resolve, reject) => {
    const data = {
      loggedIn: true,
      lastVerification: new Date()
    }
    console.log(data)
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

  return (dispatch) => {
    const user = Firebase.auth();

    console.log(user)
  }
}

export const createAccountWithFirebase = accountInfo => {


  Firebase.auth().createUserWithEmailAndPassword(accountInfo.email, accountInfo.password).catch((error) => {

    if(error) {
      console.log(error)
    }
    else{
      console.log("AYY")
    }
  })

}

export const logoutWithFirebase = () => {
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
