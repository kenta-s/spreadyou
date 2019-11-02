import axios from 'axios'
import { flashMessage } from 'redux-flash'
import {
  RECEIVE_MY_PRODUCT,
  ADD_TO_MY_PRODUCTS,
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

const addToMyProducts = payload => ({
  type: ADD_TO_MY_PRODUCTS,
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

export function postMyProduct(summary, description, url) {
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
    return instance.post(`/api/v1/my_products`, {my_product: {summary, description, url}})
      .then(response => {
        dispatch(flashMessage('プロダクトが作成されました。審査が完了するまでしばらくお待ちください。'))
        dispatch(addToMyProducts(response.data))
        return response
      })
      .catch(error => {
        dispatch(flashMessage(ERROR_MESSAGE, {isError: true}))
        return error
      })
      .then(response => {
        dispatch(finishLoading())
        return response
      })
  }
}
