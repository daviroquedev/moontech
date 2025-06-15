import { Test, TestingModule } from '@nestjs/testing';
import { LogsController } from './logs.controller';
import { LogsService } from './logs.service';
import { Log } from './schemas/log.schema';

describe('LogsController', () => {
  let controller: LogsController;
  let service: LogsService;

  const mockLogsService = {
    findAll: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LogsController],
      providers: [
        { provide: LogsService, useValue: mockLogsService },
      ],
    }).compile();

    controller = module.get<LogsController>(LogsController);
    service = module.get<LogsService>(LogsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getAllLogs', () => {
    it('should return an array of logs', async () => {
      const result: Log[] = [
        { _id: '1', fecha: new Date(), usuario: 'user1', login: true },
        { _id: '2', fecha: new Date(), usuario: 'user2', login: false },
      ] as any; // cast para evitar erros se campos faltarem

      mockLogsService.findAll.mockResolvedValue(result);

      expect(await controller.getAllLogs()).toBe(result);
      expect(mockLogsService.findAll).toHaveBeenCalled();
    });
  });
});
