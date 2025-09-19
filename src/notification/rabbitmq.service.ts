import { Injectable, OnModuleInit } from '@nestjs/common';
import * as amqp from 'amqplib';
import type { Channel, ChannelModel } from 'amqplib';

@Injectable()
export class RabbitMQService implements OnModuleInit {
  private connection!: ChannelModel;
  private channel!: Channel;

  async onModuleInit() {
    this.connection = await amqp.connect(
      'amqp://bjnuffmq:gj-YQIiEXyfxQxjsZtiYDKeXIT8ppUq7@jaragua-01.lmq.cloudamqp.com'
    );
    this.channel = await this.connection.createChannel();
  }

  async publish(queue: string, message: any) {
    await this.channel.assertQueue(queue, { durable: false });
    this.channel.sendToQueue(queue, Buffer.from(JSON.stringify(message)));
  }

  async consume(queue: string, callback: (msg: any) => void) {
    await this.channel.assertQueue(queue, { durable: false });
    this.channel.consume(queue, (msg) => {
      if (msg) {
        const content = JSON.parse(msg.content.toString());
        callback(content);
        this.channel.ack(msg);
      }
    });
  }
}

