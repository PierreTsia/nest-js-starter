import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ItemsService } from './items.service';
import { ItemType } from './dto/item.type';
import { ItemInput } from './dto/item.input';
import { ItemArgs } from './dto/item.args';
import { UseGuards } from '@nestjs/common';
import { RolesGuard } from '../auth/guards/roles.guards';
import { CurrentUser } from '../auth/current-user.decorator';
import { UserType } from '../users/dto/user.type';
import { Role } from '../auth/roles.enum';
import { Roles } from '../auth/roles.decorator';

@Resolver()
export class ItemsResolver {
  constructor(private itemsService: ItemsService) {}

  @Roles(Role.Admin)
  @UseGuards(RolesGuard)
  @Query(() => [ItemType])
  async items(@CurrentUser() user: UserType): Promise<ItemType[]> {
    return this.itemsService.findAll();
  }

  @Roles(Role.Member)
  @UseGuards(RolesGuard)
  @Query(() => ItemType)
  async item(@Args() args: ItemArgs, @CurrentUser() user: UserType) {
    return await this.itemsService.findOne(args.id);
  }

  @Roles(Role.Member)
  @UseGuards(RolesGuard)
  @Mutation(() => ItemType)
  async createItem(@Args('input') input: ItemInput): Promise<ItemType> {
    return this.itemsService.create(input);
  }

  @Roles(Role.Member)
  @UseGuards(RolesGuard)
  @Mutation(() => ItemType)
  async updateItem(
    @Args() item: ItemArgs,
    @Args('input') input: ItemInput,
  ): Promise<ItemInput> {
    return this.itemsService.update(item.id, input);
  }

  @Roles(Role.Member)
  @UseGuards(RolesGuard)
  @Mutation(() => ItemType)
  async deleteItem(@Args() item: ItemArgs): Promise<ItemInput> {
    return this.itemsService.delete(item.id);
  }

  @Roles(Role.Admin)
  @UseGuards(RolesGuard)
  @Mutation(() => [ItemType])
  async populateItems(@Args('count') count: number): Promise<ItemType[]> {
    return this.itemsService.populate(count);
  }
}
