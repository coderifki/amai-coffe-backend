import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { Inject } from '@nestjs/common';
import {
  CATEGORY_PRODUCT_REPOSITORY,
  CategoryProductRepository,
} from '../ports/cat.product.repository';

export class CatProductDeleteByIdQuery {
  id: string;
}

@QueryHandler(CatProductDeleteByIdQuery)
export class CatProductDeleteByIdQueryHandler
  implements IQueryHandler<CatProductDeleteByIdQuery>
{
  constructor(
    @Inject(CATEGORY_PRODUCT_REPOSITORY)
    private readonly catproductRepository: CategoryProductRepository,
  ) {}

  async execute(query: CatProductDeleteByIdQuery) {
    // console.log(query);
    return await this.catproductRepository.deleteCatProduct(query);
  }
}
