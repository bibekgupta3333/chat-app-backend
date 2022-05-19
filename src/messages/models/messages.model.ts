// graphql
import { ObjectType } from '@nestjs/graphql';
// models
import { Chat } from '@src/chats/models/chat.model';
import { User } from '@src/users/models/user.model';
import { BaseModel } from '@src/common/models/base.model';

@ObjectType()
export class Message extends BaseModel {
  user: User;
  chat: Chat;
  content: string;
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
