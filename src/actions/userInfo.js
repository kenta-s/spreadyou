import axios from 'axios'
import { flashMessage } from 'redux-flash'
import {
  RECEIVE_USER_INFO,
} from "../actionTypes";

import {
  ERROR_MESSAGE,
  startLoading,
  finishLoading,
} from './common'

const receiveUserInfo = payload => ({
  type: RECEIVE_USER_INFO,
  payload,
})

export function fetchUserInfo() {
  const instance = axios.create({
    baseURL: 'http://localhost:3000',
    headers: {
      "access-token": localStorage.getItem('access-token'),
      "token-type":   "Bearer",
      "client":       localStorage.getItem('client'),
      "expiry":       localStorage.getItem('expiry'),
      "uid":          localStorage.getItem('uid')
    }
  })

  return dispatch => {
    dispatch(startLoading())
    return instance.get(`/api/v1/current_user`)
      .then(response => {
        dispatch(receiveUserInfo(response.data))
        return response
      })
      .catch(() => {
        return dispatch(flashMessage(ERROR_MESSAGE, {isError: true}))
      })
      .then(response => {
        dispatch(finishLoading())
        return response
      })
  }
}
