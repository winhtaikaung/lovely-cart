import * as io from 'socket.io-client'
import { eventChannel } from 'redux-saga'
import { take, call, put, fork, race, cancelled, delay, all, takeLatest } from 'redux-saga/effects'
import ActionTypes from './constants'
import Notification from '../../utils/notification'
import { commonSaga } from '../../middleware/api'
import { IResponse, ICartGroup } from '../../types'
import { selectLocalGroupID, selectLocalUserID } from './selectors'

// wrapping functions for socket events (connect, disconnect, reconnect)
const socketServerURL = 'http://localhost:3002'

let socket: SocketIOClient.Socket
const connect = () => {
  socket = io.connect(socketServerURL)
  return new Promise(resolve => {
    socket.on('connect', () => {
      resolve(socket)
    })
  })
}

const disconnect = () => {
  socket = io.connect(socketServerURL)
  return new Promise(resolve => {
    socket.on('disconnect', () => {
      resolve(socket)
    })
  })
}

const reconnect = () => {
  socket = io.connect(socketServerURL)
  return new Promise(resolve => {
    socket.on('reconnect', () => {
      resolve(socket)
    })
  })
}

// This is how channel is created
const createSocketChannel = (socket: any) =>
  eventChannel(emit => {
    const localGroupID = selectLocalGroupID()
    const localuserID = selectLocalUserID()
    socket.on(`${ActionTypes.ACK_USER_JOIN}-${selectLocalGroupID()}`, (data: any) => {
      const cartGroup: ICartGroup = (JSON.parse(data) as IResponse).data
      const lastJoinUser = cartGroup.users.pop()
      if (lastJoinUser && lastJoinUser.user_id !== localuserID) {
        Notification({ type: 'success', message: `${lastJoinUser.user_id} joined to group` })
      }

      emit(data)
    })
    console.log('CREATE_SOCKET_CHANNEL', `${ActionTypes.ACK_ADD_ITEM}-${selectLocalGroupID()}`)
    socket.on(`${ActionTypes.ACK_ADD_ITEM}-${localGroupID}`, (data: any) => {
      // const cartGroup: ICartGroup = (JSON.parse(data) as IResponse).data
      // const lastAddedItem = cartGroup.cart_items.pop()
      // if (lastAddedItem && lastAddedItem.user_id !== localuserID) {
      //   Notification({ type: 'success', message: 'New Item added' })
      // }
      const cartGroup: IResponse = JSON.parse(data) as IResponse
      const updatedUser = cartGroup.mutatedItem.user_id
      if (updatedUser === localuserID) {
        Notification({ type: 'success', message: 'Item successfully updated' })
      } else {
        Notification({ type: 'success', message: `${updatedUser} add ${cartGroup.mutatedItem.item.name} to cart` })
      }

      emit(data)
    })

    socket.on(`${ActionTypes.ACK_UPDATE_ITEM}-${localGroupID}`, (data: any) => {
      const cartGroup: IResponse = JSON.parse(data) as IResponse
      const updatedUser = cartGroup.mutatedItem.user_id
      if (updatedUser === localuserID) {
        Notification({ type: 'success', message: 'Item successfully updated' })
      }
      emit(data)
    })

    socket.on(`${ActionTypes.ACK_REMOVE_ITEM}-${localGroupID}`, (data: any) => {
      const cartGroup: IResponse = JSON.parse(data) as IResponse
      const updatedUser = cartGroup.mutatedItem.user_id
      if (updatedUser === localuserID) {
        Notification({ type: 'success', message: 'Item successfully removed' })
      }
      emit(data)
    })

    socket.on(`${ActionTypes.ACK_USER_LEFT}-${localGroupID}`, (data: any) => {
      const cartGroup: ICartGroup = (JSON.parse(data) as IResponse).data
      const userExist = cartGroup.users.find(user => user.user_id === localuserID)
      if (userExist) {
        Notification({ type: 'info', message: 'User Left' })
      } else {
        Notification({ type: 'info', message: 'You have left the group!' })
        localStorage.clear()
      }
      emit(data)
    })

    socket.on(`${ActionTypes.ACK_FETCH_CART_GROUP}-${localGroupID}`, (data: any) => {
      emit(data)
    })

    return () => {}
  })

