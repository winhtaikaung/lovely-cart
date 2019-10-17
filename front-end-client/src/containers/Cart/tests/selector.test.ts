import {
  selectGlobal,
  makeSelectResponse,
  makeSelectCartItems,
  makeSelectUsers,
  makeSelectCartGroupID,
  makeSelectMutatedItem,
  makeSelectChannelStatus,
  makeSelectLocalGroupID,
  makeSelectLocalUserID,
  selectLocalUserID,
  selectLocalGroupID,
  makeSelectLoading,
  makeSelectResponseCode,
  makeSelectMessage,
  makeSelectError,
} from '../selectors'

describe('selectGlobal', () => {
  it('should select the global state', () => {
    const globalState = {} as any
    const mockedState: any = {
      cart: globalState,
    }
    expect(selectGlobal(mockedState)).toEqual(globalState)
  })
})

describe('make SelectLoading', () => {
  it('should select the current user', () => {
    const selectLoading = makeSelectLoading()
    const loading = false
    const mockedState: any = {
      cart: {
        loading: loading,
      },
    }

    expect(selectLoading(mockedState)).toEqual(loading)
  })
})

describe('makeSelectCartGroupID', () => {
  it('should select cart group id', () => {
    const selectCartGroupID = makeSelectCartGroupID()
    const cartGroupID = '123123'
    const mockedState: any = {
      cart: {
        response: {
          data: {
            cartGroupID: cartGroupID,
          },
        },
      },
    }

    expect(selectCartGroupID(mockedState)).toEqual(cartGroupID)
  })
})

describe('makeSelectCartItems', () => {
  it('should select cart Items', () => {
    const selectCartItems = makeSelectCartItems()
    const cartItems = [1, 2, 3, 4, 5]
    const mockedState: any = {
      cart: {
        response: {
          data: {
            cart_items: cartItems,
          },
        },
      },
    }

    expect(selectCartItems(mockedState)).toEqual(cartItems)
    expect(selectCartItems(mockedState)).toHaveLength(5)
  })
})

describe('makeSelectUsers', () => {
  it('should select users', () => {
    const selectUsers = makeSelectUsers()
    const users = [1, 2, 3, 4, 5]
    const mockedState: any = {
      cart: {
        response: {
          data: {
            users: users,
          },
        },
      },
    }

    expect(selectUsers(mockedState)).toEqual(users)
    expect(selectUsers(mockedState)).toHaveLength(5)
  })
})

describe('makeSelectMutated Items', () => {
  it('should select mutated items', () => {
    const selectMutatedItem = makeSelectMutatedItem()
    const mutatedItem = {} as any
    const mockedState: any = {
      cart: {
        response: {
          mutatedItem: mutatedItem,
        },
      },
    }

    expect(selectMutatedItem(mockedState)).toEqual(mutatedItem)
  })
})

describe('makeSelectResponseCode', () => {
  it('should select mutated items', () => {
    const selectResponseCode = makeSelectResponseCode()
    const code = '101' as any
    const mockedState: any = {
      cart: {
        response: {
          code: code,
        },
      },
    }

    expect(selectResponseCode(mockedState)).toEqual(code)
  })
})

describe('makeSelectMessage', () => {
  it('should select message ', () => {
    const selectMessage = makeSelectMessage()
    const message = 'hello as a string'
    const mockedState: any = {
      cart: {
        response: {
          message: message,
        },
      },
    }

    expect(selectMessage(mockedState)).toEqual(message)
  })
})

describe('makeSelectChannelStatus', () => {
  it('should select channel status ', () => {
    const selectChannelStatus = makeSelectChannelStatus()
    const status = 'on'
    const mockedState: any = {
      cart: {
        channelStatus: status,
      },
    }

    expect(selectChannelStatus(mockedState)).toEqual(status)
  })
})

describe('makeSelectError', () => {
  it('should select Error', () => {
    const selectError = makeSelectError()
    const error = {} as any
    const mockedState: any = {
      cart: {
        error: error,
      },
    }
    expect(selectError(mockedState)).toEqual(error)
  })
})
