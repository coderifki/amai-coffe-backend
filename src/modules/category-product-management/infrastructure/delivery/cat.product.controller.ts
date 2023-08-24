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
import { CreateCatProductDto } from '../dtos/requests/create.cat.product.dto';
import { JwtGuard } from '../../../auth/guards/jwt.auth.guard';
import { RolesGuard } from '../../../auth/guards/roles.guard';
import { HasRoles } from '../../../../core/decorators/has-roles.decorator';
import { BaseHttpResponseDto } from '../../../../core/helper/application/dtos/base.http.response.dto';
import { baseHttpResponseHelper } from '../../../../core/helper/base.response.helper';
import { Response } from 'express';
import { CatProductCreateCommand } from '../../aplication/command/product/cat.product.create.command';
import { CatProductEntity } from '../../domain/cat.product.entity';
import { DeleteCatProductDto } from '../dtos/requests/delete.cat.product.dto';
import { UpdateCatProductDto } from '../dtos/requests/update.cat.product.dto';
import { CatProductUpdateCommand } from '../../aplication/command/product/cat.product.update.command';
import { CatProductDeleteCommand } from '../../aplication/command/product/cat.product.delete.command';
import { CatProductFindManyQueryDto } from '../dtos/query/cat.product.find.many.query';
import { CatProductFindByIdQueryDto } from '../dtos/query/cat.product.find.by.id.query.dto';
import { CatProductFindByIdQuery } from '../../aplication/query/cat.product.find.by.id.query';
import { CatProductFindManyQuery } from '../../aplication/query/cat.product.find.many.query';

@Controller('categoryproducts')
export class CategoryProductController {
  constructor(
    private readonly commandBus: CommandBus,
    private queryBus: QueryBus,
  ) {}

  @UseGuards(JwtGuard, RolesGuard)
  @HasRoles('ADMIN')
  @Post('create')
  async createCatProduct(
    @Res() res: Response,
    @Body() payload: CreateCatProductDto,
  ) {
    // map the incoming request into a command
    const command = Builder<CatProductCreateCommand>(CatProductCreateCommand, {
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
  @HasRoles('ADMIN')
  @Put('/update')
  async updateCatProduct(@Body() payload: UpdateCatProductDto) {
    const command = Builder<CatProductUpdateCommand>(CatProductUpdateCommand, {
      ...payload,
    }).build();

    const result = await this.commandBus.execute(command);
    if (result) {
      return { message: 'Product successfully update' };
    }
  }

  @UseGuards(JwtGuard, RolesGuard)
  @HasRoles('ADMIN')
  @Delete('/:id')
  async deleteCatProduct(@Body() payload: DeleteCatProductDto) {
    // console.log(payload);
    const command = Builder<CatProductDeleteCommand>(CatProductDeleteCommand, {
      ...payload,
    }).build();

    const result = await this.commandBus.execute(command);
    if (result) {
      return { message: 'Product deleted successfully' };
    }
  }

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
  //     Builder<BaseHttpResponseDto<CatProductEntity, any>>(BaseHttpResponseDto);
  //   responseBuilder.statusCode(200);
  //   responseBuilder.message('Product Id');

  //   const query = Builder<>;
  // }

  @Get()
  async findManyCatProduct(
    @Res() res: Response,
    @Query()
    query: CatProductFindManyQueryDto,
  ) {
    const responseBuilder =
      Builder<BaseHttpResponseDto<CatProductEntity[], any>>(
        BaseHttpResponseDto,
      );

    responseBuilder.statusCode(200);
    responseBuilder.message('Product List');

    const builder = Builder<CatProductFindManyQuery>(CatProductFindManyQuery, {
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
  async findCatProductById(
    @Res() res: Response,
    @Query() query: CatProductFindByIdQueryDto,
  ) {
    console.log(query);
    const responseBuilder =
      Builder<BaseHttpResponseDto<CatProductEntity, any>>(BaseHttpResponseDto);
    responseBuilder.statusCode(200);
    responseBuilder.message('Product Details');

    const builder = Builder<CatProductFindByIdQuery>(CatProductFindByIdQuery, {
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
