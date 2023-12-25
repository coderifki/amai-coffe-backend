import { Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import {
  TRANSACTION_REPOSITORY,
  TransactionRepository,
} from '../ports/transaction.repository';

export class TransactionFindByIdQuery {
  id: string;
}

@QueryHandler(TransactionFindByIdQuery)
export class TransactionFindByIdQueryHandler
  implements IQueryHandler<TransactionFindByIdQuery>
{
  constructor(
    @Inject(TRANSACTION_REPOSITORY)
    private readonly transactionRepository: TransactionRepository,
  ) {}

  async execute(query: TransactionFindByIdQuery) {
    // console.log(query);
    return await this.transactionRepository.findTransactionById(query);
  }
}
