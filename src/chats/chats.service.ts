// nest
import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
// dto
import { CreateChatInput } from './dto/create-chat.input';

@Injectable()
export class ChatsService {
  constructor(private prisma: PrismaService) {}

  async create(createChatInput: CreateChatInput) {
    const { messages, users } = createChatInput;

    // check whether users have a chatted before
    const chats = await this.prisma.chat.findMany({
      where: {
        users: {
          every: {
            id: {
              in: [...users],
            },
          },
        },
      },
      include: {
        users: true,
        messages: true,
      },
    });

    if (chats.length > 0) {
      throw new BadRequestException('Chat with users already exists');
    }

    return await this.prisma.chat.create({
      data: {
        messages: {
          connect: messages
            ? messages.map((message) => ({ id: message }))
            : undefined,
        },
        users: {
          connect: users.map((user) => ({ id: user })),
        },
      },
      include: {
        users: true,
        messages: true,
      },
    });
  }

  findAllByUserId(userId: string) {
    return this.prisma.chat.findMany({
      where: {
        users: {
          some: {
            id: {
              in: [userId],
            },
          },
        },
      },
      include: {
        users: true,
      },
    });
  }

  findOne(userId: string, id: string) {
    return this.prisma.chat.findFirst({
      where: {
        id: id,
        users: {
          some: {
            id: {
              in: [userId],
            },
          },
        },
      },
      include: {
        users: true,
        messages: true,
      },
    });
  }

  async delete(id: string) {
    await this.prisma.chat.delete({
      where: {
        id: id,
      },
    });
  }
}
