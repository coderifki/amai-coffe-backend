import { Inject } from '@nestjs/common/decorators';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { TransactionDetails } from '@prisma/client';
import {
  TRANSACTION_REPOSITORY,
  TransactionRepository,
} from 'src/modules/transaction-management/aplication/ports/transaction.repository';

export class TransactionCreateCommand {
  // id: string;
  cashier_id: string;
  // cashier_info: number;
  name_customer: string;
  total_transactions: number;
  payment_method_name: string;
  pay: number;
  transaction_details: TransactionDetails[];
}

@CommandHandler(TransactionCreateCommand)
export class TransactionCreateCommandHandler
  implements ICommandHandler<TransactionCreateCommand>
{
  constructor(
    @Inject(TRANSACTION_REPOSITORY)
    private readonly transactionRepo: TransactionRepository,
  ) {}
  async execute(command: TransactionCreateCommand) {
    return await this.transactionRepo.createTransaction(command);
  }
}
