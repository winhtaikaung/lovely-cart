import ActionTypes from './constants'
import nanoid from 'nanoid'
import { IUser, ICartGroup } from '../../types'

interface SocketEvents {
  type:
    | ActionTypes.CREATE_GROUP
    | ActionTypes.USER_JOIN
    | ActionTypes.ADD_ITEM
    | ActionTypes.REMOVE_ITEM
    | ActionTypes.CHANNEL_OFF
    | ActionTypes.CHANNEL_ON
    | ActionTypes.START_CHANNEL
    | ActionTypes.STOP_CHANNEL
    | ActionTypes.SERVER_OFF
    | ActionTypes.SERVER_ON
    | ActionTypes.ACK_CREATE_GROUP
    | ActionTypes.ACK_USER_JOIN

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

export const connectSocketServer: () => SocketEvents = () => ({
  type: ActionTypes.START_CHANNEL,
  payload: null,
})

export const disconnectSocketServer: () => SocketEvents = () => ({
  type: ActionTypes.STOP_CHANNEL,
  payload: null,
})

// export const createGroup: () => SocketEvents = () => {
//   const groupID = nanoid()

//   return {
//     type: ActionTypes.CREATE_GROUP,
//     payload: null,
//     param: {
//       cartGroupID: groupID,
//       cart_items: [],
//       users: [{ cartGroupID: groupID, user_id: nanoid(), is_admin: true }],
//     },
//   }
// }

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

export const userAddItemCart: (cartItem: ICartGroup) => SocketEvents = (cartItem: ICartGroup) => {
  return {
    type: ActionTypes.ADD_ITEM,
    payload: null,
    params: cartItem,
  }
}
