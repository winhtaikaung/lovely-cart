import React from 'react'
import { Provider } from 'react-redux'
import { render as rtlRender, fireEvent } from '@testing-library/react'
import configureStore from '../configureStore'
import history from '../utils/history'

export const render = (comp: React.ReactNode) => {
  const store = configureStore({}, history)
  return rtlRender(
    // tslint:disable-next-line: jsx-wrap-multiline
    <Provider store={store}>{comp}</Provider>,
  )
}
