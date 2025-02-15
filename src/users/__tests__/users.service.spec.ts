/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from '../users.service';
import { PrismaService } from '../../prisma/prisma.service';
import { HttpStatus } from '@nestjs/common';
import {
  UserServiceMoks,
  UserDto,
  NotesMock,
} from '../__moks__/user.service.mock';
import { CreateUserDto } from '../dto/create-user.dto';

describe('UsersService', () => {
  let service: UsersService;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: PrismaService,
          useValue: {
            user: UserServiceMoks,
            notes: NotesMock,
          },
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('deve retornar erro se o DTO for invalido', async () => {
    const dto: CreateUserDto = { name: '', email: '', password: '' };

    const result = await service.createUser(dto);

    expect(result).toEqual({
      success: false,
      message: 'Dados inválidos!',
      status: HttpStatus.BAD_REQUEST,
    });
  });

  it('retornar erro caso usuario ja exista', async () => {
    UserServiceMoks.findUnique.mockReturnValue({
      email: 'teste@teste.com',
    });

    const result = await service.createUser(UserDto);

    expect(result).toEqual({
      success: false,
      message: 'Usuario já cadastrado no banco de dados!',
      status: HttpStatus.CONFLICT,
    });
  });

  it('deve retornar Ok na criacao do usuario', async () => {
    UserServiceMoks.findUnique.mockResolvedValue(null);

    UserServiceMoks.create.mockResolvedValue({
      userId: 1,
      name: UserDto.name,
      email: UserDto.email,
      password: 'hashedPassword',
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    const result = await service.createUser(UserDto);

    expect(result).toEqual({
      success: true,
      message: 'Usuario criado com sucesso!',
      status: HttpStatus.CREATED,
      user: {
        userId: 1,
        name: UserDto.name,
        email: UserDto.email,
        password: 'hashedPassword',
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date),
      },
    });
  });

  it('deve atualizar um usuario', async () => {
    UserServiceMoks.findUnique.mockResolvedValue(UserDto);

    UserServiceMoks.update.mockResolvedValue({
      ...UserDto,
      updatedAt: new Date(),
    });

    const result = await service.updateUser(1, UserDto);

    expect(result).toEqual({
      success: true,
      message: 'Usuário atualizado!',
      status: HttpStatus.OK,
      user: {
        name: UserDto.name,
        email: UserDto.email,
        updateAt: expect.any(Date),
      },
    });
  });

  it('deve deletar um usuário e notas existentes associadas a ele', async () => {
    UserServiceMoks.findUnique.mockResolvedValue(UserDto);
    UserServiceMoks.delete.mockResolvedValue(UserDto);
    NotesMock.deleteMany.mockResolvedValue({ count: 3 });
    const result = await service.deleteUser(1);

    expect(result).toEqual({
      success: true,
      message: 'Usuário e notas associadas foram removidos com sucesso!',
      status: HttpStatus.OK,
    });
  });
});
