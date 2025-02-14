import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from '../prisma/prisma.service';
import { hashPassword } from '../utils/bcrypt';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}
  async createUser(createUserDto: CreateUserDto) {
    if (
      !createUserDto ||
      !createUserDto.name ||
      !createUserDto.email ||
      !createUserDto.password
    ) {
      return {
        success: false,
        message: 'Dados inválidos!',
        status: HttpStatus.BAD_REQUEST,
      };
    }
    const existedUser = await this.prisma.user.findUnique({
      where: {
        email: createUserDto.email,
      },
    });
    if (existedUser) {
      return {
        success: false,
        message: 'Usuario já cadastrado no banco de dados!',
        status: HttpStatus.CONFLICT,
      };
    }

    const hashedPassword = await hashPassword(createUserDto.password);

    try {
      const user = await this.prisma.user.create({
        data: {
          name: createUserDto.name,
          email: createUserDto.email,
          password: hashedPassword,
        },
      });
      return {
        success: true,
        message: 'Usuario criado com sucesso!',
        status: HttpStatus.CREATED,
        user,
      };
    } catch {
      return {
        success: false,
        message: 'Erro ao criar o usuário. Tente novamente mais tarde.',
        status: HttpStatus.INTERNAL_SERVER_ERROR,
      };
    }
  }

  async updateUser(id: number, updateUserDto: UpdateUserDto) {
    if (!updateUserDto) {
      return {
        success: false,
        message: 'Dados inválidos!',
        status: HttpStatus.BAD_REQUEST,
      };
    }
    const existedUser = await this.prisma.user.findUnique({
      where: { userId: id },
    });

    if (!existedUser) {
      return {
        success: false,
        message: 'Usuário não foi encontrado!',
        status: HttpStatus.NOT_FOUND,
      };
    }

    try {
      const userUpdated = await this.prisma.user.update({
        where: { userId: id },
        data: {
          name: updateUserDto.name,
          email: updateUserDto.email,
        },
      });
      return {
        success: true,
        message: 'Usuário atualizado!',
        status: HttpStatus.OK,
        user: {
          name: userUpdated.name,
          email: userUpdated.email,
          updateAt: userUpdated.updatedAt,
        },
      };
    } catch (error) {
      console.error(error);
      return {
        success: false,
        message: 'Erro ao atualizar o usuário. Tente novamente mais tarde.',
        status: HttpStatus.INTERNAL_SERVER_ERROR,
      };
    }
  }

  async deleteUser(id: number) {
    const existedUser = await this.prisma.user.findUnique({
      where: { userId: id },
    });

    if (!existedUser) {
      return {
        success: false,
        message: 'Usuário não foi encontrado!',
        status: HttpStatus.NOT_FOUND,
      };
    }

    try {
      await this.prisma.user.delete({
        where: { userId: id },
      });

      return {
        success: true,
        message: 'Usuário removido com sucesso!',
        status: HttpStatus.OK,
      };
    } catch (error) {
      console.error(error);
      return {
        success: false,
        message: 'Erro ao remover o usuário. Tente novamente mais tarde.',
        status: HttpStatus.INTERNAL_SERVER_ERROR,
      };
    }
  }
}
