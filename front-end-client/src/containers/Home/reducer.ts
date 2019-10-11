import { ContainerState, ContainerActions } from './types'
import ActionTypes from './constants'

// The initial state of the App
export const initialState: ContainerState = {
  loading: false,
  error: false,
  currentUser: '',
  userData: {
    menu: [],
  },
}

function appReducer(state: ContainerState = initialState, action: ContainerActions): ContainerState {
  console.log(action)
  switch (action.type) {
    case ActionTypes.LOAD_MENU_ITEMS:
      return {
        currentUser: state.currentUser,
        loading: true,
        error: false,
        userData: {
          menu: [],
        },
      }
    case ActionTypes.LOAD_MENU_ITEMS_SUCCESS:
      return {
        currentUser: action.payload,
        loading: false,
        error: state.error,
        userData: {
          menu: action.payload,
        },
      }
    case ActionTypes.LOAD_MENU_ITEMS_ERROR:
      const { error, loading, ...rest } = state
      return {
        error: action.payload,
        loading: false,
        ...rest,
      }
    default:
      return state
  }
}

export default appReducer
