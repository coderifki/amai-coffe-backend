import {
  Controller,
  Post,
  BadRequestException,
  Body,
  UseGuards,
} from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { Builder } from 'builder-pattern';
import { ProductCreateCommand } from '../../aplication/command/product/product.create.command';
import { CreateProductDto } from '../dtos/requests/create.product.dto';
import { JwtGuard } from '../../../auth/guards/jwt.auth.guard';
import { RolesGuard } from '../../../auth/guards/roles.guard';
import { HasRoles } from '../../../../core/decorators/has-roles.decorator';

@Controller('products')
export class ProductController {
  constructor(private readonly commandBus: CommandBus) {}

  @UseGuards(JwtGuard, RolesGuard)
  @HasRoles('ADMIN')
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
