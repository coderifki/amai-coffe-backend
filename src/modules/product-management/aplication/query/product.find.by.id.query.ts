import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { ProductEntity } from '../../domain/product.entity';
import {
  PRODUCT_REPOSITORY,
  ProductRepository,
} from '../ports/product.repository';
import { Inject } from '@nestjs/common';

export class ProductFindByIdQuery {
  id: string;
}

@QueryHandler(ProductFindByIdQuery)
export class ProductFindByIdQueryHandler
  implements IQueryHandler<ProductFindByIdQuery>
{
  constructor(
    @Inject(PRODUCT_REPOSITORY)
    private readonly productRepository: ProductRepository,
  ) {}

  async execute(query: ProductFindByIdQuery) {
    // console.log(query);
    return await this.productRepository.findProductById(query);
  }
}