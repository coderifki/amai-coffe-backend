// import { Inject } from '@nestjs/common/decorators';
// import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
// import {
//   TRANSACTION_REPOSITORY,
//   TransactionRepository,
// } from '../../ports/transaction.repository';

// export class TransactionUpdateCommand {
//   id: string;
//   name: string;
//   price: number;
// }

// @CommandHandler(TransactionUpdateCommand)
// export class TransactionUpdateCommandHandler
//   implements ICommandHandler<TransactionUpdateCommand>
// {
//   constructor(
//     @Inject(TRANSACTION_REPOSITORY)
//     private readonly transactionRepo: TransactionRepository,
//   ) {}
//   async execute(command: TransactionUpdateCommand) {
//     return await this.transactionRepo.updateTransaction(command);
//   }
// }
