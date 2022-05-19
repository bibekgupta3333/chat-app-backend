// graphql
import { InputType, Field } from '@nestjs/graphql';
// validator
import { IsNotEmpty, MinLength } from 'class-validator';

@InputType()
export class ChangePasswordInput {
  @Field()
  @IsNotEmpty()
  @MinLength(8)
  oldPassword: string;

  @Field()
  @IsNotEmpty()
  @MinLength(8)
  newPassword: string;
}
