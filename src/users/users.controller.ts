/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {
  Controller,
  Post,
  Body,
  Patch,
  Delete,
  ValidationPipe,
  UseGuards,
  Req,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthGuard } from '../auth/auth.guard';
import { ApiOperation } from '@nestjs/swagger';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiOperation({
    description: 'Criação de cadastro do usuário',
  })
  createUser(@Body(new ValidationPipe()) createUserDto: CreateUserDto) {
    return this.usersService.createUser(createUserDto);
  }

  @UseGuards(AuthGuard)
  @ApiOperation({
    description:
      'Atualização de cadastro do usuário. O `userId` é passado via JWT.',
  })
  @Patch('user_update')
  update(
    @Body(new ValidationPipe()) updateUserDto: UpdateUserDto,
    @Req() req: any,
  ) {
    const userId = req.user.sub;
    return this.usersService.updateUser(+userId, updateUserDto);
  }

  @UseGuards(AuthGuard)
  @ApiOperation({
    description: 'Deletar cadastro do usuário. O `userId` é passado via JWT.',
  })
  @Delete('delete_user')
  remove(@Req() req: any) {
    const userId = req.user.sub;
    return this.usersService.deleteUser(+userId);
  }
}
