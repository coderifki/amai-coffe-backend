import { Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import {
  TRANSACTION_REPOSITORY,
  TransactionRepository,
} from '../ports/transaction.repository';

export class TransactionDetailsFindByIdQuery {
  id: string;
  // transaction_id: string;
  // product_id?: string;
  // quantity: number;
  // name: string;
  // price: number;
  // image?: string;
  // category: string;
}

@QueryHandler(TransactionDetailsFindByIdQuery)
export class TransactionDetailsFindByIdQueryHandler
  implements IQueryHandler<TransactionDetailsFindByIdQuery>
{
  constructor(
    @Inject(TRANSACTION_REPOSITORY)
    private readonly transactionRepository: TransactionRepository,
  ) {}

  async execute(query: TransactionDetailsFindByIdQuery) {
    // console.log(query);
    return await this.transactionRepository.findTransactionDetailsById(query);
  }
}
