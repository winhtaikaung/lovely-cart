export interface IUser {
  cartGroupID: string;
  user_id: string;
  is_admin?: boolean;
  group_delete?: boolean;
}

export interface ICartItem {
  item_id: string;
  cartGroupID: string;
  user_id: string;
  item?: any;
  category: string;
  count: number;
  remark?: string;
}
export interface ICartGroup {
  cartGroupID: string;
  cart_items: ICartItem[];
  users: IUser[];
}

export interface IResponse {
  data?: any;
  message?: string;
  code?: number;
  mutatedItem?: any;
}
