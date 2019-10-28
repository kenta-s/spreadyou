import path from 'path'
import Express from 'express'
import React from 'react'
import { ConnectedRouter } from 'connected-react-router'
import { Route, Switch } from 'react-router';
import { Provider } from 'react-redux'
import { renderToString } from 'react-dom/server'
import { createStore } from "redux";
// import counterApp from './reducers'
import store from './defaultStore'
import App from './containers/App'

const app = Express()
const port = 3000

// const path = require('path')

// const staticPath = path.resolve(__dirname, 'static')
const staticPath = path.join(__dirname, 'static')
//Serve static files
// app.use('/static', Express.static('static'))
// console.log(path.resolve(__dirname, 'static'))
console.log(staticPath)
// app.use('/static', Express.static(staticPath))

// TODO: fix path
app.use('/static', Express.static('/home/kenta-s/Repositories/spreadyou/public/frontend/static'))

// This is fired every time the server side receives a request
app.use(handleRender)

// We are going to fill these out in the sections to follow
function handleRender(req, res) {
  // Create a new Redux store instance

  // Render the component to a string
  const html = renderToString(
    <Provider store={store}>
      <App />
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
        <title>Redux Universal Example</title>
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
