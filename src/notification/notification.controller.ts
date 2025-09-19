import { Body, Controller, Get, Param, Post, Res, HttpStatus } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { CreateNotificationDto } from './dto/create-notification.dto';
import express from 'express';

@Controller('notificar')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @Post()
  async create(@Body() dto: CreateNotificationDto, @Res() res: express.Response) {
    if (!dto.conteudoMensagem.trim()) {
      return res.status(HttpStatus.BAD_REQUEST).json({ error: 'Mensagem não pode ser vazia' });
    }

    await this.notificationService.createNotification(dto.mensagemId, dto.conteudoMensagem);
    return res.status(HttpStatus.ACCEPTED).json({
      mensagemId: dto.mensagemId,
      status: 'AGUARDANDO_PROCESSAMENTO',
    });
  }

  @Get('status/:mensagemId')
  getStatus(@Param('mensagemId') mensagemId: string) {
    return { mensagemId, status: this.notificationService.getStatus(mensagemId) };
  }
}
