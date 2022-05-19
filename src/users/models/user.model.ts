// graphql
import { ObjectType, HideField } from '@nestjs/graphql';
// model
import { BaseModel } from 'src/common/models/base.model';

@ObjectType()
export class User extends BaseModel {
  email: string;
  isOnline?: boolean;
  @HideField()
  password: string;
}
