// graphql
import { Field, ObjectType } from '@nestjs/graphql';
// models
import { Chat } from '@src/chats/models/chat.model';
import { User } from '@src/users/models/user.model';
import { BaseModel } from '@src/common/models/base.model';

@ObjectType()
export class Message extends BaseModel {
  @Field(() => User, { nullable: true })
  user?: User;
  @Field(() => Chat, { nullable: true })
  chat?: Chat;
  content?: string;
}

@ObjectType()
export class SubscriptionMessage {
  message?: Message;
}

@ObjectType()
export class PaginatedMetaInfo {
  totalCount: number;
  hasNextPage: boolean;
  remainingCount: number;
}

@ObjectType()
export class PaginatedMessage extends BaseModel {
  messages: Message[];
  meta: PaginatedMetaInfo;
}
