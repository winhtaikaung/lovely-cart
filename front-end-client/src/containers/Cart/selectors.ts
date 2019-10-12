/**
 * The global state selectors
 */

import { createSelector } from 'reselect'
import { ApplicationRootState } from '../../types'

const selectGlobal = (state: ApplicationRootState) => {
  return state.cart
}

const selectRoute = (state: ApplicationRootState) => {
  return state.router
}

const makeSelectCurrentUser = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.currentUser,
  )

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
      return globalState.response.data.cartGroupID
    },
  )
const makeSelectMenuItems = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.userData.menu,
  )

const makeSelectLocation = () =>
  createSelector(
    selectRoute,
    routeState => routeState.location,
  )

export { selectGlobal, makeSelectResponse }
