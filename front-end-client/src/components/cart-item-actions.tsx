import React from 'react'
import { Row, Col, Button, Tooltip, Input } from 'antd'
import { ICartItem } from '../types'
import { updateCartItem, removeCartItem } from '../containers/Cart/actions'
import { makeSelectLocalGroupID, makeSelectLocalUserID } from '../containers/Cart/selectors'
import { createStructuredSelector } from 'reselect'
import { Dispatch } from 'redux'
import { connect } from 'react-redux'

interface ICartItemAction {
  cartItem: ICartItem
  localUserID: string
  updateCartItem: (cartItem: ICartItem) => void
  removeCartItem: (cartItem: ICartItem) => void
  localCartGroupID: string
}

const CartItemAction: React.FC<ICartItemAction> = ({
  cartItem,
  localUserID,
  updateCartItem,
  removeCartItem,
  localCartGroupID,
}) => {
  const [itemCount, setItemCount] = React.useState<string>(`${cartItem.count}`)
  return (
    <Row gutter={16} type="flex" justify="start" align="middle">
      <Col span={6}>
        <strong>${cartItem.item.price}</strong>
      </Col>

      <Col span={6}>
        {cartItem.user_id !== localUserID && cartItem.count}
        {cartItem.user_id === localUserID && (
          <Input type="number" onChange={e => setItemCount(e.target.value)} placeholder="count" value={itemCount} />
        )}
      </Col>

      <Col span={3}>
        <Tooltip placement="top" title={'edit'}>
          <Button
            type="primary"
            onClick={() =>
              updateCartItem({
                cartGroupID: localCartGroupID,
                user_id: localUserID || '',
                item_id: cartItem.item_id,
                item: cartItem.item,
                category: cartItem.category,
                count: parseInt(itemCount),
              })
            }
            disabled={cartItem.user_id !== localUserID}
            icon="edit"
          ></Button>
        </Tooltip>
      </Col>
      <Col span={3}>
        <Tooltip placement="top" title={'delete'}>
          <Button
            type="primary"
            onClick={() =>
              removeCartItem({
                cartGroupID: localCartGroupID,
                user_id: localUserID || '',
                item_id: cartItem.item_id,
                item: cartItem.item,
                category: cartItem.category,
                count: parseInt(itemCount),
              })
            }
            disabled={cartItem.user_id !== localUserID}
            icon="delete"
          ></Button>
        </Tooltip>
      </Col>
    </Row>
  )
}

const mapDispatchToProps = (dispatch: Dispatch) => ({
  updateCartItem: (cartItem: ICartItem) => dispatch(updateCartItem(cartItem)),

  removeCartItem: (cartItem: ICartItem) => dispatch(removeCartItem(cartItem)),
})

const mapStateToProps = createStructuredSelector({
  localCartGroupID: makeSelectLocalGroupID(),
  localUserID: makeSelectLocalUserID(),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CartItemAction)
