import { Inject } from '@nestjs/common/decorators';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import {
  ProductRepository,
  PRODUCT_REPOSITORY,
} from '../../ports/cat.product.repository';

export class ProductDeleteCommand {
  id: string;
}

@CommandHandler(ProductDeleteCommand)
export class ProductDeleteCommandHandler
  implements ICommandHandler<ProductDeleteCommand>
{
  constructor(
    @Inject(PRODUCT_REPOSITORY)
    private readonly productRepo: ProductRepository,
  ) {}
  async execute(command: ProductDeleteCommand) {
    return await this.productRepo.deleteProduct(command);
  }
}
