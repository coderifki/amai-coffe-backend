import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { Inject } from '@nestjs/common';
import {
  CATEGORY_PRODUCT_REPOSITORY,
  CategoryProductRepository,
} from '../ports/cat.product.repository';

export class CatProductFindByIdQuery {
  id: string;
}

@QueryHandler(CatProductFindByIdQuery)
export class CatProductFindByIdQueryHandler
  implements IQueryHandler<CatProductFindByIdQuery>
{
  constructor(
    @Inject(CATEGORY_PRODUCT_REPOSITORY)
    private readonly catproductRepository: CategoryProductRepository,
  ) {}

  async execute(query: CatProductFindByIdQuery) {
    // console.log(query);
    return await this.catproductRepository.findCatProductById(query);
  }
}
