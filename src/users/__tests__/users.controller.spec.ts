import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from '../users.controller';
import { UsersService } from '../users.service';
import {
  JWTController,
  UserControllerMocks,
  UserDto,
} from '../__moks__/user.controller.mock';
import { JwtService } from '@nestjs/jwt';

describe('UsersController', () => {
  let controller: UsersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: UserControllerMocks,
        },
        {
          provide: JwtService,
          useValue: JWTController,
        },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('deve chamar UserService.createuser com os dados corretos', async () => {
    const serviceSpy = jest
      .spyOn(UserControllerMocks, 'createUser')
      .mockResolvedValue(undefined);
    await controller.createUser(UserDto);

    expect(serviceSpy).toHaveBeenCalledWith(UserDto);
  });

  it('deve chamar a UserService.update com os dados corretos', async () => {
    const serviceSpy = jest
      .spyOn(UserControllerMocks, 'updateUser')
      .mockResolvedValue(undefined);

    const userId = { user: { sub: 1 } };

    await controller.update(UserDto, userId);

    expect(serviceSpy).toHaveBeenCalledWith(1, UserDto);
  });

  it('deve chamar a UserService.delete com os dados corretos', async () => {
    const serviceSpy = jest
      .spyOn(UserControllerMocks, 'deleteUser')
      .mockResolvedValue(undefined);
    const userId = { user: { sub: 1 } };

    await controller.remove(userId);

    expect(serviceSpy).toHaveBeenCalledWith(1);
  });
});
