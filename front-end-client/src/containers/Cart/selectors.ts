/**
 * The global state selectors
 */

import { createSelector } from 'reselect'
import { ApplicationRootState } from '../../types'

const selectGlobal = (state: ApplicationRootState) => {
  return state.cart
}

const makeSelectResponse = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.response,
  )

const makeSelectLoading = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.loading,
  )

const makeSelectError = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.error,
  )

const makeSelectCartGroupID = () =>
  createSelector(
    selectGlobal,
    globalState => {
      return globalState.response.data ? globalState.response.data.cartGroupID : ''
    },
  )
const makeSelectCartItems = () =>
  createSelector(
    selectGlobal,
    globalState => {
      return globalState.response.data ? globalState.response.data.cart_items : []
    },
  )
const makeSelectUsers = () =>
  createSelector(
    selectGlobal,
    globalState => {
      return globalState.response.data ? globalState.response.data.users : []
    },
  )
const makeSelectMutatedItem = () =>
  createSelector(
    selectGlobal,
    globalState => {
      return globalState.response.mutatedItem
    },
  )

const makeSelectResponseCode = () =>
  createSelector(
    selectGlobal,
    globalState => {
      return globalState.response.code
    },
  )
const makeSelectMessage = () =>
  createSelector(
    selectGlobal,
    globalState => {
      return globalState.response.message
    },
  )

const makeSelectChannelStatus = () =>
  createSelector(
    selectGlobal,
    globalState => {
      return globalState.channelStatus
    },
  )

const selectLocalGroupID = () => {
  return localStorage.getItem('groupID') || ''
}

const makeSelectLocalGroupID = () =>
  createSelector(
    selectLocalGroupID,
    localGroupID => localGroupID,
  )

const selectLocalUserID = () => {
  return localStorage.getItem('userID') || ''
}

const makeSelectLocalUserID = () =>
  createSelector(
    selectLocalUserID,
    localUserID => localUserID,
  )

export {
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
}
