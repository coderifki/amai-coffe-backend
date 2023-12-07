import { CatProductEntity } from '../../domain/cat.product.entity';

export const CATEGORY_PRODUCT_REPOSITORY = 'CATEGORY_PRODUCT_REPOSITORY';

export interface CreateCatProductProps {
  name?: string;
}
export interface UpdateCatProductProps {
  id: string;
  name?: string;
}

export interface FindCatProductByIdQuery {
  id: string;
}

export interface DeleteCatProductProps {
  id: string;
}
// export interface CatProductDeleteByIdQuery {
//   id: string;
// }

export interface CheckProductExistenceProps {
  name?: string;
  excluded_id?: string;
}

export interface CategoryProductRepository {
  createCatProduct(props: CreateCatProductProps): Promise<CatProductEntity>;
  updateCatProduct(props: UpdateCatProductProps): Promise<CatProductEntity>;
  findManyCatProduct(): Promise<CatProductEntity[]>;
  findCatProductById(query: FindCatProductByIdQuery): Promise<CatProductEntity>;
  deleteCatProduct(props: DeleteCatProductProps): Promise<CatProductEntity>;
  // deleteCatProduct(query: CatProductDeleteByIdQuery): Promise<CatProductEntity>;
}
