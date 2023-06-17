import { ProductVariant, TransactionDetails } from '@prisma/client';
export class ProductEntity {
  id: string;
  name: string;
  price: number;
  Variants?: ProductVariant[];
  transactions?: TransactionDetails[];
}
