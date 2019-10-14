import ActionTypes from './constants'
import nanoid from 'nanoid'
import { IUser, ICartItem } from '../../types'

interface SocketEvents {
  type:
    | ActionTypes.CREATE_GROUP
    | ActionTypes.DELETE_GROUP
    | ActionTypes.FETCH_CART_GROUP
    | ActionTypes.USER_JOIN
    | ActionTypes.USER_LEFT
    | ActionTypes.ADD_ITEM
    | ActionTypes.UPDATE_ITEM
    | ActionTypes.REMOVE_ITEM
    | ActionTypes.CHANNEL_OFF
    | ActionTypes.CHANNEL_ON
    | ActionTypes.START_CHANNEL
    | ActionTypes.STOP_CHANNEL
    | ActionTypes.SERVER_OFF
    | ActionTypes.SERVER_ON
    | ActionTypes.ACK_CREATE_GROUP
    | ActionTypes.ACK_USER_JOIN
    | ActionTypes.ACK_ADD_ITEM
    | ActionTypes.ACK_UPDATE_ITEM
    | ActionTypes.ACK_REMOVE_ITEM
    | ActionTypes.ACK_USER_LEFT
    | ActionTypes.ACK_FETCH_CART_GROUP
    | ActionTypes.ACK_DELETE_GROUP

  payload: any
  params?: any
  callback?: (data: any) => void
}

interface CreateGroupActionTypes {
  type: ActionTypes.CREATE_GROUP | ActionTypes.CREATE_GROUP_SUCCESS | ActionTypes.CREATE_GROUP_ERROR
  endpoint: string
  method: string
  noAuth?: false
  params: any
  payload: any
  types: [ActionTypes.CREATE_GROUP, ActionTypes.CREATE_GROUP_SUCCESS, ActionTypes.CREATE_GROUP_ERROR]
  callback?: (data: any, err: any) => void
}

interface GroupActionTypes {
  type: ActionTypes.RESET_STORE
  payload: any
  params?: any
  callback?: (data?: any) => void
}

export const resetStore: (resetCallback: (data?: any) => void) => GroupActionTypes = (
  resetCallback: (data?: any) => void,
) => ({
  type: ActionTypes.RESET_STORE,
  payload: null,
  params: {
    resetUrl: window.location.origin,
  },
  callback: resetCallback,
})

export const connectSocketServer: () => SocketEvents = () => ({
  type: ActionTypes.START_CHANNEL,
  payload: null,
})

export const disconnectSocketServer: () => SocketEvents = () => ({
  type: ActionTypes.STOP_CHANNEL,
  payload: null,
})

export const createGroup: (onCreatedCallback: (data: any, err: any) => void) => CreateGroupActionTypes = (
  onCreatedCallback: (data: any, err: any) => void,
) => {
  const groupID = nanoid()
  return {
    type: ActionTypes.CREATE_GROUP,
    endpoint: `/group`,
    method: 'post',
    noAuth: false,
    payload: null,
    params: {
      cartGroupID: groupID,
      cart_items: [],
      users: [{ cartGroupID: groupID, user_id: nanoid(), is_admin: true }],
    },
    callback: onCreatedCallback,
    types: [ActionTypes.CREATE_GROUP, ActionTypes.CREATE_GROUP_SUCCESS, ActionTypes.CREATE_GROUP_ERROR],
  }
}

export const userJoinCart: (user: IUser, onUserJoin: (data: any) => void) => SocketEvents = (
  user: IUser,
  onUserJoin: (data: any) => void,
) => {
  return {
    type: ActionTypes.USER_JOIN,
    payload: null,
    params: user,
    callback: onUserJoin,
  }
}

export const userAddItemCart: (cartItem: ICartItem) => SocketEvents = (cartItem: ICartItem) => {
  return {
    type: ActionTypes.ADD_ITEM,
    payload: null,
    params: cartItem,
  }
}

export const updateCartItem: (cartItem: ICartItem) => SocketEvents = (cartItem: ICartItem) => {
  return {
    type: ActionTypes.UPDATE_ITEM,
    payload: null,
    params: cartItem,
  }
}

export const removeCartItem: (cartItem: ICartItem) => SocketEvents = (cartItem: ICartItem) => {
  return {
    type: ActionTypes.REMOVE_ITEM,
    payload: null,
    params: cartItem,
  }
}

export const userLeftGroup: (user: IUser) => SocketEvents = (user: IUser) => {
  return {
    type: ActionTypes.USER_LEFT,
    payload: null,
    params: user,
  }
}

export const deleteGroup: (user: IUser) => SocketEvents = (user: IUser) => {
  return {
    type: ActionTypes.DELETE_GROUP,
    payload: null,
    params: user,
  }
}

export const fetchCartGroup: (user: IUser) => SocketEvents = (user: IUser) => {
  return {
    type: ActionTypes.FETCH_CART_GROUP,
    payload: null,
    params: user,
  }
}
