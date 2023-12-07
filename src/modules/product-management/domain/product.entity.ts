import { CategoryProduct, TransactionDetails } from '@prisma/client';
export class ProductEntity {
  id: string;
  name: string;
  price: number;
  cat_product_id?: String;
  // cat_product_detail: CategoryProduct[];
  // Products?: Product[];
  // Variants?: ProductVariant[];
  transactions?: TransactionDetails[];
}
