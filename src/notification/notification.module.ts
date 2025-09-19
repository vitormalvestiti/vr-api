import { Module } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { RabbitMQService } from './rabbitmq.service';

@Module({
  providers: [NotificationService, RabbitMQService]
})
export class NotificationModule {}
