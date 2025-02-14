import { AuthDto } from '../dto/auth.dto';

export const AuthMoks: AuthDto = {
  email: 'teste@teste.com',
  password: 'largepassword',
};

export const prismaMock = {
  user: {
    findUnique: jest.fn(),
  },
};

export const jwtMock = {
  signAsync: jest.fn().mockResolvedValue('mocked-token'),
};

export const AuthServiceMock = {
  signIn: jest.fn(),
};
