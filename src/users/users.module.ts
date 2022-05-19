// module
import { Module } from '@nestjs/common';

// services
import { UsersResolver } from './users.resolver';
import { UsersService } from './users.service';
import { PasswordService } from 'src/auth/password.service';

@Module({
  imports: [],
  providers: [UsersResolver, UsersService, PasswordService],
})
export class UsersModule {}
