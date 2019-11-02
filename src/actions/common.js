import store from '../store'
import { verifyCredentials } from '../redux-token-auth-config'
import {
  LOADING_START,
  LOADING_FINISH,
} from '../actionTypes'
// import { flashMessage } from 'redux-flash'
// import { history } from "../../redux/store";

export const ERROR_MESSAGE = "サーバーエラーが発生しました"

export const startLoading = () => ({
  type: LOADING_START
})

export const finishLoading = () => ({
  type: LOADING_FINISH
})

export const signIn = async ({authToken, uid, client, expiry}) => {
  localStorage.setItem("access-token", authToken)
  localStorage.setItem("uid", uid)
  localStorage.setItem("token-type", "Bearer")
  localStorage.setItem("client", client)
  localStorage.setItem("expiry", expiry)

  return await verifyCredentials(store)
}
