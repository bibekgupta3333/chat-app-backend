// dto
import { CreateChatInput } from './create-chat.input';
// graphql
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateChatInput extends PartialType(CreateChatInput) {
  @Field(() => Int)
  id: number;
}
