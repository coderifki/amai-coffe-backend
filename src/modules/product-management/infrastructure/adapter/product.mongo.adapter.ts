import { Injectable } from '@nestjs/common/decorators';
import { Prisma } from '@prisma/client';
import { Builder } from 'builder-pattern';
import { PrismaService } from '../../../../shared/prisma/prisma.service';
import {
  ProductRepository,
  CreateProductProps,
  CheckProductExistenceProps,
} from '../../aplication/ports/product.repository';
import { ProductEntity } from '../../domain/product.entity';

@Injectable()
export class ProductMongoAdapter implements ProductRepository {
  constructor(private prismaService: PrismaService) {}

  async create(props: CreateProductProps): Promise<ProductEntity> {
    try {
      const result = await this.prismaService.Product.create({
        data: {
          name: props.name,
          price: props.price,
        },
      });

      const response = Builder<ProductEntity>(ProductEntity, {
        ...result,
      }).build();

      return response;
    } catch (e) {
      console.log(e);
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        if (e.code === 'P2002') {
          // throw new ProductAlreadyExistsException();
        }
      }
      throw e;
    }
  }

  // async findall(props: FindProductProps): Promise<ProductEntity> {

  //   )
}
