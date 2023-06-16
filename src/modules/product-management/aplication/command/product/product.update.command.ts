import { Inject } from '@nestjs/common/decorators';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import {
  ProductRepository,
  PRODUCT_REPOSITORY,
} from '../../ports/product.repository';

export class ProductUpdateCommand {
  id: string;
  name: string;
  price: number;
}

@CommandHandler(ProductUpdateCommand)
export class ProductUpdateCommandHandler
  implements ICommandHandler<ProductUpdateCommand>
{
  constructor(
    @Inject(PRODUCT_REPOSITORY)
    private readonly productRepo: ProductRepository,
  ) {}
  async execute(command: ProductUpdateCommand) {
    return await this.productRepo.updateProduct(command);
  }
}
