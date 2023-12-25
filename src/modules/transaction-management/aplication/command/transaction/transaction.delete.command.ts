import { Inject } from '@nestjs/common/decorators';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import {
  TRANSACTION_REPOSITORY,
  TransactionRepository,
} from '../../ports/transaction.repository';

export class TransactionDeleteCommand {
  id: string;
}

@CommandHandler(TransactionDeleteCommand)
export class TransactionDeleteCommandHandler
  implements ICommandHandler<TransactionDeleteCommand>
{
  constructor(
    @Inject(TRANSACTION_REPOSITORY)
    private readonly transactionRepo: TransactionRepository,
  ) {}
  async execute(command: TransactionDeleteCommand) {
    return await this.transactionRepo.deleteTransaction(command);
  }
}
