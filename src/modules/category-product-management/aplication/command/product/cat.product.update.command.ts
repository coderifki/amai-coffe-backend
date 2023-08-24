import { Inject } from '@nestjs/common/decorators';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import {
  CategoryProductRepository,
  CATEGORY_PRODUCT_REPOSITORY,
} from '../../ports/cat.product.repository';

export class CatProductUpdateCommand {
  id: string;
  name: string;
}

@CommandHandler(CatProductUpdateCommand)
export class CatProductUpdateCommandHandler
  implements ICommandHandler<CatProductUpdateCommand>
{
  constructor(
    @Inject(CATEGORY_PRODUCT_REPOSITORY)
    private readonly catproductRepo: CategoryProductRepository,
  ) {}
  async execute(command: CatProductUpdateCommand) {
    return await this.catproductRepo.updateCatProduct(command);
  }
}
