import { createStore, applyMiddleware, compose } from "redux";
import createRootReducer from "./reducers";
import thunkMiddleware from "redux-thunk";
import { routerMiddleware } from 'connected-react-router';
import { middleware as flashMiddleware } from 'redux-flash'
import { createLogger } from "redux-logger";
import { verifyCredentials } from './redux-token-auth-config'
import { createBrowserHistory, createMemoryHistory } from 'history';

let history
if(isServer){
  history = createMemoryHistory();
}else{
  history = createBrowserHistory();
}

const loggerMiddleware = createLogger()
const flashOptions = { timeout: 3000 }

const store = createStore(
  createRootReducer(history),
  compose(
    applyMiddleware(
      routerMiddleware(history),
      thunkMiddleware,
      loggerMiddleware,
      flashMiddleware(flashOptions),
    )
  )
);

if(!isServer){
  verifyCredentials(store)
}

export default store
