export interface IUser {
  cartGroupID: string;
  user_id?: string;
  user_name?: string;
}
export interface IMessage {
  cartGroupID: string;
  cart_items: any[];
  users: IUser[];
}
