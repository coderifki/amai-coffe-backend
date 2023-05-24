import { Product } from '@prisma/client';

export class ProductVariantEntity {
  id: string;
  name: string;
  product_id: string;
  product_detail: Product;
}
