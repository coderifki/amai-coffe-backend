import { TransactionEntity } from '../../domain/transaction.entity';

export const TRANSACTION_REPOSITORY = 'TRANSACTION_REPOSITORY';

export type TransactionRelations = 'transaction_details' | 'cashier_info';

export interface CreateTransactionProps {
  id?: string; // optional in case of pre-defined
  cashier_id?: string;
  name_customer: string;
  payment_method_name: string;
  total_transactions: number;
  pay: number;
}

export interface CreateTransactionDetailProps {
  product_id: string;
  quantity: number;
  name: string;
  price: number;
  image: string;
  category: string;
}

export interface TransactionFindFirstQuery {
  transaction_id: string;
  include_relations?: Array<TransactionRelations>;
}

export interface FindTransactionByIdQuery {
  id: string;
}
export interface FindTransactionDetailsByIdQuery {
  id: string;
}

export interface DeleteTransactionProps {
  id: string;
}

export interface TransactionRepository {
  create(props: CreateTransactionProps, tx?: any): Promise<TransactionEntity>;
  findManyTransaction(): Promise<TransactionEntity[]>;
  findTransactionById(
    query: FindTransactionByIdQuery,
  ): Promise<TransactionEntity>;
  findFirst(
    query: TransactionFindFirstQuery,
    tx?: any,
  ): Promise<TransactionEntity | null>;
  // findTransactionDetailsById(
  //   query: FindTransactionDetailsByIdQuery,
  // ): Promise<TransactionDetailEntity>;
  deleteTransaction(props: DeleteTransactionProps): Promise<TransactionEntity>;
}
