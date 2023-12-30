import { Module, Provider } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TransactionCreateCommandHandler } from 'src/modules/transaction-management/aplication/command/transaction/transaction.create.command';
import { TransactionDeleteCommandHandler } from 'src/modules/transaction-management/aplication/command/transaction/transaction.delete.command';
import { TRANSACTION_REPOSITORY } from 'src/modules/transaction-management/aplication/ports/transaction.repository';
import { TransactionDetailsFindByIdQueryHandler } from 'src/modules/transaction-management/aplication/query/transaction.details.find.by.id.query';
import { TransactionFindByIdQueryHandler } from 'src/modules/transaction-management/aplication/query/transaction.find.by.id.query';
import { TransactionFindManyQueryHandler } from 'src/modules/transaction-management/aplication/query/transaction.find.many.query';
import { TransactionMongoAdapter } from 'src/modules/transaction-management/infrastructure/adapter/transaction.mongo.adapter';
import { TransactionController } from 'src/modules/transaction-management/infrastructure/delivery/transaction.controller';

const handlers = [
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

const queryHandlers = [
  TransactionFindManyQueryHandler,
  TransactionFindByIdQueryHandler,
  TransactionDetailsFindByIdQueryHandler,
];

@Module({
  controllers: [TransactionController],
  providers: [...handlers, ...repositories, ...queryHandlers],
  imports: [CqrsModule],
})
export class TransactionModule {}
