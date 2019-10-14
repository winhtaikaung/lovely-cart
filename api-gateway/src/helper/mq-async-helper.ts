import amqp from 'amqplib';
export class MQHelper {
  // tslint:disable-next-line:no-empty
  private mqUserName: string;
  private mqPassword: string;
  private mqHost: string;
  private mqPort: string;
  private mqpConnectionString: string;

  constructor() {
    this.mqUserName = process.env.MQP_USER_NAME || 'username';
    this.mqPassword = process.env.MQP_PASSWORD || 'mybunny';
    this.mqHost = process.env.MQP_HOST || 'localhost';
    this.mqPort = process.env.MQP_PORT || '5672';
    // tslint:disable-next-line:max-line-length
    this.mqpConnectionString = `amqp://${this.mqUserName}:${this.mqPassword}@${this.mqHost}:${this.mqPort}?heartbeat=60`;
  }

  get publishMQP() {
    return this._publishMQP;
  }
  get subscribeMQP() {
    return this._subScribeMQP;
  }

  private async _publishMQP(
    queueName: string,
    message: any,
    callback?: (callBackMessage: any, queueName: string, err: any) => void,
  ) {
    const conn = await amqp.connect(this.mqpConnectionString);
    const channel = await conn.createChannel();
    await channel.assertExchange(queueName, 'fanout', {
      durable: false,
    });
    const sent = channel.publish(queueName, '', Buffer.from(message), { persistent: true });
    if (sent && callback) {
      if (process.env.NODE_ENV !== 'PRODUCTION') {
        process.stdout.write(` [x] ${message} sent from queue ${queueName}\n`);
      }
      callback(message, queueName, null);
    }
  }

  private async _subScribeMQP(
    queueName: string,
    callback?: (callBackMessage: any, queueName: string, err: any) => void,
  ) {
    const conn = await amqp.connect(this.mqpConnectionString);
    const channel = await conn.createChannel();
    await channel.assertExchange(queueName, 'fanout', {
      durable: false,
    });
    const q = await channel.assertQueue('', {
      exclusive: true,
    });
    await channel.bindQueue(q.queue, queueName, '');

    await channel.consume(
      q.queue,
      (msg: any) => {
        if (callback) {
          callback(msg.content.toString(), queueName, null);
        }
        if (process.env.NODE_ENV !== 'PRODUCTION') {
          process.stdout.write(` [x] Received from ${queueName} ${msg.content.toString()}\n`);
        }
      },
      {
        noAck: true,
      },
    );
  }
}