// connection monitoring sagas
const listenDisconnectSaga = function*() {
  while (true) {
    yield call(disconnect)
    yield put({ type: ActionTypes.SERVER_OFF })
  }
}

const listenConnectSaga = function*() {
  while (true) {
    yield call(reconnect)
    yield put({ type: ActionTypes.SERVER_ON })
  }
}

// Saga to switch on channel.
const listenServerSaga = function*() {
  try {
    yield put({ type: ActionTypes.CHANNEL_ON })
    const { timeout } = yield race({
      connected: call(connect),
      timeout: delay(2000),
    })
    if (timeout) {
      yield put({ type: ActionTypes.SERVER_OFF })
    }
    const socket = yield call(connect)

    const socketChannel = yield call(createSocketChannel, socket)

    yield fork(listenDisconnectSaga)
    yield fork(listenConnectSaga)
    yield fork(userJoin, socket)
    yield fork(addCartItem, socket)
    yield fork(updateCartItem, socket)
    yield fork(removeCartItem, socket)
    yield fork(userLeftGroup, socket)
    yield fork(fetchCartGroup, socket)
    yield put({ type: ActionTypes.SERVER_ON })

    while (true) {
      const payload = yield take(socketChannel)
      yield put({ type: ActionTypes.ACK_USER_JOIN, payload })
      yield put({ type: ActionTypes.ACK_ADD_ITEM, payload })
      yield put({ type: ActionTypes.ACK_UPDATE_ITEM, payload })
      yield put({ type: ActionTypes.ACK_REMOVE_ITEM, payload })
      yield put({ type: ActionTypes.ACK_USER_LEFT, payload })
      yield put({ type: ActionTypes.ACK_FETCH_CART_GROUP, payload })
    }
  } catch (error) {
    console.log(error)
  } finally {
    if (yield cancelled()) {
      socket.disconnect()
      yield put({ type: ActionTypes.CHANNEL_OFF })
    }
  }
}

// saga listens for start and stop actions
export const startStopChannel = function*() {
  while (true) {
    yield take(ActionTypes.START_CHANNEL)

    yield race({
      task: call(listenServerSaga),
      cancel: take(ActionTypes.STOP_CHANNEL),
    })
  }
}

export function* userJoin(socket: SocketIOClient.Socket) {
  // Select username from store

  while (true) {
    const { params, callback } = yield take(ActionTypes.USER_JOIN)
    socket.emit(ActionTypes.USER_JOIN, params)
    console.log('USER_JOIN_SAGA', params)
    callback(params)
  }
}

export function* addCartItem(socket: SocketIOClient.Socket) {
  while (true) {
    const { params } = yield take(ActionTypes.ADD_ITEM)
    socket.emit(ActionTypes.ADD_ITEM, params)
  }
}

export function* updateCartItem(socket: SocketIOClient.Socket) {
  while (true) {
    const { params } = yield take(ActionTypes.UPDATE_ITEM)
    socket.emit(ActionTypes.UPDATE_ITEM, params)
  }
}

export function* removeCartItem(socket: SocketIOClient.Socket) {
  while (true) {
    const { params } = yield take(ActionTypes.REMOVE_ITEM)
    socket.emit(ActionTypes.REMOVE_ITEM, params)
  }
}

export function* userLeftGroup(socket: SocketIOClient.Socket) {
  while (true) {
    const { params } = yield take(ActionTypes.USER_LEFT)
    socket.emit(ActionTypes.USER_LEFT, params)
  }
}
export function* fetchCartGroup(socket: SocketIOClient.Socket) {
  while (true) {
    const { params } = yield take(ActionTypes.FETCH_CART_GROUP)
    socket.emit(ActionTypes.FETCH_CART_GROUP, params)
  }
}

export default function* orderSaga() {
  yield all([startStopChannel(), takeLatest(ActionTypes.CREATE_GROUP, commonSaga)])
}
