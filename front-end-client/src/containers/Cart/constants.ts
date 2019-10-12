enum ActionTypes {
  ADD_TASK = 'ADD_TASK',
  START_CHANNEL = 'START_CHANNEL',
  STOP_CHANNEL = 'STOP_CHANNEL',
  CHANNEL_ON = 'CHANNEL_ON',
  CHANNEL_OFF = 'CHANNEL_OFF',
  SERVER_ON = 'SERVER_ON',
  SERVER_OFF = 'SERVER_OFF',

  ADD_ITEM = 'add-item',
  UPDATE_ITEM = 'update-item',
  REMOVE_ITEM = 'remove-item',
  CREATE_GROUP = 'CREATE_GROUP',
  CREATE_GROUP_SUCCESS = 'CREATE_GROUP_SUCCESS',
  CREATE_GROUP_ERROR = 'CREATE_GROUP_ERROR',
  DELETE_GROUP = 'delete-group',
  USER_JOIN = 'user-join',
  USER_LEFT = 'user-left',
  ERROR = 'error',

  /* Acknowledge events */
  ACK_ADD_ITEM = 'ack-add-item',
  ACK_UPDATE_ITEM = 'ack-update-item',
  ACK_CREATE_GROUP = 'ack-create-group',
  ACK_DELETE_GROUP = 'ack-delete-group',
  ACK_REMOVE_ITEM = 'ack-remove-item',
  ACK_USER_JOIN = 'ack-user-join',
  ACK_USER_LEFT = 'ack-user-left',
  ACK_ERROR = 'ack-error',
}

export default ActionTypes
