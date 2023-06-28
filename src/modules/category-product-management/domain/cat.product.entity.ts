import { ProductVariant, TransactionDetails } from '@prisma/client';
export class ProductEntity {
  id: string;
  category_name: string;
  Variants?: ProductVariant[];
  transactions?: TransactionDetails[];
}
