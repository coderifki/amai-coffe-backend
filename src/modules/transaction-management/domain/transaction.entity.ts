import { TransactionDetails } from '@prisma/client';

export class TransactionEntity {
  id: string;
  cashier_id: string;
  cashier_info: number;
  name_customer: String;
  total_transactions: number;
  change: number;
  pay: number;
  transaction_details?: TransactionDetails[];
}
