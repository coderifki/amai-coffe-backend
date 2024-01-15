import {
  Controller,
  Post,
  BadRequestException,
  Body,
  UseGuards,
  Get,
  Param,
  Put,
  Delete,
  Query,
  Res,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { Builder } from 'builder-pattern';
import { ProductCreateCommand } from '../../aplication/command/product/product.create.command';
import { CreateProductDto } from '../dtos/requests/create.product.dto';
import { JwtGuard } from '../../../auth/guards/jwt.auth.guard';
import { RolesGuard } from '../../../auth/guards/roles.guard';
import { HasRoles } from '../../../../core/decorators/has-roles.decorator';
import { ProductUpdateCommand } from '../../aplication/command/product/product.update.command';
import { UpdateProductDto } from '../dtos/requests/update.product.dto';
import { ProductDeleteCommand } from '../../aplication/command/product/product.delete.command';
import { DeleteProductDto } from '../dtos/requests/delete.product.dto';
import { BaseHttpResponseDto } from '../../../../core/helper/application/dtos/base.http.response.dto';
import { ProductEntity } from '../../domain/product.entity';
import { ProductFindManyQueryDto } from '../dtos/query/product.find.many.query';
import { ProductFindManyQuery } from '../../aplication/query/product.find.many.query';
import { baseHttpResponseHelper } from '../../../../core/helper/base.response.helper';
import { Response } from 'express';
import { ProductFindByIdQuery } from '../../aplication/query/product.find.by.id.query';
import { ProductFindByIdQueryDto } from '../dtos/query/product.find.by.id.query.dto';

@Controller('products')
export class ProductController {
  constructor(
    private readonly commandBus: CommandBus,
    private queryBus: QueryBus,
  ) {}

  @UseGuards(JwtGuard, RolesGuard)
  @HasRoles('ADMIN')
  @Post('create')
  async createProduct(@Res() res: Response, @Body() payload: CreateProductDto) {
    // map the incoming request into a command
    const command = Builder<ProductCreateCommand>(ProductCreateCommand, {
      ...payload,
    }).build();
    const result = await this.commandBus.execute(command);
    // if (result) {
    //   return { message: 'Product successfully added' };
    // }
    const responseBuilder = Builder<BaseHttpResponseDto<any, any>>(
      BaseHttpResponseDto,
      {
        data: {
          ...result,
        },
      },
    );
    responseBuilder.statusCode(201);
    responseBuilder.message('Product Successfully Added!');
    const response = responseBuilder.build();
    return baseHttpResponseHelper(res, response);
  }

  @UseGuards(JwtGuard, RolesGuard)
  @HasRoles('ADMIN', 'CASHIER')
  @Put('/update')
  async updateProduct(@Body() payload: UpdateProductDto) {
    const command = Builder<ProductUpdateCommand>(ProductUpdateCommand, {
      ...payload,
    }).build();

    const result = await this.commandBus.execute(command);
    if (result) {
      return { message: 'Product successfully update' };
    }
  }

  @UseGuards(JwtGuard, RolesGuard)
  @HasRoles('ADMIN', 'CASHIER')
  @Delete('/:id')
  async deleteCatProduct(@Param('id') id: string) {
    // console.log(id);

    try {
      const command = Builder<ProductDeleteCommand>(ProductDeleteCommand, {
        id,
      }).build();

      const result = await this.commandBus.execute(command);
      return result;
    } catch (error) {
      // console.trace(error);
      throw error;
    }
    // const command = Builder<CatProductDeleteCommand>(CatProductDeleteCommand, {
    // ...payload,
    // }).build();
    // const result = await this.commandBus.execute(command);
    // if (result) {
    //   return { message: 'Product deleted successfully' };
    // }

    // const builder = Builder<CatProductFindByIdQuery>(CatProductFindByIdQuery, {
    //   ...query,
    // });
  }

  // @UseGuards(JwtGuard, RolesGuard)
  // @HasRoles('ADMIN', 'CASHIER')
  // @Delete('/:id')
  // async deleteProduct(@Body() payload: DeleteProductDto) {
  //   // console.log(payload);
  //   const command = Builder<ProductDeleteCommand>(ProductDeleteCommand, {
  //     ...payload,
  //   }).build();

  //   const result = await this.commandBus.execute(command);
  //   if (result) {
  //     return { message: 'Product deleted successfully' };
  //   }
  // }

  // @UseGuards(JwtGuard, RolesGuard)
  // @HasRoles('ADMIN')
  // @Get('')
  // async findAllProduct(@Body() payload: UpdateProductDto) {
  //   const command = Builder<ProductUpdateCommand>(ProductUpdateCommand, {
  //     ...payload,
  //   }).build();

  //   const result = await this.commandBus.execute(command);
  //   if (result) {
  //     return { message: 'Product deleted successfully' };
  //   }
  // }

  // @UseGuards(JwtGuard, RolesGuard)
  // @HasRoles('ADMIN')
  // @Get('/:id')
  // async findProductById(@Res() res: Response, @Param('id') id: string) {
  //   const responseBuilder =
  //     Builder<BaseHttpResponseDto<ProductEntity, any>>(BaseHttpResponseDto);
  //   responseBuilder.statusCode(200);
  //   responseBuilder.message('Product Id');

  //   const query = Builder<>;
  // }

  @Get()
  async findManyProduct(
    @Res() res: Response,
    @Query()
    query: ProductFindManyQueryDto,
  ) {
    const responseBuilder =
      Builder<BaseHttpResponseDto<ProductEntity[], any>>(BaseHttpResponseDto);

    responseBuilder.statusCode(200);
    responseBuilder.message('Product List');

    const builder = Builder<ProductFindManyQuery>(ProductFindManyQuery, {
      ...query,
    });
    const result = await this.queryBus.execute(builder.build());

    if (!result) {
      responseBuilder.message('Product not found');
      return baseHttpResponseHelper(res, responseBuilder.build());
    }

    responseBuilder.data(result);
    return baseHttpResponseHelper(res, responseBuilder.build());
  }

  @Get('find') // Endpoint for finding a product by ID
  async findProductById(
    @Res() res: Response,
    @Query() query: ProductFindByIdQueryDto,
  ) {
    // console.log(query);
    const responseBuilder =
      Builder<BaseHttpResponseDto<ProductEntity, any>>(BaseHttpResponseDto);
    responseBuilder.statusCode(200);
    responseBuilder.message('Product Details');

    const builder = Builder<ProductFindByIdQuery>(ProductFindByIdQuery, {
      ...query,
    });

    const result = await this.queryBus.execute(builder.build());

    if (!result) {
      responseBuilder.message('Product not found');
      return baseHttpResponseHelper(res, responseBuilder.build());
    }

    responseBuilder.data(result);
    return baseHttpResponseHelper(res, responseBuilder.build());
  }
}
