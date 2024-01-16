import { Module, Provider } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TransactionCreateCommandHandler } from 'src/modules/transaction-management/transactions/aplication/command/transaction/transaction.create.command';
import { TransactionDeleteCommandHandler } from 'src/modules/transaction-management/transactions/aplication/command/transaction/transaction.delete.command';
import { TRANSACTION_REPOSITORY } from 'src/modules/transaction-management/transactions/aplication/ports/transaction.repository';
import { TransactionDetailsFindByIdQueryHandler } from 'src/modules/transaction-management/transactions/aplication/query/transaction.details.find.by.id.query';
import { TransactionFindByIdQueryHandler } from 'src/modules/transaction-management/transactions/aplication/query/transaction.find.by.id.query';
import { TransactionFindManyQueryHandler } from 'src/modules/transaction-management/transactions/aplication/query/transaction.find.many.query';
import { TransactionMongoAdapter } from 'src/modules/transaction-management/transactions/infrastructure/adapter/transaction.mongo.adapter';
import { TransactionController } from 'src/modules/transaction-management/transactions/infrastructure/delivery/transaction.controller';
import { TransactionDetailModule } from '../transaction-details/transaction.detail.module';
import { ProductModule } from '../../product-management/product.module';

const commands = [
  TransactionCreateCommandHandler,
  // TransactionUpdateCommandHandler,
  TransactionDeleteCommandHandler,
];

const repositories: Provider[] = [
  {
    provide: TRANSACTION_REPOSITORY,
    useClass: TransactionMongoAdapter,
  },
];

const queries = [
  TransactionFindManyQueryHandler,
  TransactionFindByIdQueryHandler,
  TransactionDetailsFindByIdQueryHandler,
];

@Module({
  imports: [CqrsModule, TransactionDetailModule, ProductModule],
  controllers: [TransactionController],
  providers: [...commands, ...repositories, ...queries],
})
export class TransactionModule {}
