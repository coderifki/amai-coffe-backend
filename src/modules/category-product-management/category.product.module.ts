import { Module, Provider } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { CATEGORY_PRODUCT_REPOSITORY } from './aplication/ports/cat.product.repository';
import { CatProductMongoAdapter } from './infrastructure/adapter/cat.product.mongo.adapter';
import { CatProductCreateCommandHandler } from './aplication/command/product/cat.product.create.command';
import { CatProductDeleteCommandHandler } from './aplication/command/product/cat.product.delete.command';
import { CatProductUpdateCommandHandler } from './aplication/command/product/cat.product.update.command';
import { CategoryProductController } from './infrastructure/delivery/cat.product.controller';
import { CatProductFindByIdQueryHandler } from './aplication/query/cat.product.find.by.id.query';
import { CatProductFindManyQueryHandler } from './aplication/query/cat.product.find.many.query';

const handlers = [
  CatProductCreateCommandHandler,
  CatProductUpdateCommandHandler,
  CatProductDeleteCommandHandler,
];
const repositories: Provider[] = [
  {
    provide: CATEGORY_PRODUCT_REPOSITORY,
    useClass: CatProductMongoAdapter,
  },
];

const queryHandlers = [
  CatProductFindManyQueryHandler,
  CatProductFindByIdQueryHandler,
];

@Module({
  controllers: [CategoryProductController],
  providers: [...handlers, ...repositories, ...queryHandlers],
  imports: [CqrsModule],
})
export class CategoryProductModule {}
