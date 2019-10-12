/**
 * Create the store with dynamic reducers
 */

import { createStore, applyMiddleware, compose } from 'redux'
import { routerMiddleware } from 'connected-react-router'
import createSagaMiddleware from 'redux-saga'
import createReducer from './reducers'
import { InjectedStore } from './types'
import logger from 'redux-logger'
import appSaga from './containers/Home/saga'
import orderSaga from './containers/Cart/saga'

declare interface IWindow extends Window {
  __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: any // redux-dev-tools definitions not needed
}
declare const window: IWindow

export default function configureStore(initialState = {}, history: any) {
  let composeEnhancers = compose
  const reduxSagaMonitorOptions = {}

  // If Redux Dev Tools and Saga Dev Tools Extensions are installed, enable them
  /* istanbul ignore next */
  if (process.env.NODE_ENV !== 'production' && typeof window === 'object') {
    if (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) {
      composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    }

    // NOTE: Uncomment the code below to restore support for Redux Saga
    // Dev Tools once it supports redux-saga version 1.x.x
    // if (window.__SAGA_MONITOR_EXTENSION__)
    //   reduxSagaMonitorOptions = {
    //     sagaMonitor: window.__SAGA_MONITOR_EXTENSION__,
    //   };
  }

  const sagaMiddleware = createSagaMiddleware(reduxSagaMonitorOptions)

  // Create the store with two middlewares
  // 1. sagaMiddleware: Makes redux-sagas work
  // 2. routerMiddleware: Syncs the location/URL path to the state

  let tempMiddleWare
  if (process.env.NODE_ENV !== 'production') {
    tempMiddleWare = [sagaMiddleware, routerMiddleware(history), logger]
  } else {
    tempMiddleWare = [sagaMiddleware, routerMiddleware(history)]
  }

  const middlewares = tempMiddleWare

  const enhancers = [applyMiddleware(...middlewares)]

  const store = createStore(createReducer(), initialState, composeEnhancers(...enhancers)) as InjectedStore

  // Extensions

  /* tslint:disable */
  //@ts-ignore
  store.runSaga = sagaMiddleware.run

  /* tslint:enable */
  store.injectedReducers = {} // Reducer registry
  store.injectedSagas = {} // Saga registry
  //@ts-ignore
  store.runSaga(appSaga)
  //@ts-ignore
  store.runSaga(orderSaga)

  // Make reducers hot reloadable, see http://mxs.is/googmo
  /* istanbul ignore next */
  //@ts-ignore
  if (module['hot']) {
    //@ts-ignore
    module['hot'].accept('./reducers', () => {
      store.replaceReducer(createReducer(store.injectedReducers))
    })
  }

  return store
}
