// prisma
import { User } from '@prisma/client';
// guard
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from 'src/auth/gql-auth.guard';
import { UserEntity } from 'src/common/decorators/user.decorator';
// service
import { MessagesService } from './messages.service';
// dto
import { CreateMessageInput } from './dto/create-message.input';
// graphql
import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
// models
import { Message, PaginatedMessage } from './models/messages.model';

@Resolver(() => Message)
@UseGuards(GqlAuthGuard)
export class MessagesResolver {
  constructor(private readonly messagesService: MessagesService) {}

  @Mutation(() => Message, { name: 'createMessage' })
  async createMessage(
    @UserEntity() user: User,
    @Args('createMessageInput') createMessageInput: CreateMessageInput,
  ) {
    createMessageInput.userId = user.id;
    return this.messagesService.create(createMessageInput);
  }

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

    // fixing the overflow of take and skip
    const remain = count - (take + skip) < 0 ? 0 : count - (take + skip);
    if (take > count) {
      take = take - remain;
    }

    return {
      messages: await this.messagesService.findAllMessagesByChatId(
        chatId,
        take,
        skip,
      ),
      meta: {
        totalCount: count,
        hasNextPage: count > take + skip,
        remainingCount: remain,
      },
    };
  }
}
