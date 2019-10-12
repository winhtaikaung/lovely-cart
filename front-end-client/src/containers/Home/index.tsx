import React, { useEffect } from 'react'
import { withRouter } from 'react-router'
import { connect } from 'react-redux'
import { Tabs, Icon, Layout } from 'antd'
import { makeSelectCurrentUser, makeSelectMenuItems } from './selectors'
import { loadMenus } from './actions'
import { Dispatch } from 'redux'
import { createStructuredSelector } from 'reselect'
import { ContainerState } from './types'
import MenuCardTemplate from '../../components/card-template'
import { IconDesserts, IconMealBox, IconSides, IconDrinks } from '../../icons'
import GroupOrderView from '../Cart'

const { TabPane } = Tabs
const { Sider, Content } = Layout

const Home: React.FC<ContainerState> = ({ menuItems, loadMenus }) => {
  useEffect(() => {
    loadMenus()
  }, [])

  return (
    <>
      <Layout style={{ minHeight: '100vh' }}>
        <Layout style={{ marginRight: 300 }}>
          <Content>
            <Tabs
              defaultActiveKey="1"
              tabBarStyle={{
                textAlign: `center`,
              }}
            >
              <TabPane
                tab={
                  <span>
                    <Icon component={IconMealBox} />
                    Meal Box
                  </span>
                }
                key="1"
              >
                <MenuCardTemplate menuItems={menuItems.meal_boxes} />
              </TabPane>
              <TabPane
                tab={
                  <span>
                    <Icon component={IconSides} />
                    Sides
                  </span>
                }
                key="2"
              >
                <MenuCardTemplate menuItems={menuItems.sides} />
              </TabPane>
              <TabPane
                tab={
                  <span>
                    <Icon component={IconDesserts} />
                    Desserts
                  </span>
                }
                key="3"
              >
                <MenuCardTemplate menuItems={menuItems.desserts} />
              </TabPane>
              <TabPane
                tab={
                  <span>
                    <Icon component={IconDrinks} />
                    Drinks
                  </span>
                }
                key="=4"
              >
                <MenuCardTemplate menuItems={menuItems.drinks} />
              </TabPane>
            </Tabs>
          </Content>
        </Layout>
        <Sider
          width={300}
          style={{
            overflow: 'auto',
            height: '100vh',
            position: 'fixed',
            background: 'white',
            right: 0,
          }}
        >
          <GroupOrderView />
          <div className="logo" />
        </Sider>
      </Layout>
    </>
  )
}

const mapDispatchToProps = (dispatch: Dispatch) => ({
  loadMenus: () => dispatch(loadMenus()),
})
const mapStateToProps = createStructuredSelector({
  currentUser: makeSelectCurrentUser(),
  menuItems: makeSelectMenuItems(),
})

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(Home),
)
