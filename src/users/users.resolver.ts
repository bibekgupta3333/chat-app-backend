// model
import { User } from './models/user.model';
// utils
import { userSearchQuery } from './utils';
// prisma
import { PrismaService } from 'nestjs-prisma';
// service
import { UsersService } from './users.service';
// guard
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from 'src/auth/gql-auth.guard';
// dto
import { UpdateUserInput } from './dto/update-user.input';
import { ChangePasswordInput } from './dto/change-password.input';
// graphql
import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
// decorator
import { UserEntity } from 'src/common/decorators/user.decorator';

@Resolver(() => User)
@UseGuards(GqlAuthGuard)
export class UsersResolver {
  constructor(
    private usersService: UsersService,
    private prisma: PrismaService
  ) {}

  @Query(() => User)
  async me(@UserEntity() user: User): Promise<User> {
    return user;
  }

  @Query(() => [User])
  async getUsers(@Args('keyword') keyword?: string) {
    return this.prisma.user.findMany({
      where: keyword ? userSearchQuery(keyword) : {},
    });
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => User)
  async updateUser(
    @UserEntity() user: User,
    @Args('data') newUserData: UpdateUserInput
  ) {
    return this.usersService.updateUser(user.id, newUserData);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => User)
  async changePassword(
    @UserEntity() user: User,
    @Args('data') changePassword: ChangePasswordInput
  ) {
    return this.usersService.changePassword(
      user.id,
      user.password,
      changePassword
    );
  }
}
