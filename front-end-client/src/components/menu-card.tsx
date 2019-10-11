import React from 'react';
import truncate from 'lodash/truncate';
import { MenuItem } from './types';
import { Row, Col, Card, Button, Tag, Input } from 'antd';
const { Meta } = Card;
type CardType = { item: MenuItem };
const MenuCard: React.FC<CardType> = ({ item }) => {
  const [orderCount, setOrderCount] = React.useState<string>('1');
  return (
    <Card
      hoverable
      style={{ width: `100%`, margin: `10px 0` }}
      cover={<img alt={item.name} src={item.retina_image_url} />}
      actions={[
        <>
          <Row gutter={16} type='flex' justify='start' align='middle'>
            <Col span={6}>
              <h3>$ {item.price}</h3>
            </Col>

            <Col span={8}>
              <Input
                type='number'
                onChange={e => setOrderCount(e.target.value)}
                placeholder='count'
                value={orderCount}
              />
            </Col>

            <Col span={6}>
              <Button
                type='primary'
                disabled={orderCount && orderCount !== '0' ? false : true}
                icon='shopping-cart'
              >
                Add to cart
              </Button>
            </Col>
          </Row>
        </>
      ]}
    >
      <Meta
        title={<h2>{item.name}</h2>}
        description={
          <>
            <Row>
              <Col span={24}>
                {truncate(item.description, {
                  length: 200,
                  omission: '...'
                })}
              </Col>
            </Row>
            <br />
            <Row type='flex' align='middle' justify='start'>
              <Col span={24}>
                {item.tag_list.split(',').map((tagName: string) => (
                  <Tag key={tagName}>{tagName}</Tag>
                ))}
              </Col>
            </Row>
            <br />
            <Row type='flex' align='middle' justify='start'>
              <Col span={24}>
                <h4>{`temperature : ${item.temperature}`}</h4>
              </Col>
            </Row>
          </>
        }
      />
    </Card>
  );
};
export default MenuCard;
