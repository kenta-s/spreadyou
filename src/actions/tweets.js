import {
  RECEIVE_TWEETS,
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
