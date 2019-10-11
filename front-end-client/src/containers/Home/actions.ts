import ActionTypes from './constants'

interface LoadMenuType {
  type: ActionTypes.LOAD_MENU_ITEMS | ActionTypes.LOAD_MENU_ITEMS_SUCCESS | ActionTypes.LOAD_MENU_ITEMS_ERROR
  endpoint: string
  method: string
  noAuth?: false
  payload: any
  types: [ActionTypes.LOAD_MENU_ITEMS, ActionTypes.LOAD_MENU_ITEMS_SUCCESS, ActionTypes.LOAD_MENU_ITEMS_ERROR]
}

export const loadMenus: () => LoadMenuType = () => ({
  type: ActionTypes.LOAD_MENU_ITEMS,
  endpoint: `/menu`,
  method: 'get',
  noAuth: false,
  payload: null,
  types: [ActionTypes.LOAD_MENU_ITEMS, ActionTypes.LOAD_MENU_ITEMS_SUCCESS, ActionTypes.LOAD_MENU_ITEMS_ERROR],
})
