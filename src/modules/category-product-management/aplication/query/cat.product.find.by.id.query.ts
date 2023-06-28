// import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
// import { ProductEntity } from '../../domain/cat.product.entity';
// import {
//   PRODUCT_REPOSITORY,
//   ProductRepository,
// } from '../ports/cat.product.repository';
// import { Inject } from '@nestjs/common';

// export class ProductFindByIdQuery {
//   id: string;
// }

// @QueryHandler(ProductFindByIdQuery)
// export class ProductFindByIdQueryHandler
//   implements IQueryHandler<ProductFindByIdQuery>
// {
//   constructor(
//     @Inject(PRODUCT_REPOSITORY)
//     private readonly productRepository: ProductRepository,
//   ) {}

//   async execute(query: ProductFindByIdQuery) {
//     // console.log(query);
//     return await this.productRepository.findProductById(query);
//   }
// }
