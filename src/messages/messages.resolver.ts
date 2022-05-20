// prisma
import { User } from '@prisma/client';
// guard
import { Inject, UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from 'src/auth/gql-auth.guard';
import { UserEntity } from 'src/common/decorators/user.decorator';
// service
import { MessagesService } from './messages.service';
// dto
import { CreateMessageInput } from './dto/create-message.input';
// graphql
import { Resolver, Query, Mutation, Args, Subscription } from '@nestjs/graphql';
// models
import {
  Message,
  PaginatedMessage,
  SubscriptionMessage,
} from './models/messages.model';
//modules
import { PUB_SUB } from '@src/pubsub/pubsub.module';
// redis
import { RedisPubSub } from 'graphql-redis-subscriptions';
// types
import { SUBSCRIPTION_EVENTS } from './types';

@Resolver(() => Message)
export class MessagesResolver {
  allSubscribers: Message[] = [];
  constructor(
    private readonly messagesService: MessagesService,
    @Inject(PUB_SUB) private readonly pubSub: RedisPubSub,
  ) {}

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Message, { name: 'createMessage' })
  async createMessage(
    @UserEntity() user: User,
    @Args('createMessageInput') createMessageInput: CreateMessageInput,
  ) {
    createMessageInput.userId = user.id;
    const message = await this.messagesService.create(createMessageInput);
    console.log(message);
    this.pubSub.publish(SUBSCRIPTION_EVENTS.NEW_MESSAGE, {
      message: message,
    });
    return message;
  }

  @Subscription(() => SubscriptionMessage, { name: 'subscribeNewMessage' })
  subscribeNewMessage() {
    return this.pubSub.asyncIterator(SUBSCRIPTION_EVENTS.NEW_MESSAGE);
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => PaginatedMessage, {
    name: 'findAllMessageByChatId',
  })
  async findAllByChatId(
    @Args('chatId') chatId: string,
    @Args('take') take?: number,
    @Args('skip') skip?: number,
  ) {
    const count = await this.messagesService.count(chatId);
    take = take ?? 0;
    skip = skip ?? 0;
    return {
      messages: await this.messagesService.findAllMessagesByChatId(
        chatId,
        take,
        skip,
      ),
      meta: {
        totalCount: count,
        hasNextPage: count > take + skip,
        remainingCount: count % (take + skip),
      },
    };
  }
}
