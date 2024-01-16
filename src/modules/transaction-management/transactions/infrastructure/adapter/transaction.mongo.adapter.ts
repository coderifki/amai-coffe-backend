import { ConflictException, NotFoundException } from '@nestjs/common';
import { Injectable } from '@nestjs/common/decorators';
import { Prisma } from '@prisma/client';
import { Builder } from 'builder-pattern';
import {
  CreateTransactionProps,
  DeleteTransactionProps,
  FindTransactionByIdQuery,
  TransactionFindFirstQuery,
  TransactionRelations,
  TransactionRepository,
} from 'src/modules/transaction-management/transactions/aplication/ports/transaction.repository';
import { TransactionDetailEntity } from 'src/modules/transaction-management/transactions/domain/transaction.detail.entity';
import { TransactionEntity } from 'src/modules/transaction-management/transactions/domain/transaction.entity';
import { PrismaService } from '../../../../../shared/prisma/prisma.service';
import { ObjectId } from 'bson';

@Injectable()
export class TransactionMongoAdapter implements TransactionRepository {
  constructor(private prismaService: PrismaService) {}

  async create(props: CreateTransactionProps): Promise<TransactionEntity> {
    try {
      const result = await this.prismaService.transaction.create({
        data: {
          id: props.id || new ObjectId().toString(),
          cashier_id: props.cashier_id,
          name_customer: props.name_customer,
          total_transactions: props.total_transactions,
          pay: props.pay,
          payment_method_name: props.payment_method_name,
        },
      });

      const response = Builder<TransactionEntity>(TransactionEntity, {
        ...result,
      }).build();

      return response;
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  applyInclude(relations: TransactionRelations[]) {
    const inludes: Prisma.TransactionInclude = {};
    for (const relation of relations) {
      if (relation === 'transaction_details') {
        inludes.transaction_details = true;
      }
      if (relation === 'cashier_info') {
        inludes.cashier_info = true;
      }
    }
    return inludes;
  }

  findFirstFilter(props: TransactionFindFirstQuery) {
    const args: Prisma.TransactionFindFirstArgs = {};
    const whereClause: Prisma.TransactionWhereInput = {};
    if (props.transaction_id) whereClause.id = props.transaction_id;
    if (props.include_relations) {
      args.include = this.applyInclude(props.include_relations);
    }
    args.where = whereClause;
    return args;
  }

  async findFirst(
    props: TransactionFindFirstQuery,
    session?: PrismaService,
  ): Promise<TransactionEntity> {
    const prisma = session || this.prismaService;
    try {
      const args = this.findFirstFilter(props);
      const res = await prisma.transaction.findFirst(args);

      return Builder<TransactionEntity>(TransactionEntity, res).build();
    } catch (error) {
      throw error;
    }
  }

  async findMany() {}

  // Fungsi untuk menambahkan jumlah transaksi
  async increaseQuantity(
    transactionId: string,
    amount: number,
  ): Promise<TransactionEntity> {
    try {
      const updatedTransaction = await this.prismaService.transaction.update({
        where: { id: transactionId },
        data: {
          total_transactions: {
            increment: amount,
          },
        },
        include: { cashier_info: true }, // Sesuaikan dengan kebutuhan Anda
      });

      if (!updatedTransaction) {
        throw new NotFoundException('Transaction not found');
      }

      const response = Builder<TransactionEntity>(TransactionEntity, {
        ...updatedTransaction,
      }).build();

      return response;
    } catch (error) {
      console.error(error);
      throw new Error('Failed to increase quantity');
    }
  }
  // Fungsi untuk mengurangi jumlah transaksi
  async decreaseQuantity(
    transactionId: string,
    amount: number,
  ): Promise<TransactionDetailEntity> {
    const transaction = await this.prismaService.transactionDetails.update({
      where: { id: transactionId },
      data: {
        quantity: {
          decrement: amount,
        },
      },
    });

    if (!transaction) {
      throw new NotFoundException('Transaction not found');
    }

    const response = Builder<TransactionDetailEntity>(TransactionDetailEntity, {
      ...transaction,
    }).build();

    return response;
  }
  catch(error) {
    console.error(error);
    throw new Error('Failed to decrease quantity');
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
    const results = await this.prismaService.transaction.findMany({});

    const response = results.map((result) =>
      Builder<TransactionEntity>(TransactionEntity, {
        ...result,
      }).build(),
    );

    return response;
  }

  // This function for find id detail transaction entities
  async findTransactionById(
    query: FindTransactionByIdQuery,
  ): Promise<TransactionEntity> {
    try {
      // console.log(query.id);
      const result = await this.prismaService.transaction.findUnique({
        include: { transaction_details: true, cashier_info: true },
        where: {
          id: query.id,
          // product_id: query.product_id,
          // quantity: query.quantity,
          // name: query.name,
          // price: query.price,
          // image: query.image,
          // category: query.category,
          // transaction_id: query.transaction_id,
        },
      });

      if (!result) {
        throw new NotFoundException('Transaction detail not found');
      }
      const transactionEntity = Builder<TransactionEntity>(TransactionEntity, {
        ...result,
      }).build();

      // .id(result.id)
      // .product_id(result.product_id)
      // .quantity(result.quantity)
      // .name(result.name)
      // .price(result.price)
      // .image(result.image)
      // .category(result.category)
      // .transaction_id(result.transaction_id)

      return transactionEntity;
    } catch (error) {
      console.error(error);
      throw new NotFoundException('Transaction detail not found');
    }
  }

  // async findTransactionDetailsById(
  //   query: FindTransactionDetailsByIdQuery,
  // ): Promise<TransactionDetailEntity> {
  //   try {
  //     const result = await this.prismaService.transactionDetails.findUnique({
  //       include: { transaction_info: true },
  //       where: {
  //         id: query.id,
  //       },
  //     });

  //     if (!result) {
  //       throw new NotFoundException('Transaction not found');
  //     }

  //     const transactionDetailEntity = Builder<TransactionDetailEntity>(
  //       TransactionDetailEntity,
  //       {
  //         ...result,
  //       },
  //     ).build();
  //     return transactionDetailEntity;
  //   } catch (error) {
  //     console.error(error);
  //     throw new NotFoundException('Transaction not found');
  //   }
  // }

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
