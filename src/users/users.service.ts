import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from '../prisma/prisma.service';
import { comparePassword, hashPassword } from '../utils/bcrypt';

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
      const isUser = await comparePassword(
        updateUserDto.password,
        existedUser.password,
      );

      if (!isUser) {
        return {
          success: false,
          message: 'Por favor, reveja suas credenciais!',
          status: HttpStatus.FORBIDDEN,
        };
      }
      if (!updateUserDto.newPassword) {
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
            createdAt: userUpdated.createdAt,
            updatedAt: userUpdated.updatedAt,
          },
        };
      }

      // Se a nova senha for passada, faz a alteração da senha também
      const hashedPassword = await hashPassword(updateUserDto.newPassword);
      const userUpdated = await this.prisma.user.update({
        where: { userId: id },
        data: {
          name: updateUserDto.name,
          email: updateUserDto.email,
          password: hashedPassword, // Atualiza a senha
        },
      });

      return {
        success: true,
        message: 'Usuário atualizado!',
        status: HttpStatus.OK,
        user: {
          name: userUpdated.name,
          email: userUpdated.email,
          createdAt: userUpdated.createdAt,
          updatedAt: userUpdated.updatedAt,
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

      await this.prisma.notes.deleteMany({
        where: { userId: id },
      });

      return {
        success: true,
        message: 'Usuário e notas associadas foram removidos com sucesso!',
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
