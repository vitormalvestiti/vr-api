import { Module } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { RabbitMQService } from './rabbitmq.service';
import { NotificationController } from './notification.controller';

@Module({
  providers: [NotificationService, RabbitMQService],
  controllers: [NotificationController]
})
export class NotificationModule {}
