// guard
import { AuthGuard } from '@nestjs/passport';
// graphql
import { GqlExecutionContext } from '@nestjs/graphql';
// nest
import { Injectable, ExecutionContext } from '@nestjs/common';

@Injectable()
export class GqlAuthGuard extends AuthGuard('jwt') {
  getRequest(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);
    return ctx.getContext().req;
  }
}
