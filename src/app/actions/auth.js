
import Firebase from '../config/Firebase'

export const LOG_IN = "LOG_IN"
export const LOG_OUT = "LOG_OUT"
export const CREATE_ACCOUNT = "CREATE_ACCOUNT"

export const loginWithFirebase = loginInfo => {

  return (dispatch) => {
    const data = {
      loggedIn: true,
      lastVerification: 'hellowworld'
    }

    Firebase.auth().signInWithEmailAndPassword(loginInfo.username, loginInfo.password).catch((err) => {
      if(err) {
        console.log(err)
      }
      else {
        dispatch(login(data))
      }
    })

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
