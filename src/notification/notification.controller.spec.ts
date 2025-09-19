import { Test, TestingModule } from '@nestjs/testing';
import { NotificationController } from './notification.controller';
import { NotificationService } from './notification.service';

describe('NotificationController', () => {
  let controller: NotificationController;
  let service: NotificationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NotificationController],
      providers: [
        {
          provide: NotificationService,
          useValue: {
            createNotification: jest.fn(),
            getStatus: jest.fn().mockReturnValue('AGUARDANDO_PROCESSAMENTO'),
          },
        },
      ],
    }).compile();

    controller = module.get<NotificationController>(NotificationController);
    service = module.get<NotificationService>(NotificationService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('deve retornar status quando chamar getStatus', () => {
    const result = controller.getStatus('123');
    expect(result).toEqual({ mensagemId: '123', status: 'AGUARDANDO_PROCESSAMENTO' });
  });
});
