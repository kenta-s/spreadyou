import { createStore, applyMiddleware, compose } from "redux";
import createRootReducer from "./reducers";
import thunkMiddleware from "redux-thunk";
// import { createBrowserHistory } from 'history';
// import { createMemoryHistory } from 'history';
import 'history';
import { routerMiddleware } from 'connected-react-router';
import { middleware as flashMiddleware } from 'redux-flash'
import { createLogger } from "redux-logger";
import { verifyCredentials } from './redux-token-auth-config'

const loggerMiddleware = createLogger()

if(isServer){
  // export const history = history.createBrowserHistory();
  const history = 'aaaaa'
}else{
  const history = history.createBrowserHistory();
}

export history

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

verifyCredentials(store)

export default store
