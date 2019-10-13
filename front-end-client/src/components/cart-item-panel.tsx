import React from 'react'
import { Collapse, Icon, Card, Avatar, List } from 'antd'
import CartItemAction from './cart-item-actions'
import { ICartItem, IUser } from '../types'
import { Dispatch } from 'redux'
import { createStructuredSelector } from 'reselect'
import { makeSelectLocalGroupID, makeSelectLocalUserID } from '../containers/Cart/selectors'
import { connect } from 'react-redux'
import { PanelContainer } from './cart-item-panel.style'

const { Panel } = Collapse

interface ICartItemPanel {
  cartItems: ICartItem[]
  users: IUser[]
  localUserID: string
}
const CartItemPanel: React.FC<ICartItemPanel> = ({ cartItems, users, localUserID }) => {
  return (
    <>
      <PanelContainer>
        {users &&
          users.map((userItem, index) => {
            return (
              <Collapse
                key={index}
                defaultActiveKey={[`${localUserID}`]}
                bordered={false}
                expandIconPosition="right"
                expandIcon={({ isActive }) => <Icon type="caret-right" rotate={isActive ? 90 : 0} />}
              >
                <Panel
                  header={
                    <Card.Meta
                      avatar={<Avatar src={`https://api.adorable.io/avatars/285/${userItem.user_id}.png`} />}
                      title={`${userItem.user_id}`}
                    />
                  }
                  key={`${userItem.user_id}`}
                >
                  {cartItems && cartItems.length !== 0 && (
                    <List
                      itemLayout="horizontal"
                      dataSource={cartItems.filter(item => item.user_id === userItem.user_id)}
                      renderItem={(item: ICartItem) => (
                        <List.Item>
                          <List.Item.Meta
                            avatar={<Avatar size="large" shape="square" src={item.item.retina_image_url} />}
                            title={
                              // eslint-disable-next-line
                              <a href="#">{item.item.name}</a>
                            }
                            description={<CartItemAction cartItem={item} />}
                          />
                        </List.Item>
                      )}
                    />
                  )}
                </Panel>
              </Collapse>
            )
          })}
      </PanelContainer>
    </>
  )
}

const mapDispatchToProps = (dispatch: Dispatch) => ({})

const mapStateToProps = createStructuredSelector({
  localCartGroupID: makeSelectLocalGroupID(),
  localUserID: makeSelectLocalUserID(),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CartItemPanel)
