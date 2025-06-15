import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UsersService } from './users.service';
import { User, UserDocument } from './schemas/user.schema';


const mockUser = {
  _id: 'some-id',
  nombre: 'Teste User',
  email: 'test@example.com',
  activo: true,
};

describe('UsersService', () => {
  let service: UsersService;
  let model: Model<UserDocument>;

 
  beforeEach(async () => {
 
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
       
          provide: getModelToken(User.name),
       
          useValue: {
            find: jest.fn().mockReturnThis(), 
            select: jest.fn().mockReturnThis(), 
            exec: jest.fn().mockResolvedValue([mockUser]), 
          },
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    model = module.get<Model<UserDocument>>(getModelToken(User.name));
  });


  it('debe estar definido', () => {
    expect(service).toBeDefined();
  });

  // Segundo teste: testar o método findAll
  describe('findAll', () => {
    it('debe encontrar todos los usuarios', async () => {
      const users = await service.findAll();
     
      expect(model.find).toHaveBeenCalled();
      expect(users).toEqual([mockUser]);
    });
  });
});
