import { Module, Provider } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { ProductCreateCommandHandler } from './aplication/command/product/product.create.command';
import { PRODUCT_REPOSITORY } from './aplication/ports/product.repository';
import { ProductMongoAdapter } from './infrastructure/adapter/product.mongo.adapter';
import { ProductController } from './infrastructure/delivery/product.controller';

const handlers = [ProductCreateCommandHandler];
const repositories: Provider[] = [
  {
    provide: PRODUCT_REPOSITORY,
    useClass: ProductMongoAdapter,
  },
];

@Module({
  controllers: [ProductController],
  providers: [...handlers, ...repositories],
  imports: [CqrsModule],
})
export class ProductModule {}
