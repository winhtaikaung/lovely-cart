import axios from 'axios';
import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import { createServer, Server } from 'http';
import nanoid from 'nanoid';
import socketIo from 'socket.io';
import { CartEvents, QMethods } from './types/event';

import { ICartGroup, ICartItem, IResponse, IUser } from './types/message';
import { Method } from './types/method';

import cacheManager, { Cache } from 'cache-manager';
import { MQHelper } from './helper/mq-async-helper';

export class GatewayServer {
  public static readonly PORT: number = 3002;
  // tslint:disable-next-line:variable-name
  private _app: express.Application;
  private server: Server;
  private io: SocketIO.Server;
  private memoryCache: Cache;
  private mqHelper: MQHelper;
  private port: string | number;

  constructor() {
    this._app = express();
    this.port = process.env.PORT || 3002;
    this._app.use(cors());
    this._app.options('*', cors());
    this.server = createServer(this._app);
    this.io = this.initSocket();

    this.listen();
    this.mqHelper = new MQHelper();
    this.memoryCache = cacheManager.caching({
      max: parseInt(process.env.MAX_CACHE || '1000', 1000),
      store: 'memory',
      ttl: parseInt(process.env.TTL || '600', 600) /* 10 minutes */,
    });
    this.listenSocket();
    this.emitSocket();
    this.httpServe();
  }
  get app(): express.Application {
    return this._app;
  }
  private initSocket(): socketIo.Server {
    return socketIo(this.server);
  }

  private listen(): void {
    this._app.use(bodyParser.urlencoded({ extended: false }));
    this._app.use(bodyParser.json());
    this.server.listen(this.port, () => {
      process.stdout.write(`Running server on port ${this.port}\n`);
    });
  }

  private listenSocket(): void {
    this.io.on(CartEvents.CONNECT, (socket: any) => {
      process.stdout.write(`Websocket Connected client on port ${this.port}\n`);

      /* Group Related*/
      socket.on(CartEvents.CREATE_GROUP, (m: ICartGroup) => {
        const groupID = nanoid();
        process.stdout.write(`[server](message): Group Created ${groupID}\n`);

        this.mqHelper.publishMQP(QMethods.CREATE_GROUP, JSON.stringify(m));
      });

      socket.on(CartEvents.DELETE_GROUP, (m: IUser) => {
        this.mqHelper.publishMQP(QMethods.DELETE_GROUP, JSON.stringify(m), (content, msg, err) => {
          process.stdout.write(`[server](message):  ${content}\n`);
        });
      });

      socket.on(CartEvents.USER_JOIN, (m: IUser) => {
        process.stdout.write(`[server](message): User Joined ${m}\n`);

        this.mqHelper.publishMQP(QMethods.USER_JOIN, JSON.stringify(m), (content, msg, err) => {
          process.stdout.write(`[server](message):  ${content}\n`);
        });
      });

      socket.on(CartEvents.USER_LEFT, (m: IUser) => {
        process.stdout.write(`[server](message): User Left \n`);
        // this.io.emit(CartEvents.ACK_USER_LEFT, JSON.stringify({ cartGroupID: groupID, cart_items: [], users: [] }));
        this.mqHelper.publishMQP(QMethods.USER_LEFT, JSON.stringify(m), (content, msg, err) => {
          process.stdout.write(`[server](message):  ${content}\n`);
        });
      });

      /* Item Related */
      socket.on(CartEvents.ADD_ITEM, (m: ICartItem) => {
        this.mqHelper.publishMQP(QMethods.ADD_ITEM, JSON.stringify(m), (content, msg, err) => {
          process.stdout.write(`[server](message):  ${content}\n`);
        });
      });

      socket.on(CartEvents.UPDATE_ITEM, (m: ICartItem) => {
        this.mqHelper.publishMQP(QMethods.UPDATE_ITEM, JSON.stringify(m), (content, msg, err) => {
          process.stdout.write(`[server](message):  ${content}\n`);
        });
      });

      socket.on(CartEvents.REMOVE_ITEM, (m: ICartItem) => {
        this.mqHelper.publishMQP(QMethods.REMOVE_ITEM, JSON.stringify(m), (content, msg, err) => {
          process.stdout.write(`[server](message):  ${content}\n`);
        });
      });

      socket.on(CartEvents.FETCH_CART_GROUP, (m: IUser) => {
        this.mqHelper.publishMQP(QMethods.FETCH_CART_GROUP, JSON.stringify(m), (content, msg, err) => {
          process.stdout.write(`[server](message):  ${content}\n`);
        });
      });

      socket.on(CartEvents.DISCONNECT, () => {
        process.stdout.write('Client disconnected\n');
      });
    });
  }

