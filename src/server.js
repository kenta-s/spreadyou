import path from 'path'
import Express from 'express'
import React from 'react'
import { ConnectedRouter } from 'connected-react-router'
import { Route, Switch } from 'react-router';
import { Provider } from 'react-redux'
import { renderToString } from 'react-dom/server'
import { createStore } from "redux";
// import counterApp from './reducers'
import store, { history } from './defaultStore'
import App from './containers/App'
// import Dashboard from './containers/Dashboard/index'

const app = Express()
const port = 5000

const staticPath = path.join(__dirname, 'static')
app.use('/static', Express.static(staticPath))

// This is fired every time the server side receives a request
app.use(handleRender)

// We are going to fill these out in the sections to follow
function handleRender(req, res) {
  // Create a new Redux store instance

  // Render the component to a string
  const html = renderToString(
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <App />
      </ConnectedRouter>
    </Provider>
  )

  // Grab the initial state from our Redux store
  const preloadedState = store.getState()

  // Send the rendered page back to the client
  res.send(renderFullPage(html, preloadedState))
}

function renderFullPage(html, preloadedState) {
  return `
    <!doctype html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
        <title>スプレジュ</title>
      </head>
      <body>
        <div id="root">${html}</div>
        <script>
          // WARNING: See the following for security issues around embedding JSON in HTML:
          // http://redux.js.org/recipes/ServerRendering.html#security-considerations
          window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState).replace(
            /</g,
            '\\u003c'
          )}
        </script>
        <script src=${`./static/bundle.js`}></script>
      </body>
    </html>
  `
}

app.listen(port)
