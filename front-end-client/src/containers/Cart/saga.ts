import * as io from 'socket.io-client'
import { eventChannel } from 'redux-saga'
import { take, call, put, fork, race, cancelled, delay, all, takeLatest } from 'redux-saga/effects'
import ActionTypes from './constants'
import Notification from '../../utils/notification'
import { IResponse } from '../Order/types'
import { ICart } from './types'
import { commonSaga } from '../../middleware/api'

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
    console.log('CREATE_SOCKET_CHANNEL', `${ActionTypes.ACK_USER_JOIN}-${localStorage.getItem('groupID')}`)
    socket.on(`${ActionTypes.ACK_USER_JOIN}-${localStorage.getItem('groupID')}`, (data: any) => {
      Notification({ type: 'success', message: 'New User Joined' })
      emit(data)
    })
    return () => {
      socket.off(ActionTypes.USER_JOIN, (data: any) => {
        emit(data)
      })
    }
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
    yield put({ type: ActionTypes.SERVER_ON })

    while (true) {
      const payload = yield take(socketChannel)
      yield put({ type: ActionTypes.ACK_USER_JOIN, payload })
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
    const { param, callback } = yield take(ActionTypes.USER_JOIN)
    socket.emit(ActionTypes.USER_JOIN, param)
    callback(param)
  }
}

export default function* orderSaga() {
  yield all([startStopChannel(), takeLatest(ActionTypes.CREATE_GROUP, commonSaga)])
}
