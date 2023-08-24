import { Inject } from '@nestjs/common/decorators';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import {
  CATEGORY_PRODUCT_REPOSITORY,
  CategoryProductRepository,
} from '../../ports/cat.product.repository';

export class CatProductCreateCommand {
  name: string;
}

@CommandHandler(CatProductCreateCommand)
export class CatProductCreateCommandHandler
  implements ICommandHandler<CatProductCreateCommand>
{
  constructor(
    @Inject(CATEGORY_PRODUCT_REPOSITORY)
    private readonly catproductRepo: CategoryProductRepository,
  ) {}
  async execute(command: CatProductCreateCommand) {
    return await this.catproductRepo.createCatProduct(command);
  }
}
