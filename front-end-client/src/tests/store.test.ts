import * as history from 'react-router-dom'
import configureStore from '../configureStore'

describe('configureStore', () => {
  let store: any

  beforeAll(() => {
    store = configureStore({}, history)
  })

  describe('injectedReducers', () => {
    it('should contain an object for reducers', () => {
      expect(typeof store.injectedReducers).toBe('object')
    })
  })

  describe('injectedSagas', () => {
    it('should contain an object for sagas', () => {
      expect(typeof store.injectedSagas).toBe('object')
    })
  })

  describe('runSaga', () => {
    it('should contain a hook for `sagaMiddleware.run`', () => {
      expect(typeof store.runSaga).toBe('function')
    })
  })
})
