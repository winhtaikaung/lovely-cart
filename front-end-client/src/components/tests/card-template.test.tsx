import React from 'react'

import CardTemplate from '../card-template'
import { render } from '../../test-util/react-testinglibrary'
const mockData = [
  {
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
  },
  {
    id: 660,
    byline: 'dark chocolate with tasting notes of blackcurrants, raisins and almonds',
    description:
      'Sourced from the Koh family farm in Sungai Ruan surrounded by fruit plantations, this chocolate is unlike your usual flat-tasting dark chocolate. It has a unique fruity taste of blackcurrant and raisins. Cacao nibs give it a crunchy texture and a slight roasted flavour with every bite. This is chocolate in its purest form.',
    price: 5.95,
    temperature: 'Chilled',
    category: 'dessert',
    ingredients: 'cacao nibs, cocoa butter, unrefined cane sugar',
    nutritions: { calories: '177', fat: '10g', carb: '19g', protein: '2g' },
    horizontal_image_url:
      'https://storage.googleapis.com/spineproduction/uploads/recipe/horizontal_image/610/BENNS_SUNGEIRUAN.jpg',
    retina_image_url:
      'https://storage.googleapis.com/spineproduction/uploads/recipe/horizontal_image/610/retina_BENNS_SUNGEIRUAN.jpg',
    tag_list: 'antioxidant-rich, vegan',
    name: 'Benns Sungai Ruan 72% Dark Chocolate with Cacao Nibs',
    feedback_rating: null,
    feedback_rating_count: 12,
    price_cents: 595,
    vertical_image_url:
      'https://storage.googleapis.com/spineproduction/uploads/recipe/vertical_image/610/benns_sungeiruan_1_.jpg',
  },
  {
    id: 663,
    byline: 'with rosemary, cumin and cayenne pepper',
    description:
      'If you are serious about churros, and serious about Belgian waffles, the Cinnamon Churro Waffles was made with you in mind. Golden brown waffles is coated with cinnamon sugar and a combination of Mexican spices like cayenne pepper and cumin, then topped with rosemary. No one would have imagined that the cross-breed of churros and waffles can taste this great. No one, other than the man behind this dessert.',
    price: 4.95,
    temperature: 'Chilled',
    category: 'dessert',
    ingredients:
      'wheat flour, margarine, sugar, egg, yeast, soy flour, salt, soy lecithin, vanilla, cayenne powder, cumin, cinnamon powder, butter, black pepper, rosemary',
    nutritions: { calories: '440', fat: '24g', carb: '55g', protein: '6g' },
    horizontal_image_url:
      'https://storage.googleapis.com/spineproduction/uploads/recipe/horizontal_image/613/single_wafflesmex.jpg',
    retina_image_url:
      'https://storage.googleapis.com/spineproduction/uploads/recipe/horizontal_image/613/retina_single_wafflesmex.jpg',
    tag_list: 'contains dairy, contains egg, mexican',
    name: 'Cinnamon Churro Waffles',
    feedback_rating: null,
    feedback_rating_count: 32,
    price_cents: 495,
    vertical_image_url:
      'https://storage.googleapis.com/spineproduction/uploads/recipe/vertical_image/613/Waffles_Vertical.JPG',
  },
  {
    id: 664,
    byline: 'rice cake with salted egg yolk filling and grated peanut',
    description:
      'It’s hardly a secret that we have a thing for salted egg yolk — we would add them to any food if people don’t judge. So, we were pretty excited when our chefs came up with a rice cake that has salted egg yolk both inside and outside of it. Before you sink your teeth into this dessert, the rich flavour from the salted egg yolk and peanut mixture coats your tongue. And when you take your first bite, the salted egg yolk filling hits you and leaves you in a state of bliss.',
    price: 5.95,
    temperature: 'Warm',
    category: 'dessert',
    ingredients: 'salted egg glutinous rice ball, peanut, sugar, salted egg yolk, salt',
    nutritions: { calories: '438', fat: '21g', carb: '52g', protein: '11g' },
    horizontal_image_url:
      'https://storage.googleapis.com/spineproduction/uploads/recipe/horizontal_image/614/single_saltedeggmuahchee.jpg',
    retina_image_url:
      'https://storage.googleapis.com/spineproduction/uploads/recipe/horizontal_image/614/retina_single_saltedeggmuahchee.jpg',
    tag_list: 'contains egg, contains nut, sweet treat',
    name: 'Salted Egg Yolk Muah Chee',
    feedback_rating: null,
    feedback_rating_count: 26,
    price_cents: 595,
    vertical_image_url:
      'https://storage.googleapis.com/spineproduction/uploads/recipe/vertical_image/614/Muah_Chee_Vertical.JPG',
  },
  {
    id: 668,
    byline: 'a medley of grapes, honeydew, kiwi and strawberries sealed in a parcel',
    description:
      'Now you have no excuses to skip your daily intake of fruits. We’ve picked the sweetest and juiciest of them all, and cut them into bite-sized pieces for you. Add it to your order for an extra boost after a meal.',
    price: 4.95,
    temperature: 'Chilled',
    category: 'dessert',
    ingredients: 'grape, honeydew, kiwi, strawberry',
    nutritions: { calories: '82', fat: '1g', carb: '20g', protein: '1g' },
    horizontal_image_url:
      'https://storage.googleapis.com/spineproduction/uploads/recipe/horizontal_image/618/single_fruitplatter.jpg',
    retina_image_url:
      'https://storage.googleapis.com/spineproduction/uploads/recipe/horizontal_image/618/retina_single_fruitplatter.jpg',
    tag_list: 'high fibre, refreshing',
    name: 'Mixed Fruit Parcel',
    feedback_rating: null,
    feedback_rating_count: 23,
    price_cents: 495,
    vertical_image_url:
      'https://storage.googleapis.com/spineproduction/uploads/recipe/vertical_image/618/Fruits_1_Vertical.JPG',
  },
]
test('shows the children when the checkbox is checked', () => {
  const { queryAllByTestId } = render(<CardTemplate menuItems={mockData} />)

  expect(queryAllByTestId('template-row')).toHaveLength(2)
})
