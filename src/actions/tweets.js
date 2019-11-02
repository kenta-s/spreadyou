import axios from 'axios'
import { flashMessage } from 'redux-flash'
import {
  RECEIVE_TWEETS,
  TWEETED_SPREADEE,
} from "../actionTypes";

import {
  ERROR_MESSAGE,
  startLoading,
  finishLoading,
} from './common'

const receiveTweets = payload => ({
  type: RECEIVE_TWEETS,
  payload,
})

const tweeted = () => ({
  type: TWEETED_SPREADEE,
})

export function fetchTweets() {
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
    return instance.get(`/api/v1/tweets`)
      .then(response => {
        dispatch(receiveTweets(response.data))
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

export function postTweet(productId, content) {
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
    return instance.post(`/api/v1/tweets`, {tweet: {product_id: productId, content}})
      .then(response => {
        dispatch(flashMessage('リクエストがキューに登録されました。ツイートされるまで時間が掛かることがあります。'))
        dispatch(tweeted())
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
