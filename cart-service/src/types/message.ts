export interface IUser {
  cartGroupID: string;
  user_id: string;
}

export interface ICartItem {
  cartGroupID: string;
  user_id: string;
  item: any;
  category: string;
  count: number;
}
export interface IMessage {
  cartGroupID: string;
  cart_items: ICartItem[];
  users: IUser[];
}
