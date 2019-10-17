import React from 'react'
import truncate from 'lodash/truncate'
import { MenuItem } from './types'
import { Row, Col, Card, Button, Tag, Input } from 'antd'
import { userAddItemCart } from '../containers/Cart/actions'
import { Dispatch } from 'redux'
import { ICartItem } from '../types'
import { createStructuredSelector } from 'reselect'
import { connect } from 'react-redux'
import nanoid from 'nanoid'
import { makeSelectLocalGroupID, makeSelectLocalUserID } from '../containers/Cart/selectors'
import { ButtonRow } from './menu-card.style'
const { Meta } = Card

interface CardType {
  item: MenuItem
  localCartGroupID: string
  userAddItemCart: (cartItem: ICartItem) => void
}
export const MenuCard: React.FC<CardType> = ({ item: menuItem, userAddItemCart, localCartGroupID }) => {
  const [orderCount, setOrderCount] = React.useState<string>('1')
  return (
    <Card
      hoverable
      style={{ width: `100%`, margin: `10px 0` }}
      cover={<img alt={menuItem.name} src={menuItem.retina_image_url} />}
      actions={[
        <>
          <Row data-testid="menu-card-price" gutter={16} type="flex" justify="start" align="middle">
            <Col span={24}>
              <h3>$ {menuItem.price}</h3>
            </Col>
          </Row>
          <ButtonRow gutter={16} type="flex" justify="center" align="middle">
            <Col span={12}>
              <Input
                type="number"
                onChange={e => setOrderCount(e.target.value)}
                placeholder="count"
                value={orderCount}
              />
            </Col>
            <Col span={12}>
              <Button
                data-testid="menu-card-add-button"
                type="primary"
                onClick={() => {
                  if (userAddItemCart) {
                    userAddItemCart({
                      cartGroupID: localCartGroupID || '',
                      user_id: localStorage.getItem('userID') || '',
                      item_id: nanoid(),
                      count: parseInt(orderCount),
                      category: menuItem.category,
                      item: menuItem,
                    })
                  }
                }}
                disabled={orderCount && orderCount !== '0' ? false : true}
                icon="shopping-cart"
              >
                Add to cart
              </Button>
            </Col>
          </ButtonRow>
          <Row gutter={16} type="flex" justify="start" align="middle"></Row>
        </>,
      ]}
    >
      <Meta
        title={<h2>{menuItem.name}</h2>}
        description={
          <>
            <Row>
              <Col span={24}>
                {truncate(menuItem.description, {
                  length: 200,
                  omission: '...',
                })}
              </Col>
            </Row>
            <br />
            <Row type="flex" align="middle" justify="start">
              <Col span={24}>
                {menuItem.tag_list.split(',').map((tagName: string) => (
                  <Tag key={tagName}>{tagName}</Tag>
                ))}
              </Col>
            </Row>
            <br />
            <Row type="flex" align="middle" justify="start">
              <Col span={24}>
                <h4>{`temperature : ${menuItem.temperature}`}</h4>
              </Col>
            </Row>
          </>
        }
      />
    </Card>
  )
}
// export default

const mapDispatchToProps = (dispatch: Dispatch) => ({
  userAddItemCart: (cartItem: ICartItem) => dispatch(userAddItemCart(cartItem)),
})

const mapStateToProps = createStructuredSelector({
  localCartGroupID: makeSelectLocalGroupID(),
  localUserID: makeSelectLocalUserID(),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MenuCard)
