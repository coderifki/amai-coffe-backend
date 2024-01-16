import { Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { TransactionEntity } from '../../domain/transaction.entity';
import {
  TRANSACTION_REPOSITORY,
  TransactionRepository,
} from '../ports/transaction.repository';

export class TransactionFindManyQuery {}

@QueryHandler(TransactionFindManyQuery)
export class TransactionFindManyQueryHandler
  implements IQueryHandler<TransactionFindManyQueryHandler>
{
  constructor(
    @Inject(TRANSACTION_REPOSITORY)
    private readonly transactionRepository: TransactionRepository,
  ) {}

  async execute(query: TransactionFindManyQuery): Promise<TransactionEntity[]> {
    return await this.transactionRepository.findManyTransaction();
  }
}
