import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as amqp from 'amqplib';
import type { Channel, ChannelModel } from 'amqplib';

@Injectable()
export class RabbitMQService {
    private connection!: ChannelModel;
    private channel!: Channel;

    constructor(private readonly configService: ConfigService) { }

    async init() {
        if (!this.connection) {
            const rabbitUrl = this.configService.get<string>('RABBITMQ_URL') || '';
            if (!rabbitUrl) {
                throw new Error('RabbitMQ URL não configurada (RABBITMQ_URL ausente no .env)');
            }
            this.connection = await amqp.connect(rabbitUrl);
            this.channel = await this.connection.createChannel();
            console.log('[RabbitMQ] Canal inicializado');
        }
    }

    async publish(queue: string, message: any) {
        try {
            await this.init();
            await this.channel.assertQueue(queue, { durable: false });
            this.channel.sendToQueue(queue, Buffer.from(JSON.stringify(message)));
        } catch (err) {
            console.error(`Erro ao publicar em ${queue}:`, err.message);
            throw new Error('Erro ao publicar no RabbitMQ');
        }
    }

    async consume(queue: string, callback: (msg: any) => void) {
        try {
            await this.init();
            await this.channel.assertQueue(queue, { durable: false });
            this.channel.consume(queue, (msg) => {
                if (msg) {
                    const content = JSON.parse(msg.content.toString());
                    callback(content);
                    this.channel.ack(msg);
                }
            });
        } catch (err) {
            console.error(`Erro ao consumir fila ${queue}:`, err.message);
        }
    }
}