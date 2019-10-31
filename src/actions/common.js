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
