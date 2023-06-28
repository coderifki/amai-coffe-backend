// import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
// import {
//   PRODUCT_REPOSITORY,
//   ProductRepository,
// } from '../ports/cat.product.repository';
// import { Inject } from '@nestjs/common';
// import { ProductEntity } from '../../domain/cat.product.entity';

// export class ProductFindManyQuery {}

// @QueryHandler(ProductFindManyQuery)
// export class ProductFindManyQueryHandler
//   implements IQueryHandler<ProductFindManyQueryHandler>
// {
//   constructor(
//     @Inject(PRODUCT_REPOSITORY)
//     private readonly productRepository: ProductRepository,
//   ) {}

//   async execute(query: ProductFindManyQuery): Promise<ProductEntity[]> {
//     return await this.productRepository.findManyProduct();
//   }
// }
