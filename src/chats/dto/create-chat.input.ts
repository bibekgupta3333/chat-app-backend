// graphql
import { InputType } from '@nestjs/graphql';

@InputType()
export class CreateChatInput {
  messages?: string[];
  users: string[];
}
