// graphql
import { GraphQLJWT } from 'graphql-scalars';
// nestjs
import { ArgsType, Field } from '@nestjs/graphql';
// validators
import { IsJWT, IsNotEmpty } from 'class-validator';

@ArgsType()
export class RefreshTokenInput {
  @IsNotEmpty()
  @IsJWT()
  @Field(() => GraphQLJWT)
  token: string;
}
