import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Res,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Builder } from 'builder-pattern';
import { Response } from 'express';
import { HasRoles } from '../../../../core/decorators/has-roles.decorator';
import { BaseHttpResponseDto } from '../../../../core/helper/application/dtos/base.http.response.dto';
import { baseHttpResponseHelper } from '../../../../core/helper/base.response.helper';
import { JwtGuard } from '../../../auth/guards/jwt.auth.guard';
import { RolesGuard } from '../../../auth/guards/roles.guard';
import {
  ProductCreateCommand,
  ProductCreateCommandResponse,
} from '../../aplication/command/product/product.create.command';
import { ProductDeleteCommand } from '../../aplication/command/product/product.delete.command';
import { ProductUpdateCommand } from '../../aplication/command/product/product.update.command';
import { ProductFindByIdQuery } from '../../aplication/query/product.find.by.id.query';
import { ProductFindManyQuery } from '../../aplication/query/product.find.many.query';
import { ProductEntity } from '../../domain/product.entity';
import { ProductFindByIdQueryDto } from '../dtos/query/product.find.by.id.query.dto';
import { ProductFindManyQueryDto } from '../dtos/query/product.find.many.query';
import { CreateProductDto } from '../dtos/requests/create.product.dto';
import { DeleteProductDto } from '../dtos/requests/delete.product.dto';
import { UpdateProductDto } from '../dtos/requests/update.product.dto';

@ApiTags('Products')
@Controller('products')
export class ProductController {
  constructor(
    private readonly commandBus: CommandBus,
    private queryBus: QueryBus,
  ) {}

  @ApiOperation({ summary: 'Create Products' })
  @UseInterceptors(FileFieldsInterceptor([{ name: 'image', maxCount: 1 }]))
  @UseGuards(JwtGuard, RolesGuard)
  @HasRoles('ADMIN')
  @Post('create')
  async createProduct(
    @Res() res: Response,
    @Body() payload: CreateProductDto,
    @UploadedFiles()
    files: {
      image?: Express.Multer.File[];
    },
  ) {
    try {
      const command = Builder<ProductCreateCommand>(ProductCreateCommand, {
        ...payload,
        image: files?.image[0],
      }).build();

      const { data } = await this.commandBus.execute<
        ProductCreateCommand,
        ProductCreateCommandResponse
      >(command);

      const responseBuilder = Builder<BaseHttpResponseDto<any, any>>(
        BaseHttpResponseDto,
        {
          data,
        },
      );
      responseBuilder.statusCode(201);
      responseBuilder.message('Product Successfully Added!');
      const response = responseBuilder.build();
      return baseHttpResponseHelper(res, response);
    } catch (error) {
      console.trace(error);
      throw error;
    }
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
