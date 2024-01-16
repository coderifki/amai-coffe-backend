import { Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import {
  TRANSACTION_REPOSITORY,
  TransactionRepository,
} from '../ports/transaction.repository';

export class TransactionFindByIdQuery {
  id: string;
  // transaction_id: string;
  // product_id?: string;
  // quantity: number;
  // name: string;
  // price: number;
  // image?: string;
  // category: string;
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
