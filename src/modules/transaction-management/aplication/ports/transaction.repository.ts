import { TransactionDetails } from '@prisma/client';
import { TransactionEntity } from 'src/modules/transaction-management/domain/transaction.entity';

export const TRANSACTION_REPOSITORY = 'TRANSACTION_REPOSITORY';

export interface CreateTransactionProps {
  cashier_id: string;
  name_customer: string;
  total_transactions: number;
  pay: number;
  status_payment: string;
  payment_method_name: string;
  transaction_details?: TransactionDetails[];
}

// export interface UpdateTransactionProps {
//   id: string;
//   name?: string;
//   price?: number;
// }

export interface FindTransactionByIdQuery {
  id: string;
}

export interface DeleteTransactionProps {
  id: string;
}

// export interface TransactionNotFoundException {
//   name?: string;
//   price?: string;
//   excluded_id?: string;
// }

export interface TransactionRepository {
  createTransaction(props: CreateTransactionProps): Promise<TransactionEntity>;
  // updateTransaction(props: UpdateTransactionProps): Promise<TransactionEntity>;
  findManyTransaction(): Promise<TransactionEntity[]>;
  findTransactionById(
    query: FindTransactionByIdQuery,
  ): Promise<TransactionEntity>;
  deleteTransaction(props: DeleteTransactionProps): Promise<TransactionEntity>;
  // productAlreadyExistExeption(): Promise<TransactionEntity>;
}
