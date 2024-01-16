import { TransactionDetailEntity } from '../entities/transaction.detail.entity';

export const TRANSACTION_DETAIL_REPOSITORY = 'TRANSACTION_DETAIL_REPOSITORY';

export interface TransactionDetailCreateProps {
  name: string;
  price: number;
  category: string;
  quantity: number;
  transaction_id: string;
  images?: string;
  id?: string;
  product_id?: string;
}

export interface TransactionDetailRepository {
  create(props: TransactionDetailCreateProps): Promise<TransactionDetailEntity>;
}
