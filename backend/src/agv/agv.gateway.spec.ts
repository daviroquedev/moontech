import { Test, TestingModule } from '@nestjs/testing';
import { AgvGateway } from './agv.gateway';

describe('AgvGateway', () => {
  let gateway: AgvGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AgvGateway],
    }).compile();

    gateway = module.get<AgvGateway>(AgvGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
