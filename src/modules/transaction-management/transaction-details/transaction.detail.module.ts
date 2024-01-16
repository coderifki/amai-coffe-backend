import { Module, Provider } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { TransactionDetailMongoAdapter } from './adapter/transaction.detail.mongo.adapter';
import { TRANSACTION_DETAIL_REPOSITORY } from './repositories/transaction.detail.repository';

const repositories: Provider[] = [
  {
    provide: TRANSACTION_DETAIL_REPOSITORY,
    useClass: TransactionDetailMongoAdapter,
  },
];

const exported: Provider[] = [...repositories];

@Module({
  imports: [CqrsModule],
  providers: [...repositories],
  exports: [...exported],
})
export class TransactionDetailModule {}
