import appReducer from '../reducer'
import { loadMenus } from '../actions'
import ActionTypes from '../constants'
import { ContainerState } from '../types'

describe('Home Reducer test', () => {
  let state: ContainerState
  beforeEach(() => {
    state = {
      loading: false,
      error: false,
      userData: {
        menu: [],
      },
    }
  })

  it('should return the initial state', () => {
    const expectedResult = state
    expect(appReducer(undefined, {} as any)).toEqual(expectedResult)
  })

  it('should return the loading menu', () => {
    state.loading = true
    const expectedResult = state
    expect(appReducer(state, loadMenus())).toEqual(expectedResult)
  })
  it('should return the load menu success', () => {
    state.loading = false
    state.userData.menu = '123456'
    const expectedResult = state
    expect(appReducer(state, { type: ActionTypes.LOAD_MENU_ITEMS_SUCCESS, payload: '123456' } as any)).toEqual(
      expectedResult,
    )
  })
  it('should return the load menu error', () => {
    state.loading = false
    state.error = 'error'
    const expectedResult = state
    expect(appReducer(state, { type: ActionTypes.LOAD_MENU_ITEMS_ERROR, payload: 'error' } as any)).toEqual(
      expectedResult,
    )
  })
})
