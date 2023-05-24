import { ProductEntity } from '../../domain/product.entity';

export const PRODUCT_REPOSITORY = 'PRODUCT_REPOSITORY';

export interface CreateProductProps {
  name?: string;
  price?: number;
}

export interface CheckProductExistenceProps {
  name?: string;
  price?: string;
  excluded_id?: string;
}

export interface ProductRepository {
  create(props: CreateProductProps): Promise<ProductEntity>;
}
