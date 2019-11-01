import axios from 'axios'
import { flashMessage } from 'redux-flash'
import {
  RECEIVE_MY_PRODUCT,
} from "../actionTypes";

import {
  ERROR_MESSAGE,
  startLoading,
  finishLoading,
} from './common'

const receiveMyProduct = payload => ({
  type: RECEIVE_MY_PRODUCT,
  payload,
})

export function fetchMyProduct() {
  const instance = axios.create({
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
    return instance.get(`/api/v1/my_product`)
      .then(response => {
        dispatch(receiveMyProduct(response.data))
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
