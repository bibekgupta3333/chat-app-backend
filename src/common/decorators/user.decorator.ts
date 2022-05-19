// graphql
import { GqlExecutionContext } from '@nestjs/graphql';
// nest
import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const UserEntity = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) =>
    GqlExecutionContext.create(ctx).getContext().req.user
);
