// graphlq
import { ObjectType, Field } from '@nestjs/graphql';
// model
import { User } from '@src/users/models/user.model';
import { BaseModel } from '@src/common/models/base.model';
import { Message } from '@src/messages/models/messages.model';

@ObjectType()
export class Chat extends BaseModel {
  users: User[];

  @Field(() => [Message], { nullable: true })
  messages?: Message[];
}

@ObjectType()
export class ChatDeleteReturnType extends BaseModel {}
