import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { AuthModule } from '../auth/auth.module';
import { NotesModule } from 'src/notes/notes.module';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  imports: [PrismaModule, AuthModule, NotesModule],
  exports: [UsersService],
})
export class UsersModule {}
