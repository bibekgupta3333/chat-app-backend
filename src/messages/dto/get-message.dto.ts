// graphql
import { InputType } from '@nestjs/graphql';

@InputType()
export class GetMessageByChatIdInput {
  take?: number;

  skip?: number;
}
