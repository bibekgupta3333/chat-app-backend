// service
import { AppService } from './app.service';
import { GqlConfigService } from './gql-config.service';
// config
import { ConfigModule } from '@nestjs/config';
import config from 'src/common/configs/config';
// controller
import { AppResolver } from './app.resolver';
import { AppController } from './app.controller';
// graphql
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
// middlewares
import { loggingMiddleware } from 'src/common/middleware/logging.middleware';
// modules
import { Module } from '@nestjs/common';
import { PrismaModule } from 'nestjs-prisma';
import { AuthModule } from 'src/auth/auth.module';
import { ChatsModule } from './chats/chats.module';
import { UsersModule } from 'src/users/users.module';
import { MessagesModule } from './messages/messages.module';
import { PubsubModule } from './pubsub/pubsub.module';
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [config] }),
    PrismaModule.forRoot({
      isGlobal: true,
      prismaServiceOptions: {
        middlewares: [loggingMiddleware()], // configure your prisma middleware
      },
    }),

    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      driver: ApolloDriver,
      useClass: GqlConfigService,
    }),
    AuthModule,
    UsersModule,
    ChatsModule,
    MessagesModule,
    PubsubModule,
  ],
  controllers: [AppController],
  providers: [AppService, AppResolver],
})
export class AppModule {}
