import { ActionType } from 'typesafe-actions'
import * as actions from './actions'
import { ApplicationRootState } from 'types'
import { IResponse } from '../../types'

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
