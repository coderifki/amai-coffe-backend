import { Injectable } from '@nestjs/common/decorators';
import { Prisma } from '@prisma/client';
import { Builder } from 'builder-pattern';
import { PrismaService } from '../../../../shared/prisma/prisma.service';
import {
  CategoryProductRepository,
  CreateCatProductProps,
  DeleteCatProductProps,
  FindCatProductByIdQuery,
  UpdateCatProductProps,
} from '../../aplication/ports/cat.product.repository';
import { CatProductEntity } from '../../domain/cat.product.entity';

@Injectable()
export class CatProductMongoAdapter implements CategoryProductRepository {
  constructor(private prismaService: PrismaService) {}

  async createCatProduct(
    props: CreateCatProductProps,
  ): Promise<CatProductEntity> {
    // console.log(props);

    try {
      const result = await this.prismaService.categoryProduct.create({
        data: {
          name: props.name,
        },
      });

      const response = Builder<CatProductEntity>(CatProductEntity, {
        ...result,
      }).build();

      return response;
    } catch (e) {
      //   console.log(e);
      //   if (e instanceof Prisma.PrismaClientKnownRequestError) {
      //     if (e.code === 'P2002') {
      //       // throw new ProductAlreadyExistsException();
      //     }
      //   }
      //   throw e;
      // }
    }
  }
  async updateCatProduct(
    props: UpdateCatProductProps,
  ): Promise<CatProductEntity> {
    // console.log(props);
    const result = await this.prismaService.categoryProduct.update({
      where: {
        id: props.id,
      },

      data: {
        name: props.name,
      },
    });

    const response = Builder<CatProductEntity>(CatProductEntity, {
      ...result,
    }).build();

    return response;
  }

  async findManyCatProduct(): Promise<CatProductEntity[]> {
    const results = await this.prismaService.categoryProduct.findMany();

    const response = results.map((result) =>
      Builder<CatProductEntity>(CatProductEntity, {
        ...result,
      }).build(),
    );

    return response;
  }

  async findCatProductById(
    query: FindCatProductByIdQuery,
  ): Promise<CatProductEntity> {
    // console.log(query.id);
    const result = await this.prismaService.categoryProduct.findUnique({
      where: {
        id: query.id,
      },
    });
    if (!result) {
      throw new Error('Product not found');
    }

    const productEntity = Builder<CatProductEntity>(CatProductEntity, {
      ...result,
    }).build();

    return productEntity;
  }

  async deleteCatProduct(
    props: DeleteCatProductProps,
  ): Promise<CatProductEntity> {
    try {
      const result = await this.prismaService.categoryProduct.delete({
        where: {
          id: props.id,
        },
      });

      const response = Builder<CatProductEntity>(CatProductEntity, {
        ...result,
      }).build();
      return response;
    } catch (error) {
      console.trace(error);
      throw error;
    }
  }
}
