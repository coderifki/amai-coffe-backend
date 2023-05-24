import { Controller, Post, BadRequestException, Body } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { Builder } from 'builder-pattern';
import { ProductCreateCommand } from '../../aplication/command/product/product.create.command';
import { CreateProductDto } from '../dtos/requests/create.product.dto';

@Controller('products')
export class ProductController {
  constructor(private readonly commandBus: CommandBus) {}

  @Post('create')
  async createProduct(@Body() payload: CreateProductDto) {
    // map the incoming request into a command
    const command = Builder<ProductCreateCommand>(ProductCreateCommand, {
      ...payload,
    }).build();
    const result = await this.commandBus.execute(command);
    // const responseBuilder = Builder<BaseHttpResponseDto<any, any>>(
    //   BaseHttpResponseDto,
    //   {
    //     data: {
    //       ...result,
    //     },
    //   },
    // );
    // responseBuilder.statusCode(201);
    // responseBuilder.message('User Registerd Successfully!');
    // const response = responseBuilder.build();
    // return baseHttpResponseHelper(res, response);
  }
}
