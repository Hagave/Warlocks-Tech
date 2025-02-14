import { AuthGuard } from '../auth.guard';
import { ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

describe('AuthGuard', () => {
  let authGuard: AuthGuard;
  let jwtService: JwtService;

  beforeEach(() => {
    jwtService = new JwtService({});
    authGuard = new AuthGuard(jwtService);
  });

  it('Deve lançar UnauthorizedException se o token não for fornecido', async () => {
    const mockRequest = {
      headers: {},
    };

    const mockContext = {
      switchToHttp: () => ({
        getRequest: () => mockRequest,
      }),
    } as ExecutionContext;

    await expect(authGuard.canActivate(mockContext)).rejects.toThrow(
      new UnauthorizedException('Você está deslogado. Por favor, faça login.'),
    );
  });

  it('Deve lançar UnauthorizedException se o token for inválido', async () => {
    const mockRequest = {
      headers: {
        authorization: 'Bearer invalid-token',
      },
    };

    const mockContext = {
      switchToHttp: () => ({
        getRequest: () => mockRequest,
      }),
    } as ExecutionContext;

    jest.spyOn(jwtService, 'verify').mockImplementation(() => {
      throw new Error('Token inválido');
    });

    await expect(authGuard.canActivate(mockContext)).rejects.toThrow(
      new UnauthorizedException('Token invalido'),
    );
  });
});
