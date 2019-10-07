import { Connection } from "amqplib";
import axios from "axios";
import cors from "cors";
import express from "express";
import { createServer, Server } from "http";
import nanoid from "nanoid";
import socketIo from "socket.io";
import { CartEvents, QMethods } from "./types/event";

import { IMessage, IUser } from "./types/message";
import { Method } from "./types/method";

import { MQHelper } from "./helper/mq-async-helper";

export class GatewayServer {
  public static readonly PORT: number = 3000;
  // tslint:disable-next-line:variable-name
  private _app: express.Application;
  private server: Server;
  private io: SocketIO.Server;
  private port: string | number;

  constructor() {
    this._app = express();
    this.port = process.env.PORT || 3000;
    this._app.use(cors());
    this._app.options("*", cors());
    this.server = createServer(this._app);
    this.io = this.initSocket();
    this.listen();
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
    const item: any[] = [];
    const cartGroups: IMessage[] = [];

    this.server.listen(this.port, () => {
      process.stdout.write(`Running server on port ${this.port}\n`);
    });
  }

  private listenSocket(): void {
    this.io.on(CartEvents.CONNECT, (socket: any) => {
      process.stdout.write(`Websocket Connected client on port ${this.port}\n`);

      /* Group Related*/
      socket.on(CartEvents.CREATE_GROUP, (m: IMessage) => {
        const groupID = nanoid();
        process.stdout.write(`[server](message): Group Created ${groupID}\n`);

        new MQHelper().publishMQP(
          QMethods.CREATE_GROUP,
          JSON.stringify({ cartGroupID: groupID, cart_items: [], users: [] }),
        );
      });

      socket.on(CartEvents.USER_JOIN, (m: IUser) => {
        process.stdout.write(`[server](message): User Joined ${m}\n`);

        new MQHelper().publishMQP(QMethods.USER_JOIN, m, (err, msg, content) => {
          process.stdout.write(`[server](message):  ${content}\n`);
        });
      });

      socket.on(CartEvents.USER_LEFT, (m: IMessage) => {
        process.stdout.write(`[server](message): User Left \n`);
        // this.io.emit(CartEvents.ACK_USER_LEFT, JSON.stringify({ cartGroupID: groupID, cart_items: [], users: [] }));
      });

      /* Item Related */
      socket.on(CartEvents.ADD_ITEM, (m: IMessage) => {
        new MQHelper().publishMQP(QMethods.ADD_ITEM, m, (err, msg, content) => {
          process.stdout.write(`[server](message):  ${content}\n`);
        });
      });

      socket.on(CartEvents.REMOVE_ITEM, (m: IMessage) => {
        item.pop();
        process.stdout.write(`[server](message):Item Removed${item}\n`);
        this.io.emit(CartEvents.ACK_REMOVE_ITEM, JSON.stringify(item));
      });

      socket.on(CartEvents.DISCONNECT, () => {
        process.stdout.write("Client disconnected\n");
      });
    });
  }

  private emitSocket(): void {
    new MQHelper().subscribeMQP(QMethods.CREATE_GROUP, (err, quename, msg) => {
      this.io.emit(CartEvents.ACK_CREATE_GROUP, msg);
    });

    new MQHelper().subscribeMQP(QMethods.ACK_USER_JOIN, (err, msg, content) => {
      this.io.emit(CartEvents.ACK_USER_JOIN, content);
      process.stdout.write(`[server](message):  ${content}\n`);
    });
    new MQHelper().subscribeMQP(QMethods.ACK_ADD_ITEM, (err, msg, content) => {
      this.io.emit(CartEvents.ACK_ADD_ITEM, content);
      process.stdout.write(`[server](message):  ${content}\n`);
    });
  }

  private httpServe(): void {
    this._app.get("/menu", async (req: any, res: any) => {
      await axios({
        method: Method.GET,
        url: "https://grain.com.sg/menu.json",
      }).then((response: any) => {
        res.status(response.status).send(response.data);
      });
    });
  }
}
