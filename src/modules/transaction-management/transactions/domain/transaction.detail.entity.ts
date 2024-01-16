import { ProductEntity } from '../../../product-management/domain/product.entity';
import { TransactionEntity } from './transaction.entity';

export class TransactionDetailEntity {
  id: string;
  transaction_id: string;
  transaction_info?: TransactionEntity;
  product_id?: string;
  product_info?: ProductEntity;
  quantity: number;
  name: string;
  price: number;
  image?: string;
  category: string;
}
