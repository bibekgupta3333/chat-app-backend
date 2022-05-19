// validator
import { IsNotEmpty } from 'class-validator';
// graphql
import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateMessageInput {
  @Field()
  @IsNotEmpty()
  content: string;

  userId?: string;

  chatId?: string;
}
