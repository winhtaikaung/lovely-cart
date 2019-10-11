interface ComponentType {
  children?: ReactNode;
}
interface CardTemplates {
  menuItems: MenuItem[];
}

export interface Nutritions {
  calories: string;
  fat: string;
  carb: string;
  protein: string;
}

export interface MenuItem {
  id: number;
  byline: string;
  description: string;
  price: number;
  temperature: string;
  category: string;
  ingredients: string;
  nutritions: Nutritions;
  horizontal_image_url: string;
  retina_image_url: string;
  tag_list: string;
  name: string;
  feedback_rating?: any;
  feedback_rating_count: number;
  price_cents: number;
  vertical_image_url: string;
}

type CardTemplateComponent = CardTemplateComponent & ComponentType;

export { CardTemplateComponent };
