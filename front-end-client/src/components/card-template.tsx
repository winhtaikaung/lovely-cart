import React from 'react'
import chunk from 'lodash/chunk'

import { CardTemplateComponent, MenuItem } from './types'
import { Row, Col } from 'antd'
import MenuCard from './menu-card'

const MenuCardTemplate: React.FC<CardTemplateComponent> = ({ menuItems }) => (
  <>
    {menuItems &&
      menuItems.length !== 0 &&
      chunk(menuItems, 3).map((chunkedArr, index) => {
        return (
          <Row key={index} gutter={16} data-testid="template-row">
            {chunkedArr.map((item: MenuItem) => (
              <Col key={item.id} xs={24} sm={12} md={12} lg={8} xl={8}>
                <MenuCard item={item} />
              </Col>
            ))}
          </Row>
        )
      })}
  </>
)

export default MenuCardTemplate
