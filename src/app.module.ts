import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { NotesModule } from './notes/notes.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [UsersModule, NotesModule, AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
