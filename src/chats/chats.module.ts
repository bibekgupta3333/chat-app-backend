//  module
import { Module } from '@nestjs/common';
// service
import { ChatsService } from './chats.service';
// resolver
import { ChatsResolver } from './chats.resolver';

@Module({
  providers: [ChatsResolver, ChatsService],
})
export class ChatsModule {}
