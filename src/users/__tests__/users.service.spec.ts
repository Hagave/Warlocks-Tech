import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from '../users.service';
import { PrismaService } from '../../prisma/prisma.service'; // Certifique-se de que o caminho está correto
import { HttpStatus } from '@nestjs/common';

describe('UsersService', () => {
  let service: UsersService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: PrismaService,
          useValue: {
            user: {
              findUnique: jest.fn(),
              create: jest.fn(),
              update: jest.fn(),
              delete: jest.fn(),
            },
          },
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  describe('createUser', () => {
    it('deve criar um usuário com sucesso', async () => {
      const dto = { name: 'Joao', email: 'joao@teste.com' };

      (prisma.user.findUnique as jest.Mock).mockResolvedValue(null);

      (prisma.user.create as jest.Mock).mockResolvedValue({
        userId: 1,
        ...dto,
      });

      const result = await service.createUser(dto);

      expect(result).toEqual({
        success: true,
        message: 'Usuario criado com sucesso!',
        status: HttpStatus.CREATED,
        user: { userId: 1, ...dto },
      });
    });

    it('deve retornar erro se o usuário já existir', async () => {
      const dto = { name: 'Joao', email: 'joao@teste.com' };

      (prisma.user.findUnique as jest.Mock).mockResolvedValue(dto);

      const result = await service.createUser(dto);

      expect(result).toEqual({
        success: false,
        message: 'Usuario já cadastrado no banco de dados!',
        status: HttpStatus.CONFLICT,
      });
    });
  });

  describe('updateUser', () => {
    it('deve atualizar um usuário existente', async () => {
      const dto = { name: 'Joao Andrade', email: 'joao@teste.com' };

      (prisma.user.findUnique as jest.Mock).mockResolvedValue({
        userId: 1,
        ...dto,
      });

      (prisma.user.update as jest.Mock).mockResolvedValue({
        userId: 1,
        ...dto,
      });

      const result = await service.updateUser(1, dto);

      expect(result).toBeUndefined();
    });

    it('deve retornar erro se o usuário não for encontrado', async () => {
      (prisma.user.findUnique as jest.Mock).mockResolvedValue(null);

      const result = await service.updateUser(1, {
        name: 'Test',
        email: 'test@teste.com',
      });

      expect(result).toEqual({
        success: false,
        message: 'Usuário não foi encontrado!',
        status: HttpStatus.NOT_FOUND,
      });
    });
  });

  describe('deleteUser', () => {
    it('deve remover um usuário existente', async () => {
      (prisma.user.findUnique as jest.Mock).mockResolvedValue({ userId: 1 });

      (prisma.user.delete as jest.Mock).mockResolvedValue({ userId: 1 });

      const result = await service.deleteUser(1);

      expect(result).toEqual({
        success: true,
        message: 'Usuário removido com sucesso!',
        status: HttpStatus.OK,
        deletedUser: { userId: 1 },
      });
    });

    it('deve retornar erro se o usuário não for encontrado', async () => {
      (prisma.user.findUnique as jest.Mock).mockResolvedValue(null);

      const result = await service.deleteUser(1);

      expect(result).toEqual({
        success: false,
        message: 'Usuário não foi encontrado!',
        status: HttpStatus.NOT_FOUND,
      });
    });
  });
});
