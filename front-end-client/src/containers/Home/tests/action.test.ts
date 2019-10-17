import ActionTypes from '../constants'
import { loadMenus } from '../actions'

describe('Cart Actions', () => {
  it('should return the menu action', () => {
    const expectedResult = {
      type: ActionTypes.LOAD_MENU_ITEMS,
      endpoint: `/menu`,
      method: 'get',
      noAuth: false,
      payload: null,
      types: [ActionTypes.LOAD_MENU_ITEMS, ActionTypes.LOAD_MENU_ITEMS_SUCCESS, ActionTypes.LOAD_MENU_ITEMS_ERROR],
    }

    expect(JSON.stringify(loadMenus())).toEqual(JSON.stringify(expectedResult))
  })
})
