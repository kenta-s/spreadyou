import { createStore, applyMiddleware, compose } from "redux";
import createRootReducer from "./reducers";
import thunkMiddleware from "redux-thunk";
import { createMemoryHistory } from 'history';
import { routerMiddleware } from 'connected-react-router';
import { middleware as flashMiddleware } from 'redux-flash'
import { createLogger } from "redux-logger";
// import { verifyCredentials } from './redux-token-auth-config'

const loggerMiddleware = createLogger()
export const history = createMemoryHistory();
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

// verifyCredentials(store)

export default store
