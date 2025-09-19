import { Injectable, OnModuleInit } from '@nestjs/common';
import { RabbitMQService } from './rabbitmq.service';

@Injectable()
export class NotificationService implements OnModuleInit {
  private readonly entradaQueue = 'fila.notificacao.entrada.vitor';
  private readonly statusQueue = 'fila.notificacao.status.vitor';

  private statusMap: Map<string, string> = new Map();

  constructor(private readonly rabbit: RabbitMQService) {}

  async onModuleInit() {
    await this.rabbit.consume(this.entradaQueue, async (msg) => {
      console.log('Mensagem recebida:', msg);

      await new Promise((resolve) =>
        setTimeout(resolve, 1000 + Math.random() * 1000),
      );

      const isFailure = Math.floor(Math.random() * 10) < 2;
      const status = isFailure
        ? 'FALHA_PROCESSAMENTO'
        : 'PROCESSADO_SUCESSO';

      this.statusMap.set(msg.mensagemId, status);

      await this.rabbit.publish(this.statusQueue, {
        mensagemId: msg.mensagemId,
        status,
      });

      console.log(`Status publicado: ${msg.mensagemId} -> ${status}`);
    });
  }

  async createNotification(mensagemId: string, conteudoMensagem: string) {
    await this.rabbit.publish(this.entradaQueue, {
      mensagemId,
      conteudoMensagem,
    });
    this.statusMap.set(mensagemId, 'AGUARDANDO_PROCESSAMENTO');
  }

  getStatus(mensagemId: string) {
    return this.statusMap.get(mensagemId) || 'NAO_ENCONTRADO';
  }
}
