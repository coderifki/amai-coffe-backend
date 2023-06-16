import { ProductEntity } from '../../domain/product.entity';

export const PRODUCT_REPOSITORY = 'PRODUCT_REPOSITORY';

export interface CreateProductProps {
  name?: string;
  price?: number;
}
export interface UpdateProductProps {
  id: string;
  name?: string;
  price?: number;
}

export interface FindProductByIdQuery {
  id: string;
}

export interface DeleteProductProps {
  id: string;
}

export interface CheckProductExistenceProps {
  name?: string;
  price?: string;
  excluded_id?: string;
}

export interface ProductRepository {
  createProduct(props: CreateProductProps): Promise<ProductEntity>;
  updateProduct(props: UpdateProductProps): Promise<ProductEntity>;
  findManyProduct(): Promise<ProductEntity[]>;
  findProductById(query: FindProductByIdQuery): Promise<ProductEntity>;
  deleteProduct(props: DeleteProductProps): Promise<ProductEntity>;
}
