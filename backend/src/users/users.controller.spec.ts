import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';


const mockUsersService = {
  findAll: jest.fn(() => Promise.resolve([])),
 
};

describe('UsersController', () => {
  let controller: UsersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: mockUsersService,
        },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('debería estar definido', () => {
    expect(controller).toBeDefined();
  });

  it('debería llamar al método findAll del servicio al obtener todos los usuarios', async () => {
    await controller.findAll();
    expect(mockUsersService.findAll).toHaveBeenCalled();
  });
});
