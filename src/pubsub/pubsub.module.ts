// nest
import { Global, Module } from '@nestjs/common';
// redis
import { RedisPubSub } from 'graphql-redis-subscriptions';
// config
import { ConfigService, ConfigModule } from '@nestjs/config';

export const PUB_SUB = 'PUB_SUB';

@Global()
@Module({
  imports: [ConfigModule],
  providers: [
    {
      provide: PUB_SUB,
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        console.log(
          ` Redis host running at http://${configService.get(
            'REDIS_HOST',
          )}/${configService.get('REDIS_PORT')}`,
        );

        return new RedisPubSub({
          connection: {
            host: configService.get('REDIS_HOST'),
            port: configService.get('REDIS_PORT'),
          },
        });
      },
    },
  ],
  exports: [PUB_SUB],
})
export class PubsubModule {}
