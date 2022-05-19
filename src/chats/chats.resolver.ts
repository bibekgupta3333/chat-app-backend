// prisma
import { User } from '@prisma/client';
// nest
import { NotFoundException } from '@nestjs/common';
// service
import { ChatsService } from './chats.service';
// guard
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '@src/auth/gql-auth.guard';
import { UserEntity } from '@src/common/decorators/user.decorator';
// graphql
import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
// dto
import { CreateChatInput } from './dto/create-chat.input';
// model
import { Chat, ChatDeleteReturnType } from './models/chat.model';

@Resolver(() => Chat)
@UseGuards(GqlAuthGuard)
export class ChatsResolver {
  constructor(private readonly chatsService: ChatsService) {}

  @Mutation(() => Chat, { name: 'createChat' })
  async createChat(@Args('createChatInput') createChatInput: CreateChatInput) {
    return this.chatsService.create(createChatInput);
  }

  @Query(() => [Chat], { name: 'findChatsByUserId' })
  findAllByUserId(@Args('userId') userId: string) {
    return this.chatsService.findAllByUserId(userId);
  }

  @Query(() => Chat, { name: 'findChatById' })
  findOne(@UserEntity() user: User, @Args('id') id: string) {
    return this.chatsService.findOne(user.id, id);
  }

  @Mutation(() => ChatDeleteReturnType, { name: 'deleteChat' })
  async delete(@Args('id') id: string) {
    try {
      await this.chatsService.delete(id);
      return { id };
    } catch (error) {
      throw new NotFoundException(`Chat with id ${id} not found`);
    }
  }
}
