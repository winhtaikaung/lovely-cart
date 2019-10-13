import React, { useEffect } from 'react'
import {
  connectSocketServer,
  createGroup,
  userJoinCart,
  updateCartItem,
  disconnectSocketServer,
  userAddItemCart,
  removeCartItem,
  userLeftGroup,
  fetchCartGroup,
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

const cartItem = {
  id: 661,
  byline: 'dark chocolate with tasting notes of sun maid raisins and cashew nuts',
  description:
    'If Anaimalai 72% Dark is a human being, we would describe him or her as bright and cheery. It is chocolatey, with a pop of nutty flavour and natural sweetness of golden, sun maid raisins. One piece of this chocolate can lift your mood instantly. ',
  price: 5.95,
  temperature: 'Chilled',
  category: 'dessert',
  ingredients: 'cacao nibs, cocoa butter, unrefined cane sugar',
  nutritions: { calories: '180', fat: '11g', carb: '17g', protein: '2g' },
  horizontal_image_url:
    'https://storage.googleapis.com/spineproduction/uploads/recipe/horizontal_image/611/BENNS_ANAIMALAI.jpg',
  retina_image_url:
    'https://storage.googleapis.com/spineproduction/uploads/recipe/horizontal_image/611/retina_BENNS_ANAIMALAI.jpg',
  tag_list: 'antioxidant-rich, vegan',
  name: 'Benns Anaimalai 72% Dark Chocolate',
  feedback_rating: null,
  feedback_rating_count: 15,
  price_cents: 595,
  vertical_image_url:
    'https://storage.googleapis.com/spineproduction/uploads/recipe/vertical_image/611/benns_anaimalai__1_.jpg',
}
const GroupOrderView: React.FC<ContainerState> = ({
  connectSocketServer,
  createGroup,
  userJoinCart,
  userAddItemCart,
  updateCartItem,
  removeCartItem,
  match,
  userLeftGroup,
  disconnectSocketServer,
  cartItems,
  response,
  fetchCartGroup,
  users,
  localUserID,
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

  return (
    <>
      <CartItemPanel cartItems={cartItems} users={users} />
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
      <button
        onClick={() => {
          userLeftGroup({ cartGroupID: match.params.groupID, user_id: localUserID })
        }}
      >
        User Left
      </button>

      <button
        onClick={() => {
          const userID = localUserID
          const itemID = nanoid()
          userAddItemCart({
            cartGroupID: match.params.groupID || localCartGroupID,
            user_id: userID || '',
            item_id: itemID,
            item: cartItem,
            category: 'dessert',
            count: 10,
          })
        }}
      >
        Add Item
      </button>
      <button
        onClick={() => {
          const userID = localUserID
          updateCartItem({
            cartGroupID: match.params.groupID || localCartGroupID,
            user_id: userID || '',
            item_id: 'FRp1SA2mozPs8Nx6bPuDB',
            item: cartItem,
            category: 'dessert',
            count: 1000,
          })
        }}
      >
        Update Item
      </button>

      <button
        onClick={() => {
          const userID = localUserID
          removeCartItem({
            cartGroupID: match.params.groupID || localCartGroupID,
            user_id: userID || '',
            item_id: 'CIWV29DmSRcYxI31kXEiu',
            item: cartItem,
            category: 'dessert',
            count: 1000,
          })
        }}
      >
        Remove Item
      </button>
    </>
  )
}

const mapDispatchToProps = (dispatch: Dispatch) => ({
  connectSocketServer: () => dispatch(connectSocketServer()),
  createGroup: (callBack: (data: any, err: any) => void) => dispatch(createGroup(callBack)),
  userJoinCart: (user: IUser, callback: (data: any) => void) => dispatch(userJoinCart(user, callback)),

  userAddItemCart: (cartItem: ICartItem) => dispatch(userAddItemCart(cartItem)),
  updateCartItem: (cartItem: ICartItem) => dispatch(updateCartItem(cartItem)),
  removeCartItem: (cartItem: ICartItem) => dispatch(removeCartItem(cartItem)),
  userLeftGroup: (cartItem: ICartItem) => dispatch(userLeftGroup(cartItem)),
  disconnectSocketServer: () => dispatch(disconnectSocketServer()),
  fetchCartGroup: (user: IUser) => dispatch(fetchCartGroup(user)),
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
