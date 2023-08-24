import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { Inject } from '@nestjs/common';
import {
  CATEGORY_PRODUCT_REPOSITORY,
  CategoryProductRepository,
} from '../ports/cat.product.repository';
import { CatProductEntity } from '../../domain/cat.product.entity';

export class CatProductFindManyQuery {}

@QueryHandler(CatProductFindManyQuery)
export class CatProductFindManyQueryHandler
  implements IQueryHandler<CatProductFindManyQueryHandler>
{
  constructor(
    @Inject(CATEGORY_PRODUCT_REPOSITORY)
    private readonly catproductRepository: CategoryProductRepository,
  ) {}

  async execute(query: CatProductFindManyQuery): Promise<CatProductEntity[]> {
    return await this.catproductRepository.findManyCatProduct();
  }
}
