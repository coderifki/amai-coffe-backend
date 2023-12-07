import { Product } from '@prisma/client';
export class CatProductEntity {
  id: string;
  name?: string;
  Products?: Product[];
}
