export const GET_USER_INFO = "GET_USER_INFO"
export const CLEAR_USER_INFO = "CLEAR_USER_INFO"


export const onAuthenticated = user => {
  return (dispatch) => {
    console.log(user)
    dispatch(getUserInfo(user))
  }
}


export const onUnAuthenticated = () => {

  return (dispatch) => {

    dispatch(clearUserInfo())

  }

}

const getUserInfo = user => ({
  type: GET_USER_INFO,
  user
})

const clearUserInfo = () => ({
  type: CLEAR_USER_INFO
})
