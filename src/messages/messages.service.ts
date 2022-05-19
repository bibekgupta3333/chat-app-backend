// nestjs
import { Injectable } from '@nestjs/common';
// prisma
import { PrismaService } from 'nestjs-prisma';
// dto
import { CreateMessageInput } from './dto/create-message.input';

@Injectable()
export class MessagesService {
  constructor(private prisma: PrismaService) {}
  async create(createMessageInput: CreateMessageInput) {
    const { content, userId, chatId } = createMessageInput;
    return await this.prisma.message.create({
      data: {
        content,
        user: {
          connect: {
            id: userId,
          },
        },
        chat: {
          connect: {
            id: chatId ?? undefined,
          },
        },
      },
      include: {
        chat: true,
        user: true,
      },
    });
  }
  count(chatId: string) {
    return this.prisma.message.count({
      where: {
        chat: {
          id: chatId,
        },
      },
    });
  }
  async findAllMessagesByChatId(chatId: string, take?: number, skip?: number) {
    return await this.prisma.message.findMany({
      where: {
        chat: {
          id: {
            equals: chatId,
          },
        },
      },
      include: {
        chat: true,
        user: true,
      },
      take: take,
      skip: skip,
      orderBy: {
        createdAt: 'asc',
      },
    });
  }
}
