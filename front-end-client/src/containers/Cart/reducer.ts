import { ContainerState, ContainerActions } from './types'
import ActionTypes from './constants'
import { IResponse } from '../../types'

// The initial state of the App
export const initialState: ContainerState = {
  response: {
    data: null,
    message: null,
    code: null,
    mutatedItem: null,
  },
  channelStatus: false,
  serverStatus: 'unknown',
  loading: false,
  error: null,
}

function orderReducer(state: ContainerState = initialState, action: ContainerActions): ContainerState {
  switch (action.type) {
    case ActionTypes.CHANNEL_ON:
      return { ...state, channelStatus: 'on' }
    case ActionTypes.CHANNEL_OFF:
      return { ...state, channelStatus: 'off', serverStatus: 'unknown' }
    case ActionTypes.CREATE_GROUP:
      return {
        ...state,
        channelStatus: true,
        serverStatus: false,
        loading: true,
      }
    case ActionTypes.RESET_STORE:
      return {
        response: initialState.response,
        channelStatus: true,
        serverStatus: false,
        loading: true,
      }

    case ActionTypes.CREATE_GROUP_SUCCESS:
      localStorage.setItem('groupID', (action.payload as IResponse).data!.cartGroupID)
      localStorage.setItem('userID', (action.payload as IResponse).data!.users[0].user_id)
      return {
        response: action.payload,
        channelStatus: false,
        serverStatus: false,
        loading: false,
      }
    case ActionTypes.CREATE_GROUP_ERROR:
      const { error } = state
      return {
        channelStatus: false,
        serverStatus: false,
        loading: false,
        error: error,
      }
    case ActionTypes.ACK_USER_JOIN:
      return {
        response: JSON.parse(action.payload),
        channelStatus: true,
        serverStatus: false,
      }

    case ActionTypes.ACK_ADD_ITEM:
      return {
        response: JSON.parse(action.payload),
        channelStatus: true,
        serverStatus: false,
      }
    case ActionTypes.ACK_UPDATE_ITEM:
      return {
        response: JSON.parse(action.payload),
        channelStatus: true,
        serverStatus: false,
      }
    case ActionTypes.ACK_REMOVE_ITEM:
      return {
        response: JSON.parse(action.payload),
        channelStatus: true,
        serverStatus: false,
      }
    case ActionTypes.ACK_FETCH_CART_GROUP:
      return {
        response: JSON.parse(action.payload),
        channelStatus: true,
        serverStatus: false,
      }
    case ActionTypes.ACK_USER_LEFT:
      return {
        ...state,
        channelStatus: true,
        serverStatus: false,
      }
    case ActionTypes.ACK_DELETE_GROUP:
      return {
        ...state,
        channelStatus: true,
        serverStatus: false,
      }
    case ActionTypes.SERVER_OFF:
      return { ...state, serverStatus: 'off' }
    case ActionTypes.SERVER_ON:
      return { ...state, serverStatus: 'on' }
    default:
      return state
  }
}

export default orderReducer
