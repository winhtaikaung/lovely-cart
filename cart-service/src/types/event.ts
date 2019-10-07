export enum CartEvents {
  CONNECT = "connect",
  DISCONNECT = "disconnect",
  ADD_ITEM = "add-item",
  REMOVE_ITEM = "remove-item",
  CREATE_GROUP = "create-group",
  USER_JOIN = "user-join",
  USER_LEFT = "user-left",

  /* Acknowledge events */
  ACK_ADD_ITEM = "ack-add-item",
  ACK_CREATE_GROUP = "ack-create-group",
  ACK_REMOVE_ITEM = "ack-remove-item",
  ACK_USER_JOIN = "ack-user-join",
  ACK_USER_LEFT = "ack-user-left",
}

export enum QMethods {
  ADD_ITEM = "add-item",
  REMOVE_ITEM = "remove-item",
  CREATE_GROUP = "create-group",
  USER_JOIN = "user-join",
  USER_LEFT = "user-left",

  /* Acknowledge events */
  ACK_ADD_ITEM = "ack-add-item",
  ACK_CREATE_GROUP = "ack-create-group",
  ACK_REMOVE_ITEM = "ack-remove-item",
  ACK_USER_JOIN = "ack-user-join",
  ACK_USER_LEFT = "ack-user-left",
}
