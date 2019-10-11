/**
 * The global state selectors
 */

import { createSelector } from 'reselect'
import { ApplicationRootState } from '../../types'

const selectGlobal = (state: ApplicationRootState) => {
  return state.global
}

const selectRoute = (state: ApplicationRootState) => {
  return state.router
}

const makeSelectCurrentUser = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.currentUser,
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

export {
  selectGlobal,
  makeSelectCurrentUser,
  makeSelectLoading,
  makeSelectError,
  makeSelectMenuItems,
  makeSelectLocation,
}
