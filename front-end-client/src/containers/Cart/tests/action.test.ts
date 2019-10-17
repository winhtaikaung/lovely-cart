import ActionTypes from '../constants'
import {
  resetStore,
  connectSocketServer,
  disconnectSocketServer,
  userJoinCart,
  userAddItemCart,
  updateCartItem,
  removeCartItem,
  userLeftGroup,
  deleteGroup,
  fetchCartGroup,
} from '../actions'

describe('App Actions', () => {
  it('should return the resetStore type', () => {
    const callback = jest.fn()

    const expectedResult = {
      type: ActionTypes.RESET_STORE,
      payload: null,
      params: {
        resetUrl: 'http://localhost',
      },
      callback: callback,
    }

    expect(JSON.stringify(resetStore(callback))).toEqual(JSON.stringify(expectedResult))
  })

  it('should return the connect to server type', () => {
    const expectedResult = {
      type: ActionTypes.START_CHANNEL,
      payload: null,
    }

    expect(JSON.stringify(connectSocketServer())).toEqual(JSON.stringify(expectedResult))
  })

  it('should return the disconnect from server type', () => {
    const expectedResult = {
      type: ActionTypes.STOP_CHANNEL,
      payload: null,
    }

    expect(JSON.stringify(disconnectSocketServer())).toEqual(JSON.stringify(expectedResult))
  })

  it('should return the userJoin action  ', () => {
    const user = { user_id: '123456', cartGroupID: '09876543' }
    const callback = jest.fn()
    const expectedResult = {
      type: ActionTypes.USER_JOIN,
      payload: null,
      params: user,
      callback: callback,
    }

    expect(JSON.stringify(userJoinCart(user, callback))).toEqual(JSON.stringify(expectedResult))
  })

  it('should return the userLeft action  ', () => {
    const user = { user_id: '123456', cartGroupID: '09876543' }
    const callback = jest.fn()
    const expectedResult = {
      type: ActionTypes.USER_LEFT,
      payload: null,
      params: user,
      callback: callback,
    }

    expect(JSON.stringify(userLeftGroup(user))).toEqual(JSON.stringify(expectedResult))
  })

  it('should return the deleteGroup Action  ', () => {
    const user = { user_id: '123456', cartGroupID: '09876543' }
    const callback = jest.fn()
    const expectedResult = {
      type: ActionTypes.DELETE_GROUP,
      payload: null,
      params: user,
      callback: callback,
    }

    expect(JSON.stringify(deleteGroup(user))).toEqual(JSON.stringify(expectedResult))
  })

  it('should return the fetchCartGroup Action  ', () => {
    const user = { user_id: '123456', cartGroupID: '09876543' }
    const callback = jest.fn()
    const expectedResult = {
      type: ActionTypes.FETCH_CART_GROUP,
      payload: null,
      params: user,
      callback: callback,
    }

    expect(JSON.stringify(fetchCartGroup(user))).toEqual(JSON.stringify(expectedResult))
  })

  it('should return the userAddItemCart action  ', () => {
    const item = {
      item_id: '123456',
      cartGroupID: '09876543',
      user_id: '1234567',
      item: null,
      category: 'dessert',
      count: 1,
    }
    const callback = jest.fn()
    const expectedResult = {
      type: ActionTypes.ADD_ITEM,
      payload: null,
      params: item,
      callback: callback,
    }

    expect(JSON.stringify(userAddItemCart(item))).toEqual(JSON.stringify(expectedResult))
  })

  it('should return the updateCartItem action  ', () => {
    const item = {
      item_id: '123456',
      cartGroupID: '09876543',
      user_id: '1234567',
      item: null,
      category: 'dessert',
      count: 1,
    }
    const callback = jest.fn()
    const expectedResult = {
      type: ActionTypes.UPDATE_ITEM,
      payload: null,
      params: item,
      callback: callback,
    }

    expect(JSON.stringify(updateCartItem(item))).toEqual(JSON.stringify(expectedResult))
  })

  it('should return the removeCartItem action  ', () => {
    const item = {
      item_id: '123456',
      cartGroupID: '09876543',
      user_id: '1234567',
      item: null,
      category: 'dessert',
      count: 1,
    }
    const callback = jest.fn()
    const expectedResult = {
      type: ActionTypes.REMOVE_ITEM,
      payload: null,
      params: item,
      callback: callback,
    }

    expect(JSON.stringify(removeCartItem(item))).toEqual(JSON.stringify(expectedResult))
  })
})
