// dto
import { CreateMessageInput } from './create-message.input';
// graphql
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateMessageInput extends PartialType(CreateMessageInput) {
  @Field(() => Int)
  id: number;
}
