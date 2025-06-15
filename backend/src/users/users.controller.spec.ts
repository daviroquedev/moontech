import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService, DeleteResponse } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

const mockUsersService = {
  create: jest.fn(),
  findAll: jest.fn(),
  update: jest.fn(),
  remove: jest.fn(),
};

describe('UsersController', () => {
  let controller: UsersController;

  beforeEach(async () => {
    jest.clearAllMocks(); // limpa os mocks antes de cada teste

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

  describe('findAll', () => {
    it('debería llamar al método findAll del servicio y devolver una lista vacía', async () => {
      mockUsersService.findAll.mockResolvedValue([]);
      const result = await controller.findAll();
      expect(mockUsersService.findAll).toHaveBeenCalled();
      expect(result).toEqual([]);
    });
  });

  describe('create', () => {
    it('debería llamar al método create del servicio con el DTO correcto', async () => {
      const dto: CreateUserDto = { nombre: 'Test', email: 'test@example.com', contrasena: '1234' };
      mockUsersService.create.mockResolvedValue(dto);
      const result = await controller.create(dto);
      expect(mockUsersService.create).toHaveBeenCalledWith(dto);
      expect(result).toEqual(dto);
    });
  });

  describe('update', () => {
    it('debería llamar al método update con id y DTO correctos', async () => {
      const dto: UpdateUserDto = { nombre: 'Updated' };
      const id = 'abc123';
      mockUsersService.update.mockResolvedValue({ id, ...dto });
      const result = await controller.update(id, dto);
      expect(mockUsersService.update).toHaveBeenCalledWith(id, dto);
      expect(result).toEqual({ id, ...dto });
    });
  });

  describe('remove', () => {
    it('debería llamar al método remove con id y devolver la respuesta de eliminación', async () => {
      const id = 'abc123';
      const deleteResponse: DeleteResponse = { message: 'Usuario eliminado exitosamente.' };
      mockUsersService.remove.mockResolvedValue(deleteResponse);
      const result = await controller.remove(id);
      expect(mockUsersService.remove).toHaveBeenCalledWith(id);
      expect(result).toEqual(deleteResponse);
    });
  });
});