import React from 'react'
import { hydrate } from 'react-dom'
import { ConnectedRouter } from 'connected-react-router'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import App from './containers/App'
import store from './store'
import { createBrowserHistory, createMemoryHistory } from 'history';

let history
if(isServer){
  history = createMemoryHistory();
}else{
  history = createBrowserHistory();
}
// import counterApp from './reducers'

// import store, { history } from './defaultStore'
// Grab the state from a global variable injected into the server-generated HTML
const preloadedState = window.__PRELOADED_STATE__

// Allow the passed state to be garbage-collected
delete window.__PRELOADED_STATE__

// Create Redux store with initial state
// const store = createStore(spreadyouStore, preloadedState)

hydrate(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <App />
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root')
)
