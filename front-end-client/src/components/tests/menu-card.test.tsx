import React from 'react'

import { MenuCard } from '../menu-card'
import { render } from '../../test-util/react-testinglibrary'
import { ICartItem } from '../../types'
import { fireEvent } from '@testing-library/react'
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
test('show menu card item', () => {
  const userAddItemCart = jest.fn((item: ICartItem) => {})
  const { queryAllByTestId, queryByTestId } = render(
    <MenuCard item={cartItem} userAddItemCart={userAddItemCart} localCartGroupID="" />,
  )

  expect(queryAllByTestId('menu-card-price')).toBeTruthy()
  expect(queryAllByTestId('menu-card-add-button')).toBeTruthy()
  expect(queryAllByTestId('menu-card-price')).toHaveLength(1)
  expect(queryAllByTestId('menu-card-add-button')).toHaveLength(1)
  const addButton = queryByTestId('menu-card-add-button')
  if (addButton) {
    fireEvent.click(addButton)
  }
  expect(userAddItemCart).toHaveBeenCalledTimes(1)
})
