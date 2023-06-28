// import { Inject } from '@nestjs/common/decorators';
// import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
// import {
//   ProductRepository,
//   PRODUCT_REPOSITORY,
// } from '../../ports/cat.product.repository';

// export class CategoryProductDeleteCommand {
//   id: string;
// }

// @CommandHandler(CategoryProductDeleteCommand)
// export class CategoryProductDeleteCommandHandler
//   implements ICommandHandler<CategoryProductDeleteCommand>
// {
//   constructor(
//     @Inject(PRODUCT_REPOSITORY)
//     private readonly catproductRepo: CategoryProductRepository,
//   ) {}
//   async execute(command: CategoryProductDeleteCommand) {
//     return await this.catproductRepo.deleteProduct(command);
//   }
// }
