import { ConflictException, NotFoundException } from '@nestjs/common';
import { Injectable } from '@nestjs/common/decorators';
import { Prisma } from '@prisma/client';
import { Builder } from 'builder-pattern';
import {
  CreateTransactionProps,
  DeleteTransactionProps,
  FindTransactionByIdQuery,
  FindTransactionDetailsByIdQuery,
  TransactionRepository,
} from 'src/modules/transaction-management/aplication/ports/transaction.repository';
import { TransactionDetailEntity } from 'src/modules/transaction-management/domain/transaction.detail.entity';
import { TransactionEntity } from 'src/modules/transaction-management/domain/transaction.entity';
import { PrismaService } from '../../../../shared/prisma/prisma.service';

@Injectable()
export class TransactionMongoAdapter implements TransactionRepository {
  constructor(private prismaService: PrismaService) {}

  // async createTransactionWithDetails(
  //   transactionProps: CreateTransactionProps,
  //   detailProps: CreateTransactionDetailProps,
  // ): Promise<TransactionDetailEntity | TransactionEntity> {
  //   try {
  //     // Create the transaction
  //     const transaction = await this.prismaService.transaction.create({
  //       include: { cashier_info: true },
  //       data: {
  //         cashier_id: transactionProps.cashier_id,
  //         name_customer: transactionProps.name_customer,
  //         total_transactions: transactionProps.total_transactions,
  //         pay: transactionProps.pay,
  //         payment_method_name: transactionProps.payment_method_name,
  //       },
  //     });

  //     if (!transaction) {
  //       throw new Error('Failed to create transaction');
  //     }

  //     // Create the transaction detail associated with the transaction
  //     const detail = await this.prismaService.transactionDetails.create({
  //       data: {
  //         // You may need to adjust these based on your data structure
  //         product_id: detailProps.product_id,
  //         quantity: detailProps.quantity,
  //         name: detailProps.name,
  //         price: detailProps.price,
  //         image: detailProps.image,
  //         category: detailProps.category,
  //         transaction_id: transaction.id, // Assign the transaction id to the detail
  //       },
  //     });

  //     if (!detail) {
  //       throw new Error('Failed to create transaction detail');
  //     }

  //     // Return the created transaction and detail
  //     return { transaction, detail };
  //   } catch (error) {
  //     throw new Error(
  //       `Failed to create transaction and detail: ${error.message}`,
  //     );
  //   }
  // }

  async createTransaction(
    props: CreateTransactionProps,
  ): Promise<TransactionEntity> {
    try {
      const result = await this.prismaService.transaction.create({
        include: { transaction_details: true, cashier_info: true },
        data: {
          cashier_id: props.cashier_id,
          name_customer: props.name_customer,
          total_transactions: props.total_transactions,
          pay: props.pay,
          payment_method_name: props.payment_method_name,
          transaction_details: {
            create: props.transaction_details.map((detail) => ({
              // transaction_id: detail.transaction_id,
              product_id: detail.product_id,
              quantity: detail.quantity,
              name: detail.name,
              price: detail.price,
              image: detail.image,
              category: detail.category,
            })),
          },
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

  async findTransactionDetailsById(
    query: FindTransactionDetailsByIdQuery,
  ): Promise<TransactionDetailEntity> {
    try {
      // console.log(query.id);
      const result = await this.prismaService.transactionDetails.findUnique({
        include: { transaction_info: true },
        where: {
          id: query.id,
        },
      });

      if (!result) {
        throw new NotFoundException('Transaction not found');
      }
      const transactionDetailEntity = Builder<TransactionDetailEntity>(
        TransactionDetailEntity,
        {
          ...result,
        },
      ).build();
      return transactionDetailEntity;
    } catch (error) {
      console.error(error);
      throw new NotFoundException('Transaction not found');
    }
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
