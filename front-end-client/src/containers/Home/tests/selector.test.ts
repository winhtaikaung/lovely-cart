import {
  selectGlobal,
  makeSelectRouter,
  makeSelectLoading,
  makeSelectError,
  makeSelectMenuItems,
  // makeSelectCurrentUser,
  // makeSelectLoading,
  // makeSelectError,
  // makeSelectRepos,
  // makeSelectLocation,
} from '../selectors'

describe('selectGlobal', () => {
  it('should select the global state', () => {
    const globalState = {} as any
    const mockedState: any = {
      global: globalState,
    }
    expect(selectGlobal(mockedState)).toEqual(globalState)
  })
})

describe('make SelectLoading', () => {
  it('should select the current user', () => {
    const selectLoading = makeSelectLoading()
    const loading = false
    const mockedState: any = {
      global: {
        loading: loading,
      },
    }

    expect(selectLoading(mockedState)).toEqual(loading)
  })
})

describe('makeSelectError', () => {
  it('should select Error', () => {
    const selectError = makeSelectError()
    const error = {} as any
    const mockedState: any = {
      global: {
        error: error,
      },
    }
    expect(selectError(mockedState)).toEqual(error)
  })
})
