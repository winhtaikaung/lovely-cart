import express from "express";
import nanoid from "nanoid";
import redis, { RedisClient } from "redis";
import { createServer, Server } from "http";
import { MQHelper } from "./helper/mq-async-helper";
import { QMethods } from "./types/event";
import { IMessage, IUser, ICartItem } from "./types/message";

const { promisify } = require("util");
const amqp = require("amqplib/callback_api");

export class CartService {
  public static readonly PORT: number = 3000;
  // tslint:disable-next-line:variable-name
  private _app: express.Application;
  private server: Server;
  private port: string | number;
  private _redisClient: RedisClient;

  private _getAsyncRedisClient: any;
  private _setAsyncRedisClient: any;

  constructor() {
    this._app = express();
    this.port = process.env.PORT || 3001;
    this.server = createServer(this._app);
    this.listen();

    this._redisClient = this.createRedisConnection();
    this.listenRabbitMQ();
    this._getAsyncRedisClient = promisify(this._redisClient.get).bind(this._redisClient);
    this._setAsyncRedisClient = promisify(this._redisClient.set).bind(this._redisClient);
  }

  get app(): express.Application {
    return this._app;
  }

  private createRedisConnection(): RedisClient {
    // create and connect redis client to local instance.
    const client = redis.createClient(6379);

    // echo redis errors to the console
    client.on("error", err => {
      console.log("Error " + err);
    });
    return client;
  }

  private listenRabbitMQ() {
    new MQHelper().subscribeMQP(QMethods.CREATE_GROUP, (err, queueName, callBackMessage) => {
      this._setAsyncRedisClient((JSON.parse(callBackMessage) as IMessage).cartGroupID, callBackMessage);
    });

    new MQHelper().subscribeMQP(QMethods.USER_JOIN, async (err, queueName, callBackMessage) => {
      let user = JSON.parse(callBackMessage) as IUser;
      user.user_id = nanoid();
      let cart = await this._getAsyncRedisClient(user.cartGroupID);
      cart = JSON.parse(cart) as IMessage;
      cart.users.push(user);
      await this._setAsyncRedisClient(user.cartGroupID, JSON.stringify(cart));
      new MQHelper().publishMQP(QMethods.ACK_USER_JOIN, JSON.stringify(cart));
    });

    new MQHelper().subscribeMQP(QMethods.ADD_ITEM, async (err, queueName, callBackMessage) => {
      let cartItem = JSON.parse(callBackMessage) as ICartItem;

      let cart = await this._getAsyncRedisClient(cartItem.cartGroupID);
      cart = JSON.parse(cart) as IMessage;
      cart.cart_items.push(cartItem);
      await this._setAsyncRedisClient(cartItem.cartGroupID, JSON.stringify(cart));
      new MQHelper().publishMQP(QMethods.ACK_ADD_ITEM, JSON.stringify(cart));
    });
  }

  private listen(): void {
    this.server.listen(this.port, () => {
      process.stdout.write(`CartService running on port ${this.port}\n`);
    });
  }
}
