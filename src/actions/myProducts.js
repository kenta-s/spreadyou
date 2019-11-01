import axios from 'axios'
import { flashMessage } from 'redux-flash'
import {
  RECEIVE_MY_PRODUCTS,
} from "../actionTypes";

import {
  ERROR_MESSAGE,
  startLoading,
  finishLoading,
} from './common'

const receiveMyProducts = payload => ({
  type: RECEIVE_MY_PRODUCTS,
  payload,
})

export function fetchMyProducts() {
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
    return instance.get(`/api/v1/my_products`)
      .then(response => {
        dispatch(receiveMyProducts(response.data))
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
