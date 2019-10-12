import { ActionType } from 'typesafe-actions'
import * as actions from './actions'
import { ApplicationRootState } from 'types'

/* --- STATE --- */

interface AppState {
  readonly response: IResponse
  readonly channelStatus: string
  readonly serverStatus: string
  readonly loading: boolean
  readonly error: object | boolean
  // readonly currentUser: string
  // readonly userData: UserData
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
export interface ICart {
  cartGroupID: string
  cart_items: ICartItem[]
  users: IUser[]
}

export interface IResponse {
  data?: ICart | IUser
  message?: string
  code?: number
}

interface UserData {
  readonly menu: object | boolean // too many fields. Won't declare them all
}

/* --- ACTIONS --- */
type AppActions = ActionType<typeof actions>

/* --- EXPORTS --- */

type RootState = ApplicationRootState
type ContainerState = RouteComponentProps<any, StaticContext, any> & {
  children?: ReactNode
}
type ContainerActions = AppActions

export { RootState, ContainerState, ContainerActions }
