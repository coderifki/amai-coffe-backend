import { Product, ProductVariant, TransactionDetails } from '@prisma/client';
export class ProductEntity {
  id: string;
  name: string;
  price: number;
  Products?: Product[];
  Variants?: ProductVariant[];
  transactions?: TransactionDetails[];
}
