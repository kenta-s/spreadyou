import { createStore, applyMiddleware, compose } from "redux";
import createRootReducer from "./reducers";
// import { verifyCredentials } from '../redux-token-auth-config'

// dummy reducer
function todos(state = [], action) {
  switch (action.type) {
    case 'ADD_TODO':
      return state.concat([action.text])
    default:
      return state
  }
}

const store = createStore(todos)

export default store
