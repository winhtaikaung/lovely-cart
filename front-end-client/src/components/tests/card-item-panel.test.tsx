import React from 'react'

import HiddenMessage from '../cart-item-panel'
import { render } from '../../test-util/react-testinglibrary'
import nanoid from 'nanoid'
const genericID = nanoid()
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
const mockData = {
  item_id: genericID,
  cartGroupID: genericID,
  user_id: genericID,
  item: [cartItem],
  category: 'dessert',
  count: 1,
}
const mockUser = {
  cartGroupID: genericID,
  user_id: genericID,
}
describe('CardItem Panel', () => {
  it('component should not crashed', () => {
    const { queryAllByTestId } = render(<HiddenMessage cartItems={[mockData]} users={[mockUser]} />)

    expect(queryAllByTestId('collapse-panel')).toBeTruthy()

    expect(queryAllByTestId('cart-item')).toBeTruthy()
  })
})
