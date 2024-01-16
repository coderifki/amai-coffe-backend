// // import { Inject } from '@nestjs/common/decorators';
// // import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
// // import {
// //   ProductRepository,
// //   PRODUCT_REPOSITORY,
// // } from '../../ports/product.repository';

// // export class ProductFilterCommand {
// //   id: string;
// //   name: string;
// //   price: number;
// // }

// // // @CommandHandler(ProductFilterCommand)
// // // export class ProductFilterCommandHandler
// // //   implements ICommandHandler<ProductFilterCommand>
// // // {
// // //   constructor(
// // //     @Inject(PRODUCT_REPOSITORY)
// // //     private readonly productRepo: ProductRepository,
// // //   ) {}
// // //   async execute(command: ProductFilterCommand) {
// // //     return await this.productRepo.findProductById(command);
// // //   }
// // }

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

// @CommandHandler(ProductFilterCommand)
// export class ProductFilterCommandHandler
//   implements ICommandHandler<ProductFilterCommand>
// {
//   constructor(
//     @Inject(PRODUCT_REPOSITORY)
//     private readonly productRepo: ProductRepository,
//   ) {}
//   async execute(command: ProductFilterCommand) {
//     return await this.productRepo.findManyProduct();
//   }
// }
