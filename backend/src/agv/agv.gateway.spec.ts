import { Test, TestingModule } from '@nestjs/testing';
import { AgvGateway } from './agv.gateway';
import { AgvService } from './agv.service';
import { Server } from 'socket.io';

describe('AgvGateway', () => {
  let gateway: AgvGateway;
  let agvService: AgvService;

  const mockAgvService = {
    setCommand: jest.fn(),
    update: jest.fn(() => ({
      id: 'AGV-01',
      x: 100,
      y: 100,
      angle: 0,
      speed: 0,
      turnSpeed: 0,
    })),
  };

  beforeEach(async () => {
    jest.useFakeTimers(); // Ativa timers falsos

    jest.spyOn(global, 'setInterval'); // Espiona setInterval global

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AgvGateway,
        {
          provide: AgvService,
          useValue: mockAgvService,
        },
      ],
    }).compile();

    gateway = module.get<AgvGateway>(AgvGateway);
    agvService = module.get<AgvService>(AgvService);
    gateway.server = { emit: jest.fn() } as any as Server;
  });

  afterEach(() => {
    jest.clearAllTimers();
    jest.useRealTimers();
    jest.restoreAllMocks(); 
  });

  it('deve estar definido', () => {
    expect(gateway).toBeDefined();
  });

  describe('handleControlCommand', () => {
    it('deve chamar agvService.setCommand com a ação e valor corretos', () => {
      const clientMock = { id: 'client-123' } as any;
      const command = { action: 'move', value: 10 };

      gateway.handleControlCommand(clientMock, command);

      expect(mockAgvService.setCommand).toHaveBeenCalledWith('move', 10);
    });
  });

  describe('afterInit', () => {
    it('deve iniciar o intervalo e emitir atualizações do AGV', () => {
      const emitSpy = jest.spyOn(gateway.server, 'emit');

      gateway.afterInit(); 

      expect(setInterval).toHaveBeenCalled();

      jest.advanceTimersByTime(1000 / 30); 

      expect(emitSpy).toHaveBeenCalledWith('agv-update', expect.any(Object)); 
    });
  });
});
