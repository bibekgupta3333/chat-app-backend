// nest
import { Module } from '@nestjs/common';
// service
import { MessagesService } from './messages.service';
// resolver
import { MessagesResolver } from './messages.resolver';
// pubsub
import { PubsubModule } from '@src/pubsub/pubsub.module';

@Module({
  imports: [PubsubModule],
  providers: [MessagesResolver, MessagesService],
})
export class MessagesModule {}
