import { HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { comparePassword } from '../utils/bcrypt';
import { AuthDto } from './dto/auth.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async signIn(authDto: AuthDto) {
    try {
      if (!authDto.email || !authDto.password) {
        return {
          success: false,
          message: 'Email e senha são obrigatórios',
          status: HttpStatus.BAD_REQUEST,
        };
      }

      const existUser = await this.prisma.user.findUnique({
        where: { email: authDto.email },
      });

      if (!existUser) {
        return {
          success: false,
          message: 'Usuario nao encontrado',
          status: HttpStatus.NOT_FOUND,
        };
      }

      const passwordMatch = await comparePassword(
        authDto.password,
        existUser.password,
      );

      if (!passwordMatch) {
        return {
          success: false,
          message: 'Credenciais invalidas',
          status: HttpStatus.UNAUTHORIZED,
        };
      }

      // Remover a senha do retorno antes de enviá-la
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = existUser;

      const payload = { sub: existUser.userId, username: existUser.email };

      return {
        success: true,
        message: 'Login bem-sucedido',

        user: result,
        token: {
          access_token: await this.jwtService.signAsync(payload),
        },

        status: HttpStatus.OK,
      };
    } catch (error) {
      console.error('Error:', error);
      return {
        success: false,
        message: 'Erro no servidor',
        status: HttpStatus.INTERNAL_SERVER_ERROR,
      };
    }
  }
}
