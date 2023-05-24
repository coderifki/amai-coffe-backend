import { ProductVariant, TransactionDetails } from '@prisma/client';
export class ProductEntity {
  id: string;
  name: string;
  price: string;
  Variants?: ProductVariant[];
  transactions?: TransactionDetails[];
}
