// nest
import { ObjectType } from '@nestjs/graphql';
// models
import { Token } from './token.model';
import { User } from 'src/users/models/user.model';

@ObjectType()
export class Auth extends Token {
  user: User;
}
