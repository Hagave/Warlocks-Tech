import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from '../auth.service';
import { PrismaService } from '../../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { comparePassword } from '../../utils/bcrypt';
import { AuthMoks, jwtMock, prismaMock } from '../__moks__/auth.service.mock';
import { HttpStatus } from '@nestjs/common';

jest.mock('../../utils/bcrypt', () => ({
  comparePassword: jest.fn(),
}));

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: PrismaService, useValue: prismaMock },
        { provide: JwtService, useValue: jwtMock },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return BAD_REQUEST if email or password is missing', async () => {
    const result = await service.signIn({ email: '', password: '' });

    expect(result).toEqual({
      success: false,
      message: 'Email e senha são obrigatórios',
      status: HttpStatus.BAD_REQUEST,
    });
  });

  it('should return NOT_FOUND if user does not exist', async () => {
    prismaMock.user.findUnique.mockResolvedValue(null);

    const result = await service.signIn(AuthMoks);

    expect(result).toEqual({
      success: false,
      message: 'Usuário não encontrado',
      status: HttpStatus.NOT_FOUND,
    });
  });

  it('should return UNAUTHORIZED if password is incorrect', async () => {
    prismaMock.user.findUnique.mockResolvedValue({
      userId: 1,
      email: AuthMoks.email,
      password: 'hashedpassword',
    });

    (comparePassword as jest.Mock).mockResolvedValue(false);

    const result = await service.signIn(AuthMoks);

    expect(result).toEqual({
      success: false,
      message: 'Credenciais invalidas',
      status: HttpStatus.UNAUTHORIZED,
    });
  });

  it('should return OK and a token if login is successful', async () => {
    prismaMock.user.findUnique.mockResolvedValue({
      email: AuthMoks.email,
      password: 'hashedpassword',
    });

    (comparePassword as jest.Mock).mockResolvedValue(true);

    const result = await service.signIn(AuthMoks);

    expect(result).toEqual({
      success: true,
      message: 'Login bem-sucedido',

      user: { email: AuthMoks.email },
      token: { access_token: 'mocked-token' },

      status: HttpStatus.OK,
    });
  });
});
