// nest
import { Module } from '@nestjs/common';
// service
import { MessagesService } from './messages.service';
// resolver
import { MessagesResolver } from './messages.resolver';

@Module({
  providers: [MessagesResolver, MessagesService],
})
export class MessagesModule {}
