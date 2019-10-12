import React, { useEffect } from 'react'
import { connectSocketServer, createGroup, userJoinCart, disconnectSocketServer } from './actions'
import { createStructuredSelector } from 'reselect'
import { Dispatch } from 'redux'
import { withRouter } from 'react-router'
import { connect } from 'react-redux'
import { ContainerState } from '../Order/types'
import { IUser } from './types'
import nanoid from 'nanoid'

const GroupOrderView: React.FC<ContainerState> = props => {
  const { connectSocketServer, createGroup, userJoinCart, match, disconnectSocketServer } = props
  console.log()
  useEffect(() => {
    connectSocketServer()
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
        onClick={() =>
          userJoinCart({ cartGroupID: match.params.groupID, user_id: nanoid() }, (data: IUser) => {
            localStorage.setItem('groupID', data.cartGroupID)
            disconnectSocketServer()
            connectSocketServer()
          })
        }
      >
        Join User
      </button>
    </>
  )
}

const mapDispatchToProps = (dispatch: Dispatch) => ({
  connectSocketServer: () => dispatch(connectSocketServer()),
  createGroup: (callBack: (data: any, err: any) => void) => dispatch(createGroup(callBack)),
  userJoinCart: (user: IUser, callback: () => void) => dispatch(userJoinCart(user, callback)),
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
