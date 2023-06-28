// import { Inject } from '@nestjs/common/decorators';
// import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
// import {
//   ProductRepository,
//   PRODUCT_REPOSITORY,
// } from '../../ports/cat.product.repository';

// export class ProductCreateCommand {
//   name: string;
//   price: number;
// }

// @CommandHandler(ProductCreateCommand)
// export class ProductCreateCommandHandler
//   implements ICommandHandler<ProductCreateCommand>
// {
//   constructor(
//     @Inject(PRODUCT_REPOSITORY)
//     private readonly productRepo: ProductRepository,
//   ) {}
//   async execute(command: ProductCreateCommand) {
//     return await this.productRepo.createProduct(command);
//   }
// }
