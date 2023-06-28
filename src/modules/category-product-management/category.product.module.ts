// import { Module, Provider } from '@nestjs/common';
// import { CqrsModule } from '@nestjs/cqrs';
// import { ProductCreateCommandHandler } from './aplication/command/product/cat.product.create.command';
// import { PRODUCT_REPOSITORY } from './aplication/ports/cat.product.repository';
// import { ProductMongoAdapter } from './infrastructure/adapter/cat.product.mongo.adapter';
// import { ProductUpdateCommandHandler } from './aplication/command/product/cat.product.update.command';
// import { ProductDeleteCommandHandler } from './aplication/command/product/cat.product.delete.command';
// import { ProductFindManyQueryHandler } from './aplication/query/cat.product.find.many.query';
// import { ProductFindByIdQueryHandler } from './aplication/query/cat.product.find.by.id.query';

// const handlers = [
//   ProductCreateCommandHandler,
//   ProductUpdateCommandHandler,
//   ProductDeleteCommandHandler,
// ];
// const repositories: Provider[] = [
//   {
//     provide: PRODUCT_REPOSITORY,
//     useClass: ProductMongoAdapter,
//   },
// ];

// const queryHandlers = [
//   ProductFindManyQueryHandler,
//   ProductFindByIdQueryHandler,
// ];

// @Module({
//   controllers: [Categ],
//   providers: [...handlers, ...repositories, ...queryHandlers],
//   imports: [CqrsModule],
// })
// export class CategoryProducttModule {}
