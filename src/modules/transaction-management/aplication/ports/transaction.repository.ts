import { TransactionDetails } from '@prisma/client';
import { TransactionDetailEntity } from 'src/modules/transaction-management/domain/transaction.detail.entity';
import { TransactionEntity } from 'src/modules/transaction-management/domain/transaction.entity';

export const TRANSACTION_REPOSITORY = 'TRANSACTION_REPOSITORY';

export interface CreateTransactionProps {
  cashier_id?: string;
  name_customer: string;
  payment_method_name: string;
  total_transactions: number;
  pay: number;
  transaction_details: CreateTransactionDetailProps[];
}

export interface CreateTransactionDetailProps {
  product_id: string;
  quantity: number;
  name: string;
  price: number;
  image: string;
  category: string;
  // transaction_id: string;
}

// export interface UpdateTransactionProps {
//   id: string;
//   name?: string;
//   price?: number;
// }

export interface FindTransactionByIdQuery {
  id: string;
}
export interface FindTransactionDetailsByIdQuery {
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
  // craeteTransactionWithDetails(
  //   transactioPorps: CreateTransactionProps,
  //   detailProps: CreateTransactionDetailProps,
  // ): Promise<TransactionDetailEntity | TransactionEntity>;
  createTransaction(props: CreateTransactionProps): Promise<TransactionEntity>;
  // updateTransaction(props: UpdateTransactionProps): Promise<TransactionEntity>;
  findManyTransaction(): Promise<TransactionEntity[]>;
  findTransactionById(
    query: FindTransactionByIdQuery,
  ): Promise<TransactionEntity>;

  findTransactionDetailsById(
    query: FindTransactionDetailsByIdQuery,
  ): Promise<TransactionDetailEntity>;
  deleteTransaction(props: DeleteTransactionProps): Promise<TransactionEntity>;
  // productAlreadyExistExeption(): Promise<TransactionEntity>;
}
