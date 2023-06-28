import { Injectable } from '@nestjs/common/decorators';
import { Prisma } from '@prisma/client';
import { Builder } from 'builder-pattern';
import { PrismaService } from '../../../../shared/prisma/prisma.service';
import {
  ProductRepository,
  CreateProductProps,
  UpdateProductProps,
  DeleteProductProps,
  FindProductByIdQuery,
} from '../../aplication/ports/product.repository';
import { ProductEntity } from '../../domain/product.entity';
import { ProductFindByIdQuery } from '../../aplication/query/product.find.by.id.query';
import { ProductVariantEntity } from '../../../product-variant-management/domain/product.variant.entity';
import { ConflictException, NotFoundException } from '@nestjs/common';

@Injectable()
export class ProductMongoAdapter implements ProductRepository {
  constructor(private prismaService: PrismaService) {}

  async createProduct(props: CreateProductProps): Promise<ProductEntity> {
    // try {
    const result = await this.prismaService.product.create({
      data: {
        name: props.name,
        price: props.price,
        cat_product_id: props.cat_product_id,
      },
    });

    if (!result) {
      throw new ConflictException('Id had to be created');
    }
    const response = Builder<ProductEntity>(ProductEntity, {
      ...result,
    }).build();

    return response;
    // } catch (e) {
    //   console.log(e);
    //   if (e instanceof Prisma.PrismaClientKnownRequestError) {
    //     if (e.code === 'P2002') {
    //       // throw new productAlreadyExistException();
    //     }
    //   }
    //   throw e;
    // }
  }

  async updateProduct(props: UpdateProductProps): Promise<ProductEntity> {
    // console.log(props);
    const result = await this.prismaService.product.update({
      where: {
        id: props.id,
      },

      data: {
        name: props.name,
        price: props.price,
      },
    });

    const response = Builder<ProductEntity>(ProductEntity, {
      ...result,
    }).build();

    return response;
  }

  async findManyProduct(): Promise<ProductEntity[]> {
    const results = await this.prismaService.product.findMany();

    const response = results.map((result) =>
      Builder<ProductEntity>(ProductEntity, {
        ...result,
      }).build(),
    );

    return response;
  }

  async findProductById(query: FindProductByIdQuery): Promise<ProductEntity> {
    // console.log(query.id);
    const result = await this.prismaService.product.findUnique({
      where: {
        id: query.id,
      },
    });

    if (!result) {
      throw new NotFoundException('Product not found');
    }
    const productEntity = Builder<ProductEntity>(ProductEntity, {
      ...result,
    }).build();

    return productEntity;
  }

  async deleteProduct(props: DeleteProductProps): Promise<ProductEntity> {
    const result = await this.prismaService.product.delete({
      where: {
        id: props.id,
      },
    });

    if (!result) {
      throw new NotFoundException('Product not found');
    }

    const response = Builder<ProductEntity>(ProductEntity, {
      ...result,
    }).build();

    return response;
  }
}
