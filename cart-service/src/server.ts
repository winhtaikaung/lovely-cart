import express from 'express';
import nanoid from 'nanoid';
import redis, { RedisClient } from 'redis';
import { createServer, Server } from 'http';
import { MQHelper } from './helper/mq-async-helper';
import { QMethods } from './types/event';
import { ICartGroup, IUser, ICartItem } from './types/message';

const { promisify } = require('util');

export class CartService {
  public static readonly PORT: number = 3001;
  // tslint:disable-next-line:variable-name
  private _app: express.Application;
  private server: Server;
  private port: string | number;
  private _redisClient: RedisClient;
  private mqHelper: MQHelper;

  private _getRedisClient: any;
  private _setRedisClient: any;
  private _deleteRedisClient: any;

  constructor() {
    this._app = express();
    this.port = process.env.PORT || 3001;
    this.server = createServer(this._app);
    this.listen();

    this._redisClient = this.createRedisConnection();
    this.mqHelper = new MQHelper();
    this.listenRabbitMQ();
    this._getRedisClient = promisify(this._redisClient.get).bind(this._redisClient);
    this._setRedisClient = promisify(this._redisClient.set).bind(this._redisClient);
    this._deleteRedisClient = promisify(this._redisClient.del).bind(this._redisClient);
  }

  get app(): express.Application {
    return this._app;
  }

  private createRedisConnection(): RedisClient {
    // create and connect redis client to local instance.
    const redisHost = process.env.REDIS_HOST || 'localhost';
    const redisPort: number = parseInt(process.env.REDIS_PORT || '6379');
    const client = redis.createClient(redisPort, redisHost);

    // echo redis errors to the console
    client.on('error', err => {
      console.log('Error ' + err);
    });
    return client;
  }

  private listenRabbitMQ() {
    this.mqHelper.subscribeMQP(QMethods.CREATE_GROUP, (err, queueName, callBackMessage) => {
      this._setRedisClient((JSON.parse(callBackMessage) as ICartGroup).cartGroupID, callBackMessage);
    });

    this.mqHelper.subscribeMQP(QMethods.FETCH_CART_GROUP, async (err, queueName, callBackMessage) => {
      let cart = await this._getRedisClient((JSON.parse(callBackMessage) as IUser).cartGroupID);
      if (cart) {
        cart = JSON.parse(cart) as ICartGroup;
        this.mqHelper.publishMQP(QMethods.ACK_FETCH_CART_GROUP, JSON.stringify({ data: cart, mutatedItem: null }));
      }
    });

    this.mqHelper.subscribeMQP(QMethods.USER_JOIN, async (err, queueName, callBackMessage) => {
      let user = JSON.parse(callBackMessage) as IUser;
      let cart = await this._getRedisClient(user.cartGroupID);
      cart = JSON.parse(cart) as ICartGroup;
      cart.users.push(user);
      await this._setRedisClient(user.cartGroupID, JSON.stringify(cart));
      this.mqHelper.publishMQP(QMethods.ACK_USER_JOIN, JSON.stringify({ data: cart, mutatedItem: user }));
    });

    this.mqHelper.subscribeMQP(QMethods.ADD_ITEM, async (err, queueName, callBackMessage) => {
      let cartItem = JSON.parse(callBackMessage) as ICartItem;
      cartItem.item_id = nanoid();
      let cart = await this._getRedisClient(cartItem.cartGroupID);
      cart = JSON.parse(cart) as ICartGroup;
      cart.cart_items.push(cartItem);
      await this._setRedisClient(cartItem.cartGroupID, JSON.stringify(cart));
      this.mqHelper.publishMQP(QMethods.ACK_ADD_ITEM, JSON.stringify({ data: cart, mutatedItem: cartItem }));
    });

    this.mqHelper.subscribeMQP(QMethods.UPDATE_ITEM, async (err, queueName, callBackMessage) => {
      let cartItem = JSON.parse(callBackMessage) as ICartItem;
      let cart = await this._getRedisClient(cartItem.cartGroupID);
      cart = JSON.parse(cart) as ICartGroup;
      const userExist = cart.cart_items.some((item: ICartItem) => item.user_id === cartItem.user_id);

      if (userExist) {
        const index = cart.cart_items.findIndex(
          (item: ICartItem) => item.item_id === cartItem.item_id && item.user_id === cartItem.user_id,
        );
        console.log(index);
        if (index !== -1) {
          cart.cart_items[index] = cartItem;
        }
      }
      await this._setRedisClient(cartItem.cartGroupID, JSON.stringify(cart));
      this.mqHelper.publishMQP(QMethods.ACK_UPDATE_ITEM, JSON.stringify({ data: cart, mutatedItem: cartItem }));
    });

    this.mqHelper.subscribeMQP(QMethods.REMOVE_ITEM, async (err, queueName, callBackMessage) => {
      let cartItem = JSON.parse(callBackMessage) as ICartItem;
      let cart = await this._getRedisClient(cartItem.cartGroupID);
      cart = JSON.parse(cart) as ICartGroup;
      const userExist = cart.cart_items.some((item: ICartItem) => item.user_id === cartItem.user_id);
      cart.cart_items = userExist
        ? cart.cart_items.filter((item: ICartItem) => item.item_id !== cartItem.item_id)
        : cart.cart_items;
      console.log(cartItem);
      await this._setRedisClient(cartItem.cartGroupID, JSON.stringify(cart));
      this.mqHelper.publishMQP(QMethods.ACK_REMOVE_ITEM, JSON.stringify({ data: cart, mutatedItem: cartItem }));
    });

    this.mqHelper.subscribeMQP(QMethods.USER_LEFT, async (err, queueName, callBackMessage) => {
      let user = JSON.parse(callBackMessage) as IUser;
      let cart = await this._getRedisClient(user.cartGroupID);
      cart = JSON.parse(cart) as ICartGroup;
      const userExist = cart.users.some((item: IUser) => item.user_id === user.user_id && !user.is_admin);
      cart.users = userExist ? cart.users.filter((item: IUser) => item.user_id !== user.user_id) : cart.users;
      cart.cart_items = userExist
        ? cart.cart_items.filter((item: ICartItem) => item.user_id !== user.user_id)
        : cart.cart_items;

      await this._setRedisClient(user.cartGroupID, JSON.stringify(cart));
      this.mqHelper.publishMQP(QMethods.ACK_USER_LEFT, JSON.stringify({ data: cart, mutatedItem: user }));
    });

    this.mqHelper.subscribeMQP(QMethods.DELETE_GROUP, async (err, queueName, callBackMessage) => {
      let user = JSON.parse(callBackMessage) as IUser;
      let cart = await this._getRedisClient(user.cartGroupID);
      cart = JSON.parse(cart) as ICartGroup;
      const userExist = cart.users.findIndex((item: IUser) => item.user_id === user.user_id && item.is_admin);

      if (userExist !== -1) {
        await this._deleteRedisClient(user.cartGroupID);
        this.mqHelper.publishMQP(
          QMethods.ACK_DELETE_GROUP,
          JSON.stringify({ message: 'Order group has been Deleted' }),
        );
      }
    });
  }

  private listen(): void {
    this.server.listen(this.port, () => {
      process.stdout.write(`CartService running on port ${this.port}\n`);
    });
  }
}
