import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TransactionModule } from './transactions/transaction.module';

const importedModule = [CqrsModule, TransactionModule];

@Module({
  imports: [...importedModule],
})
export class TransactionManagementModule {}
