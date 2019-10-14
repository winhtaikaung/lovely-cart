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

const makeSelectRouter = () =>
  createSelector(
    selectRoute,
    globalState => globalState.location,
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

export { selectGlobal, makeSelectRouter, makeSelectLoading, makeSelectError, makeSelectMenuItems }
