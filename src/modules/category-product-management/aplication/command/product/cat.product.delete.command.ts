import { Inject } from '@nestjs/common/decorators';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import {
  CATEGORY_PRODUCT_REPOSITORY,
  CategoryProductRepository,
} from '../../ports/cat.product.repository';

export class CatProductDeleteCommand {
  id: string;
}

@CommandHandler(CatProductDeleteCommand)
export class CatProductDeleteCommandHandler
  implements ICommandHandler<CatProductDeleteCommand>
{
  constructor(
    @Inject(CATEGORY_PRODUCT_REPOSITORY)
    private readonly catproductRepo: CategoryProductRepository,
  ) {}
  async execute(command: CatProductDeleteCommand) {
    try {
      return await this.catproductRepo.deleteCatProduct(command);
    } catch (error) {
      console.trace(error);
      throw error;
    }
  }
}
