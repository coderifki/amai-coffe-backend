import { TransactionDetails } from '@prisma/client';

export class TransactionEntity {
  id: string;
  cashier_id: string;
  name_customer: string;
  total_transactions: number;
  pay: number;
  payment_method_name: string;
}
