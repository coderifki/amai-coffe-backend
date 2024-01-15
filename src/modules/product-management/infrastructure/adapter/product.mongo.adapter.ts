import { ConflictException, NotFoundException } from '@nestjs/common';
import { Injectable } from '@nestjs/common/decorators';
import { Prisma } from '@prisma/client';
import { Builder } from 'builder-pattern';
import { PrismaService } from '../../../../shared/prisma/prisma.service';
import {
  CreateProductProps,
  DeleteProductProps,
  FindProductByIdQuery,
  ProductRepository,
  UpdateProductProps,
} from '../../aplication/ports/product.repository';
import { ProductEntity } from '../../domain/product.entity';
import { ObjectId } from 'bson';

@Injectable()
export class ProductMongoAdapter implements ProductRepository {
  constructor(private prismaService: PrismaService) {}

  async createProduct(props: CreateProductProps): Promise<ProductEntity> {
    // try {
    const result = await this.prismaService.product.create({
      include: { cat_product_detail: true },
      data: {
        id: props.id || new ObjectId().toString(),
        name: props.name,
        price: props.price,
        cat_product_id: props.cat_product_id,
        images: props.image,
      },
    });

    if (!result) {
      throw new ConflictException('Id had to be created');
    }
    const response = Builder<ProductEntity>(ProductEntity, {
      ...result,
    }).build();

    return response;
  }
  catch(e) {
    console.log(e);
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      if (e.code === 'P2002') {
        // throw new productAlreadyExistException();
      }
    }
    throw e;
  }

  async updateProduct(props: UpdateProductProps): Promise<ProductEntity> {
    // console.log(props);
    const result = await this.prismaService.product.update({
      include: { cat_product_detail: true },
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
    const results = await this.prismaService.product.findMany({
      include: {
        cat_product_detail: true, // this is relation for categoryProduct
      },
    });

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
      include: { cat_product_detail: true },
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
