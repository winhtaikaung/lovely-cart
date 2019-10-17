import cartReducer from '../reducer'

import ActionTypes from '../constants'
import { ContainerState } from '../types'

describe('Cart Reducer test', () => {
  let state: ContainerState
  beforeEach(() => {
    state = {
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
  })

  it('should return the initial state', () => {
    const expectedResult = state
    expect(cartReducer(undefined, {} as any)).toEqual(expectedResult)
  })

  it('should return the channelon  state', () => {
    state.channelStatus = 'on'
    const expectedResult = state
    expect(cartReducer(state, { types: ActionTypes.CHANNEL_ON } as any)).toEqual(expectedResult)
  })

  it('should return the channel off  state', () => {
    state.channelStatus = 'off'
    const expectedResult = state
    expect(cartReducer(state, { types: ActionTypes.CHANNEL_OFF } as any)).toEqual(expectedResult)
  })

  it('should return the create group state', () => {
    state.channelStatus = true
    state.serverStatus = false
    state.loading = true
    const expectedResult = state
    expect(cartReducer(state, { types: ActionTypes.CREATE_GROUP } as any)).toEqual(expectedResult)
  })

  it('should return the create group success', () => {
    state.channelStatus = true
    state.payload = '123456'
    state.serverStatus = false
    state.loading = false
    const expectedResult = state
    expect(cartReducer(state, { types: ActionTypes.CREATE_GROUP_SUCCESS, payload: '123456' } as any)).toEqual(
      expectedResult,
    )
  })

  it('should return the create group error', () => {
    state.channelStatus = false
    state.serverStatus = false
    state.error = 'error'
    state.loading = true
    const expectedResult = state
    expect(cartReducer(state, { types: ActionTypes.CREATE_GROUP_ERROR, payload: 'error' } as any)).toEqual(
      expectedResult,
    )
  })

  it('should return the ack user join ', () => {
    const payload = { data: { user_id: '123456' } }
    state.channelStatus = true
    state.serverStatus = false
    state.loading = false
    state.response = payload
    const expectedResult = state
    expect(cartReducer(state, { types: ActionTypes.ACK_USER_JOIN, payload: payload } as any)).toEqual(expectedResult)
  })

  it('should return the ack user join ', () => {
    const payload = { data: { user_id: '123456' } }
    state.channelStatus = true
    state.serverStatus = false
    state.loading = false
    state.response = payload
    const expectedResult = state
    expect(cartReducer(state, { types: ActionTypes.ACK_USER_JOIN, payload: payload } as any)).toEqual(expectedResult)
  })

  it('should return the ack Add Item  ', () => {
    const payload = { data: { cartGroupID: '123456' } }
    state.channelStatus = true
    state.serverStatus = false
    state.loading = false
    state.response = payload
    const expectedResult = state
    expect(cartReducer(state, { types: ActionTypes.ACK_USER_JOIN, payload: payload } as any)).toEqual(expectedResult)
  })

  it('should return the ack Update Item  ', () => {
    const payload = { data: { cartGroupID: '123456' } }
    state.channelStatus = true
    state.serverStatus = false
    state.loading = false
    state.response = payload
    const expectedResult = state
    expect(cartReducer(state, { types: ActionTypes.ACK_ADD_ITEM, payload: payload } as any)).toEqual(expectedResult)
  })

  it('should return the ack remove Item  ', () => {
    const payload = { data: { cartGroupID: '123456' } }
    state.channelStatus = true
    state.serverStatus = false
    state.loading = false
    state.response = payload
    const expectedResult = state
    expect(cartReducer(state, { types: ActionTypes.ACK_REMOVE_ITEM, payload: payload } as any)).toEqual(expectedResult)
  })

  it('should return the ack fetchCartGroup ', () => {
    const payload = { data: { cartGroupID: '123456', users: [], cart_items: [] } }
    state.channelStatus = true
    state.serverStatus = false
    state.loading = false
    state.response = payload
    const expectedResult = state
    expect(cartReducer(state, { types: ActionTypes.ACK_FETCH_CART_GROUP, payload: payload } as any)).toEqual(
      expectedResult,
    )
  })

  it('should return the ack userLeft ', () => {
    const payload = { data: { cartGroupID: '123456', users: [], cart_items: [] }, mutatedItem: null }
    state.channelStatus = true
    state.serverStatus = false
    state.loading = false
    state.response = payload
    const expectedResult = state
    expect(cartReducer(state, { types: ActionTypes.ACK_USER_LEFT, payload: payload } as any)).toEqual(expectedResult)
  })

  it('should return the ack delete group ', () => {
    state.channelStatus = true
    state.serverStatus = false
    state.loading = false
    const expectedResult = state
    expect(cartReducer(state, { types: ActionTypes.ACK_DELETE_GROUP } as any)).toEqual(expectedResult)
  })

  it('should return the server off ', () => {
    state.serverStatus = 'off'

    const expectedResult = state
    expect(cartReducer(state, { types: ActionTypes.SERVER_OFF } as any)).toEqual(expectedResult)
  })

  it('should return the server on ', () => {
    state.serverStatus = 'on'

    const expectedResult = state
    expect(cartReducer(state, { types: ActionTypes.SERVER_ON } as any)).toEqual(expectedResult)
  })
})
