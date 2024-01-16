import { TransactionDetails } from '@prisma/client';
import { CatProductEntity } from '../../category-product-management/domain/cat.product.entity';
export class ProductEntity {
  id: string;
  name: string;
  price: number;
  cat_product_id?: string;
  cat_product_detail?: CatProductEntity;
  transactions?: TransactionDetails[];
  images?: string;
}