  private emitSocket(): void {
    this.mqHelper.subscribeMQP(QMethods.ACK_DELETE_GROUP, (msg: any) => {
      const data = (JSON.parse(msg) as IResponse).mutatedItem;
      // process.stdout.write(`\nUSER-JOIN-${CartEvents.ACK_DELETE_GROUP}-${data ? data.cartGroupID : ''}\n`);
      this.io.emit(`${CartEvents.ACK_DELETE_GROUP}-${data ? data.cartGroupID : ''}`, msg);
      // process.stdout.write(`[server](message):  ${msg}\n`);
    });

    this.mqHelper.subscribeMQP(QMethods.ACK_USER_JOIN, (msg: any) => {
      const data = (JSON.parse(msg) as IResponse).data;
      process.stdout.write(`\nUSER-JOIN-${CartEvents.ACK_USER_JOIN}-${data ? data.cartGroupID : ''}\n`);
      this.io.emit(`${CartEvents.ACK_USER_JOIN}-${data ? data.cartGroupID : ''}`, msg);
      // process.stdout.write(`[server](message):${CartEvents.ACK_USER_JOIN}--${msg}\n`);
    });

    this.mqHelper.subscribeMQP(QMethods.ACK_USER_LEFT, (msg: any) => {
      const data = (JSON.parse(msg) as IResponse).data;
      process.stdout.write(`\nUSER-LEFT-${CartEvents.ACK_USER_LEFT}-${data ? data.cartGroupID : ''}\n`);
      this.io.emit(`${CartEvents.ACK_USER_LEFT}-${data ? data.cartGroupID : ''}`, msg);
    });

    this.mqHelper.subscribeMQP(QMethods.ACK_ADD_ITEM, (msg: any) => {
      const data = (JSON.parse(msg) as IResponse).data;
      process.stdout.write(`\nUSER-JOIN-${CartEvents.ACK_ADD_ITEM}-${data ? data.cartGroupID : ''}\n`);
      this.io.emit(`${CartEvents.ACK_ADD_ITEM}-${data ? data.cartGroupID : ''}`, msg);
      // process.stdout.write(`[server](message):  ${msg}\n`);
    });

    this.mqHelper.subscribeMQP(QMethods.ACK_UPDATE_ITEM, (msg: any) => {
      const data = (JSON.parse(msg) as IResponse).data;
      process.stdout.write(`\nUSER-JOIN-${CartEvents.ACK_UPDATE_ITEM}-${data ? data.cartGroupID : ''}\n`);
      this.io.emit(`${CartEvents.ACK_UPDATE_ITEM}-${data ? data.cartGroupID : ''}`, msg);

      // process.stdout.write(`[server](message):  ${msg}\n`);
    });

    this.mqHelper.subscribeMQP(QMethods.ACK_REMOVE_ITEM, (msg: any) => {
      const data = (JSON.parse(msg) as IResponse).data;
      process.stdout.write(`\nUSER-JOIN-${CartEvents.ACK_REMOVE_ITEM}-${data ? data.cartGroupID : ''}\n`);
      this.io.emit(`${CartEvents.ACK_REMOVE_ITEM}-${data ? data.cartGroupID : ''}`, msg);
      // process.stdout.write(`[server](message):  ${msg}\n`);
    });

    this.mqHelper.subscribeMQP(QMethods.ACK_FETCH_CART_GROUP, (msg: any) => {
      const data = (JSON.parse(msg) as IResponse).data;
      process.stdout.write(`\nUSER-JOIN-${CartEvents.ACK_FETCH_CART_GROUP}-${data ? data.cartGroupID : ''}\n`);
      this.io.emit(`${CartEvents.ACK_FETCH_CART_GROUP}-${data ? data.cartGroupID : ''}`, msg);
    });
  }

  private httpServe(): void {
    this._app.get('/menu', async (req: any, res: any) => {
      try {
        const menuUrl: string = 'https://grain.com.sg/menu.json';
        const cachedResult = await this.memoryCache.get(menuUrl);
        const result =
          cachedResult ||
          (await axios({
            method: Method.GET,
            url: menuUrl,
          })).data;

        this.memoryCache.set(menuUrl, result.data, {
          ttl: parseInt(process.env.TTL || '600', 600),
        });

        res.json(result);
      } catch (error) {
        const { status = 500, statusText = 'Grain API Error' } = error.response;
        res.status(status).json({
          status,
          statusText,
        });
      }
    });

    this._app.post('/group', async (req: any, res: any) => {
      const payload = req.body;
      await this.mqHelper.publishMQP(QMethods.CREATE_GROUP, JSON.stringify(payload), (callBackmsg, queueName, err) => {
        res.status(200).send({ data: JSON.parse(callBackmsg) });
      });
    });
  }
}
