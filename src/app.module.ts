import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { NotesModule } from './notes/notes.module';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    UsersModule,
    NotesModule,
    PrismaModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
