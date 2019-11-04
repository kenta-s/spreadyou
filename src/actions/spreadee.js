import axios from 'axios'
import { flashMessage } from 'redux-flash'
import {
  RECEIVE_SPREADEE,
} from "../actionTypes";
import {
  ERROR_MESSAGE,
  startLoading,
  finishLoading,
} from './common'

const receiveSpreadee = payload => ({
  type: RECEIVE_SPREADEE,
  payload,
})

export function fetchSpreadee() {
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
    return instance.get(`/api/v1/spreadee`)
      .then(response => {
        dispatch(receiveSpreadee(response.data))
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
