import { Reducer, Store } from 'redux'
import { RouterState } from 'connected-react-router'
// import { ContainerState as LanguageProviderState } from 'containers/LanguageProvider/types';
import { ContainerState as AppState } from 'containers/App/types'
import { ContainerState as CartState } from 'containers/Cart/types'

export interface InjectedStore extends Store {
  injectedReducers: any
  injectedSagas: any
  runSaga(saga: (() => IterableIterator<any>) | undefined, args: any | undefined): any
}

export interface InjectReducerParams {
  key: keyof ApplicationRootState
  reducer: Reducer<any, any>
}

export interface InjectSagaParams {
  key: keyof ApplicationRootState
  saga: () => IterableIterator<any>
  mode?: string | undefined
}

// Your root reducer type, which is your redux state types also
export interface ApplicationRootState {
  readonly router: RouterState
  readonly global: AppState
  readonly cart: CartState
  readonly language: LanguageProviderState
  readonly home: HomeState
  // for testing purposes
  readonly test: any
}

export interface IUser {
  cartGroupID: string
  user_id: string
  is_admin?: boolean
  group_delete?: boolean
}

export interface ICartItem {
  item_id: string
  cartGroupID: string
  user_id: string
  item?: any
  category: string
  count: number
  remark?: string
}
export interface ICartGroup {
  cartGroupID: string
  cart_items: ICartItem[]
  users: IUser[]
}

export interface IResponse {
  data?: any
  message?: string
  code?: number
}
