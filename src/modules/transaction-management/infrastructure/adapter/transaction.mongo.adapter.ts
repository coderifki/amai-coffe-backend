import { ConflictException, NotFoundException } from '@nestjs/common';
import { Injectable } from '@nestjs/common/decorators';
import { Prisma } from '@prisma/client';
import { Builder } from 'builder-pattern';
import {
  CreateTransactionProps,
  DeleteTransactionProps,
  FindTransactionByIdQuery,
  TransactionRepository,
} from 'src/modules/transaction-management/aplication/ports/transaction.repository';
import { TransactionEntity } from 'src/modules/transaction-management/domain/transaction.entity';
import { PrismaService } from '../../../../shared/prisma/prisma.service';

@Injectable()
export class TransactionMongoAdapter implements TransactionRepository {
  constructor(private prismaService: PrismaService) {}

  async createTransaction(
    props: CreateTransactionProps,
  ): Promise<TransactionEntity> {
    try {
      const result = await this.prismaService.transaction.create({
        include: { cashier_info: true },
        data: {
          name_customer: props.name_customer,
          pay: props.pay,
          total_transactions: props.total_transactions,
          cashier_id: props.cashier_id,
          payment_method_name: props.payment_method_name,
          // cat_transaction_id: props.cat_transaction_id,
        },
      });

      if (!result) {
        throw new ConflictException('Id had to be created');
      }
      const response = Builder<TransactionEntity>(TransactionEntity, {
        ...result,
      }).build();

      return response;
    } catch (e) {
      console.log(e);
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        if (e.code === 'P2002') {
          // throw new transactionAlreadyExistException();
        }
      }
      throw e;
    }
  }

  // async updateTransaction(
  //   props: UpdateTransactionProps,
  // ): Promise<TransactionEntity> {
  //   // console.log(props);
  //   const result = await this.prismaService.transaction.update({
  //     include: { cat_transaction_detail: true },
  //     where: {
  //       id: props.id,
  //     },

  //     data: {
  //       name: props.name,
  //       price: props.price,
  //     },
  //   });

  //   const response = Builder<TransactionEntity>(TransactionEntity, {
  //     ...result,
  //   }).build();

  //   return response;
  // }

  async findManyTransaction(): Promise<TransactionEntity[]> {
    const results = await this.prismaService.transaction.findMany({
      // include: {
      //   cat_transaction_detail: true, // this is relation for categoryTransaction
      // },
    });

    const response = results.map((result) =>
      Builder<TransactionEntity>(TransactionEntity, {
        ...result,
      }).build(),
    );

    return response;
  }

  async findTransactionById(
    query: FindTransactionByIdQuery,
  ): Promise<TransactionEntity> {
    // console.log(query.id);
    const result = await this.prismaService.transaction.findUnique({
      // include: { cat_transaction_detail: true },
      where: {
        id: query.id,
      },
    });

    if (!result) {
      throw new NotFoundException('Transaction not found');
    }
    const transactionEntity = Builder<TransactionEntity>(TransactionEntity, {
      ...result,
    }).build();

    return transactionEntity;
  }

  async deleteTransaction(
    props: DeleteTransactionProps,
  ): Promise<TransactionEntity> {
    const result = await this.prismaService.transaction.delete({
      where: {
        id: props.id,
      },
    });

    if (!result) {
      throw new NotFoundException('Transaction not found');
    }

    const response = Builder<TransactionEntity>(TransactionEntity, {
      ...result,
    }).build();

    return response;
  }
}
