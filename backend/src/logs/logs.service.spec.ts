import { Test, TestingModule } from '@nestjs/testing';
import { LogsService } from './logs.service';
import { getModelToken } from '@nestjs/mongoose';
import { LogsGateway } from './logs.gateway';

describe('LogsService', () => {
  let service: LogsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LogsService,
        {
          provide: getModelToken('Log'),
          useValue: {}, // pode melhorar com mocks reais se precisar
        },
        {
          provide: LogsGateway,
          useValue: {}, // ou mock funcional
        },
      ],
    }).compile();

    service = module.get<LogsService>(LogsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});