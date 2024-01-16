import { UserEntity } from '../../../auth/domain/user.entity';
import { TransactionDetailEntity } from '../../transaction-details/entities/transaction.detail.entity';

export class TransactionEntity {
  id: string;
  cashier_id?: string;
  cashier_info?: UserEntity;
  name_customer: string;
  total_transactions: number; // total transactions
  pay: number; // consumer money
  payment_method_name: string;
  transaction_details?: TransactionDetailEntity[];
}
