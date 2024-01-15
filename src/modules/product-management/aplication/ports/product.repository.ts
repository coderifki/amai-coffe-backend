import { ProductEntity } from '../../domain/product.entity';

export const PRODUCT_REPOSITORY = 'PRODUCT_REPOSITORY';

export class CreateProductProps {
  id?: string; // optional for predefined id
  name: string;
  price: number;
  cat_product_id: string;
  image?: string;
}

export class UpdateProductProps {
  id: string; // optional for predefined id
  name?: string;
  price?: number;
  cat_product_id?: string;
  image?: string;
}

export interface FindProductByIdQuery {
  id: string;
}

export interface DeleteProductProps {
  id: string;
}

// export interface ProductNotFoundException {
//   name?: string;
//   price?: string;
//   excluded_id?: string;
// }

export interface ProductRepository {
  createProduct(props: CreateProductProps): Promise<ProductEntity>;
  updateProduct(props: UpdateProductProps): Promise<ProductEntity>;
  findManyProduct(): Promise<ProductEntity[]>;
  findProductById(query: FindProductByIdQuery): Promise<ProductEntity>;
  deleteProduct(props: DeleteProductProps): Promise<ProductEntity>;
  // productAlreadyExistExeption(): Promise<ProductEntity>;
}
