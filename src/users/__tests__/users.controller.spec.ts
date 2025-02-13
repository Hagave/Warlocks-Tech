import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus } from '@nestjs/common';
import { UsersController } from '../users.controller';
import { UsersService } from '../users.service';

describe('UsersController', () => {
  let controller: UsersController;
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: {
            createUser: jest.fn(),
            updateUser: jest.fn(),
            deleteUser: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    service = module.get<UsersService>(UsersService);
  });

  describe('createUser', () => {
    it('deve criar um usuário com sucesso', async () => {
      const dto = { name: 'Joao', email: 'joao@teste.com' };
      (service.createUser as jest.Mock).mockResolvedValue({
        success: true,
        message: 'Usuario criado com sucesso!',
        status: HttpStatus.CREATED,
        user: { userId: 1, ...dto },
      });

      const result = await controller.createUser(dto);

      expect(result).toEqual({
        success: true,
        message: 'Usuario criado com sucesso!',
        status: HttpStatus.CREATED,
        user: { userId: 1, ...dto },
      });
      expect(service.createUser).toHaveBeenCalledWith(dto); // Verifica se o service foi chamado corretamente
    });
  });
});
