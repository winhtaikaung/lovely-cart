import { takeLatest, all } from 'redux-saga/effects'
import { commonSaga } from '../../middleware/api'

import ActionTypes from './constants'

function* appSaga() {
  yield all([takeLatest(ActionTypes.LOAD_MENU_ITEMS, commonSaga)])
}

export default appSaga
