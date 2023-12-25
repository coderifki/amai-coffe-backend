import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Query,
  Res,
  UseGuards,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { Builder } from 'builder-pattern';
import { Response } from 'express';
import { TransactionCreateCommand } from 'src/modules/transaction-management/aplication/command/transaction/transaction.create.command';
import { TransactionFindManyQuery } from 'src/modules/transaction-management/aplication/query/transaction.find.many.query';
import { TransactionEntity } from 'src/modules/transaction-management/domain/transaction.entity';
import { TransactionFindManyQueryDto } from 'src/modules/transaction-management/infrastructure/dtos/query/transaction.find.many.query';
import { CreateTransactionDto } from 'src/modules/transaction-management/infrastructure/dtos/requests/create.transaction.dto';
import { HasRoles } from '../../../../core/decorators/has-roles.decorator';
import { BaseHttpResponseDto } from '../../../../core/helper/application/dtos/base.http.response.dto';
import { baseHttpResponseHelper } from '../../../../core/helper/base.response.helper';
import { JwtGuard } from '../../../auth/guards/jwt.auth.guard';
import { RolesGuard } from '../../../auth/guards/roles.guard';
import { TransactionFindByIdQueryDto } from 'src/modules/transaction-management/infrastructure/dtos/query/transaction.find.by.id.query.dto';
import { TransactionFindByIdQuery } from 'src/modules/transaction-management/aplication/query/transaction.find.by.id.query';
import { TransactionDeleteCommand } from 'src/modules/transaction-management/aplication/command/transaction/transaction.delete.command';
import { DeleteTransactionDto } from 'src/modules/transaction-management/infrastructure/dtos/requests/delete.transaction.dto';

@Controller('transactions')
export class TransactionController {
  constructor(
    private readonly commandBus: CommandBus,
    private queryBus: QueryBus,
  ) {}

  @UseGuards(JwtGuard, RolesGuard)
  @HasRoles('ADMIN')
  @Post('create')
  async createTransaction(
    @Res() res: Response,
    @Body() payload: CreateTransactionDto,
  ) {
    // map the incoming request into a command
    const command = Builder<TransactionCreateCommand>(
      TransactionCreateCommand,
      {
        ...payload,
      },
    ).build();
    const result = await this.commandBus.execute(command);
    // if (result) {
    //   return { message: 'Transaction successfully added' };
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
    responseBuilder.message('Transaction Successfully Added!');
    const response = responseBuilder.build();
    return baseHttpResponseHelper(res, response);
  }

  // @UseGuards(JwtGuard, RolesGuard)
  // @HasRoles('ADMIN', 'CASHIER')
  // @Put('/update')
  // async updateTransaction(@Body() payload: UpdateTransactionDto) {
  //   const command = Builder<TransactionUpdateCommand>(
  //     TransactionUpdateCommand,
  //     {
  //       ...payload,
  //     },
  //   ).build();

  //   const result = await this.commandBus.execute(command);
  //   if (result) {
  //     return { message: 'Transaction successfully update' };
  //   }
  // }

  @UseGuards(JwtGuard, RolesGuard)
  @HasRoles('ADMIN')
  @Delete('/:id')
  async deleteTransaction(@Body() payload: DeleteTransactionDto) {
    // console.log(payload);
    const command = Builder<TransactionDeleteCommand>(
      TransactionDeleteCommand,
      {
        ...payload,
      },
    ).build();

    const result = await this.commandBus.execute(command);
    if (result) {
      return { message: 'Transaction deleted successfully' };
    }
  }

  // @UseGuards(JwtGuard, RolesGuard)
  // @HasRoles('ADMIN')
  // @Get('')
  // async findAllTransaction(@Body() payload: UpdateTransactionDto) {
  //   const command = Builder<TransactionUpdateCommand>(TransactionUpdateCommand, {
  //     ...payload,
  //   }).build();

  //   const result = await this.commandBus.execute(command);
  //   if (result) {
  //     return { message: 'Transaction deleted successfully' };
  //   }
  // }

  // @UseGuards(JwtGuard, RolesGuard)
  // @HasRoles('ADMIN')
  // @Get('/:id')
  // async findTransactionById(@Res() res: Response, @Param('id') id: string) {
  //   const responseBuilder =
  //     Builder<BaseHttpResponseDto<TransactionEntity, any>>(BaseHttpResponseDto);
  //   responseBuilder.statusCode(200);
  //   responseBuilder.message('Transaction Id');

  //   const query = Builder<>;
  // }

  @Get()
  async findManyTransaction(
    @Res() res: Response,
    @Query()
    query: TransactionFindManyQueryDto,
  ) {
    const responseBuilder =
      Builder<BaseHttpResponseDto<TransactionEntity[], any>>(
        BaseHttpResponseDto,
      );

    responseBuilder.statusCode(200);
    responseBuilder.message('Transaction List');

    const builder = Builder<TransactionFindManyQuery>(
      TransactionFindManyQuery,
      {
        ...query,
      },
    );
    const result = await this.queryBus.execute(builder.build());

    if (!result) {
      responseBuilder.message('Transaction not found');
      return baseHttpResponseHelper(res, responseBuilder.build());
    }

    responseBuilder.data(result);
    return baseHttpResponseHelper(res, responseBuilder.build());
  }

  @Get('find') // Endpoint for finding a transaction by ID
  async findTransactionById(
    @Res() res: Response,
    @Query() query: TransactionFindByIdQueryDto,
  ) {
    // console.log(query);
    const responseBuilder =
      Builder<BaseHttpResponseDto<TransactionEntity, any>>(BaseHttpResponseDto);
    responseBuilder.statusCode(200);
    responseBuilder.message('Transaction Details');

    const builder = Builder<TransactionFindByIdQuery>(
      TransactionFindByIdQuery,
      {
        ...query,
      },
    );

    const result = await this.queryBus.execute(builder.build());

    if (!result) {
      responseBuilder.message('Transaction not found');
      return baseHttpResponseHelper(res, responseBuilder.build());
    }

    responseBuilder.data(result);
    return baseHttpResponseHelper(res, responseBuilder.build());
  }
}
