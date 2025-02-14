import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from '../auth.controller';
import { AuthService } from '../auth.service';
import { AuthServiceMock } from '../__moks__/auth.service.mock';

// Mocks

describe('AuthController', () => {
  let controller: AuthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: AuthServiceMock,
        },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('Deve chamar o serviço signIn ao tentar logar', async () => {
    const mockAuthDto = { email: 'teste@teste.com', password: 'password' };
    const mockResponse = {
      success: true,
      message: 'Login bem-sucedido',
      user: {
        userId: 1,
        email: mockAuthDto.email,
        token: { access_token: 'mocked-token' },
      },
      status: 200,
    };

    AuthServiceMock.signIn.mockResolvedValue(mockResponse);

    const result = await controller.signIn(mockAuthDto);

    expect(result).toEqual(mockResponse);

    expect(AuthServiceMock.signIn).toHaveBeenCalledWith(mockAuthDto);
  });
});
