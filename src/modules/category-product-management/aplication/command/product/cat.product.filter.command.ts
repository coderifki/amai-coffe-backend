// import { Inject } from '@nestjs/common/decorators';
// import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
// import {
//   ProductRepository,
//   PRODUCT_REPOSITORY,
// } from '../../ports/product.repository';

// export class ProductFilterCommand {
//   id: string;
//   name: string;
//   price: number;
// }

// // @CommandHandler(ProductFilterCommand)
// // export class ProductFilterCommandHandler
// //   implements ICommandHandler<ProductFilterCommand>
// // {
// //   constructor(
// //     @Inject(PRODUCT_REPOSITORY)
// //     private readonly productRepo: ProductRepository,
// //   ) {}
// //   async execute(command: ProductFilterCommand) {
// //     return await this.productRepo.findProductById(command);
// //   }
// }

import { Inject } from '@nestjs/common/decorators';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import {
  CATEGORY_PRODUCT_REPOSITORY,
  CategoryProductRepository,
} from '../../ports/cat.product.repository';

export class CatProductFilterCommand {
  id: string;
  name: string;
}

@CommandHandler(CatProductFilterCommand)
export class ProductFilterCommandHandler
  implements ICommandHandler<CatProductFilterCommand>
{
  constructor(
    @Inject(CATEGORY_PRODUCT_REPOSITORY)
    private readonly catproductRepo: CategoryProductRepository,
  ) {}
  async execute(command: CatProductFilterCommand) {
    return await this.catproductRepo.findManyCatProduct();
  }
}
