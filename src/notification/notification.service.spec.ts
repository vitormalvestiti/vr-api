import { NotificationService } from './notification.service';
import { RabbitMQService } from '../rabbitmq/rabbitmq.service';

describe('NotificationService', () => {
  let service: NotificationService;
  let rabbit: RabbitMQService;

  beforeEach(() => {
    rabbit = {
      publish: jest.fn(),
      consume: jest.fn(),
    } as any;
    service = new NotificationService(rabbit);
  });

  it('deve publicar mensagem na fila de entrada', async () => {
    const spy = jest.spyOn(rabbit, 'publish').mockResolvedValueOnce(undefined);

    await service.createNotification('123', 'Mensagem teste');

    expect(spy).toHaveBeenCalledWith('fila.notificacao.entrada.vitor', {
      mensagemId: '123',
      conteudoMensagem: 'Mensagem teste',
    });
  });

  it('deve retornar status default se não existir', () => {
    expect(service.getStatus('nao-existe')).toBe('NAO_ENCONTRADO');
  });
});
