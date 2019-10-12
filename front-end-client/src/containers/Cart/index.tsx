import React, { useEffect } from 'react'
import { connectSocketServer, createGroup, userJoinCart, disconnectSocketServer } from './actions'
import { createStructuredSelector } from 'reselect'
import { Dispatch } from 'redux'
import { withRouter } from 'react-router'
import { connect } from 'react-redux'

import nanoid from 'nanoid'
import { ContainerState } from './types'
import { IUser } from '../../types'

const GroupOrderView: React.FC<ContainerState> = props => {
  const { connectSocketServer, createGroup, userJoinCart, match, disconnectSocketServer } = props
  if (match.params.groupID) {
    localStorage.setItem('groupID', match.params.groupID)
  }
  useEffect(() => {
    connectSocketServer()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <button
        onClick={() =>
          createGroup((data: any, err: any) => {
            disconnectSocketServer()
            connectSocketServer()
          })
        }
      >
        Create Group
      </button>
      <button
        onClick={() => {
          const userID = nanoid()
          userJoinCart({ cartGroupID: match.params.groupID, user_id: userID }, (params: any) => {
            localStorage.setItem('userID', params.user_id)
          })
        }}
      >
        Join User
      </button>

      {/* item_id: string;
  cartGroupID: string;
  user_id: string;
  item?: any;
  category: string;
  count: number;
  remark?: string;  */}
    </>
  )
}

const mapDispatchToProps = (dispatch: Dispatch) => ({
  connectSocketServer: () => dispatch(connectSocketServer()),
  createGroup: (callBack: (data: any, err: any) => void) => dispatch(createGroup(callBack)),
  userJoinCart: (user: IUser, callback: (data: any) => void) => dispatch(userJoinCart(user, callback)),
  disconnectSocketServer: () => dispatch(disconnectSocketServer()),
})

const mapStateToProps = createStructuredSelector({
  // currentUser: makeSelectCurrentUser(),
  // menuItems: makeSelectMenuItems(),
})

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(GroupOrderView),
)
