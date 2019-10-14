import React, { useEffect } from 'react'
import {
  connectSocketServer,
  createGroup,
  userJoinCart,
  disconnectSocketServer,
  userLeftGroup,
  fetchCartGroup,
  resetStore,
  deleteGroup,
} from './actions'
import { createStructuredSelector } from 'reselect'
import { Dispatch } from 'redux'
import { withRouter } from 'react-router'
import { connect } from 'react-redux'

import nanoid from 'nanoid'
import { ContainerState } from './types'
import { IUser, ICartItem } from '../../types'
import {
  makeSelectCartItems,
  makeSelectUsers,
  makeSelectMutatedItem,
  makeSelectResponse,
  makeSelectChannelStatus,
  makeSelectLocalGroupID,
  makeSelectLocalUserID,
} from './selectors'
import CartItemPanel from '../../components/cart-item-panel'
import { GroupActionContainer } from '../../components/cart-item-panel.style'
import { GroupActionButton, CreateGroupContainer } from './cart.style'
import { Row, Col } from 'antd'

const GroupOrderView: React.FC<ContainerState> = ({
  connectSocketServer,
  createGroup,
  userJoinCart,
  match,
  userLeftGroup,
  disconnectSocketServer,
  cartItems,
  response,
  fetchCartGroup,
  users,
  localUserID,
  resetStore,
  deleteGroup,
  history,
  localCartGroupID,
}) => {
  if (match.params.groupID) {
    localStorage.setItem('groupID', match.params.groupID)
  }
  useEffect(() => {
    connectSocketServer()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  if (localCartGroupID && localUserID && !response.data) {
    fetchCartGroup({ cartGroupID: localCartGroupID, user_id: localUserID } as IUser)
  }
  const userExist = users.some((user: IUser) => user.user_id === localUserID)
  const isAdmin = users.some((user: IUser) => user.user_id === localUserID && user.is_admin)
  return (
    <>
      {userExist && (
        <>
          <CartItemPanel cartItems={cartItems} users={users} />

          <GroupActionContainer>
            {localCartGroupID && (
              <>
                Invite your cart by sending this URL
                <Row gutter={16} align="middle" type="flex" justify="center">
                  <Col span={24}>
                    <a target="_blank" rel="noopener noreferrer" href={`${window.location.origin}/${localCartGroupID}`}>
                      {window.location.origin}/{localCartGroupID}
                    </a>
                  </Col>
                </Row>
              </>
            )}
            <Row gutter={16} align="middle" type="flex" justify="center">
              <Col span={12}>
                <GroupActionButton
                  type="danger"
                  onClick={() => {
                    if (isAdmin) {
                      deleteGroup({ cartGroupID: localCartGroupID, user_id: localUserID, is_admin: true })
                      localStorage.removeItem('groupID')
                      localStorage.removeItem('userID')
                      history.push('/')
                    } else {
                      localStorage.removeItem('groupID')
                      localStorage.removeItem('userID')
                      userLeftGroup({ cartGroupID: match.params.groupID, user_id: localUserID })
                      history.push('/')
                    }
                  }}
                >
                  {isAdmin && <>Delete Group</>}
                  {!isAdmin && <>Leave Group</>}
                </GroupActionButton>
              </Col>
            </Row>
          </GroupActionContainer>
        </>
      )}

      {!userExist && !localUserID && (
        <CreateGroupContainer>
          <Row gutter={16} align="middle" type="flex" justify="center">
            <Col span={12}>
              <GroupActionButton
                type="primary"
                onClick={() => {
                  const userID = nanoid()
                  if (localCartGroupID) {
                    userJoinCart({ cartGroupID: match.params.groupID, user_id: userID }, (params: any) => {
                      localStorage.setItem('userID', params.user_id)
                    })
                  } else {
                    createGroup((data: any, err: any) => {
                      disconnectSocketServer()
                      connectSocketServer()
                    })
                  }
                }}
              >
                {localCartGroupID && <>Join Group</>}
                {!localCartGroupID && <>Create Group</>}
              </GroupActionButton>
            </Col>
            {match.params.groupID && (
              <Col span={12}>
                <GroupActionButton
                  type="primary"
                  onClick={() => {
                    localStorage.removeItem('groupID')
                    localStorage.removeItem('userID')
                    history.push('/')
                    resetStore()
                  }}
                >
                  Ignore
                </GroupActionButton>
              </Col>
            )}
          </Row>
        </CreateGroupContainer>
      )}
    </>
  )
}

const mapDispatchToProps = (dispatch: Dispatch) => ({
  connectSocketServer: () => dispatch(connectSocketServer()),
  createGroup: (callBack: (data: any, err: any) => void) => dispatch(createGroup(callBack)),
  userJoinCart: (user: IUser, callback: (data: any) => void) => dispatch(userJoinCart(user, callback)),

  userLeftGroup: (cartItem: ICartItem) => dispatch(userLeftGroup(cartItem)),
  deleteGroup: (user: IUser) => dispatch(deleteGroup(user)),
  disconnectSocketServer: () => dispatch(disconnectSocketServer()),
  fetchCartGroup: (user: IUser) => dispatch(fetchCartGroup(user)),

  resetStore: (resetCallback: (data?: any) => void) => dispatch(resetStore(resetCallback)),
})

const mapStateToProps = createStructuredSelector({
  cartItems: makeSelectCartItems(),
  users: makeSelectUsers(),
  mutatedItem: makeSelectMutatedItem(),
  originalResponse: makeSelectResponse(),
  channelStatus: makeSelectChannelStatus(),
  response: makeSelectResponse(),
  localCartGroupID: makeSelectLocalGroupID(),
  localUserID: makeSelectLocalUserID(),
})

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(GroupOrderView),
)
