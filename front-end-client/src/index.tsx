import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './containers/App'
import * as serviceWorker from './serviceWorker'
import configureStore from './configureStore'
import history from './utils/history'
import { Provider } from 'react-redux'
import { Switch } from 'react-router-dom'
import { ConnectedRouter } from 'connected-react-router'

const initialState = {}
const store = configureStore(initialState, history)
const MOUNT_NODE = document.getElementById('root') as HTMLElement

const render = () =>
  ReactDOM.render(
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <Switch>
          <App />
        </Switch>
      </ConnectedRouter>
    </Provider>,
    MOUNT_NODE,
  )

render()
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
