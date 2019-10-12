import React from 'react'

import { CardTemplateComponent, MenuItem } from './types'
import { Row, Col } from 'antd'
import MenuCard from './menu-card'

const MenuCardTemplate: React.FC<CardTemplateComponent> = ({ menuItems }) => (
  <>
    <Row gutter={16}>
      {menuItems &&
        menuItems.length !== 0 &&
        menuItems.map((item: MenuItem) => (
          <Col key={item.id} span={8}>
            <MenuCard item={item} />
          </Col>
        ))}
    </Row>
  </>
)

export default MenuCardTemplate
