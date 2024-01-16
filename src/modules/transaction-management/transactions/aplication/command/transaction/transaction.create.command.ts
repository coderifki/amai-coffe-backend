import { NotFoundException } from '@nestjs/common';
import { Inject } from '@nestjs/common/decorators';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import {
  TRANSACTION_REPOSITORY,
  TransactionRepository,
} from 'src/modules/transaction-management/transactions/aplication/ports/transaction.repository';
import { PrismaService } from '../../../../../../shared/prisma/prisma.service';
import {
  PRODUCT_REPOSITORY,
  ProductRepository,
} from '../../../../../product-management/aplication/ports/product.repository';
import { ProductEntity } from '../../../../../product-management/domain/product.entity';
import {
  TRANSACTION_DETAIL_REPOSITORY,
  TransactionDetailRepository,
} from '../../../../transaction-details/repositories/transaction.detail.repository';
import { TransactionEntity } from '../../../domain/transaction.entity';
import { TransactionDetailsDto } from '../../../infrastructure/dtos/requests/create.transaction.dto';
import { ObjectId } from 'bson';

export class TransactionCreateCommand {
  cashier_id?: string;
  name_customer: string;
  total_transactions: number;
  payment_method_name: string;
  pay: number;
  transaction_details: TransactionDetailsDto[];
}

export class TransactionCreateCommandResponse {
  data: TransactionEntity;
}

interface ProductWithQty extends ProductEntity {
  qty: number;
}
@CommandHandler(TransactionCreateCommand)
export class TransactionCreateCommandHandler
  implements
    ICommandHandler<TransactionCreateCommand, TransactionCreateCommandResponse>
{
  constructor(
    private readonly prismaService: PrismaService,
    @Inject(TRANSACTION_REPOSITORY)
    private readonly transactionRepo: TransactionRepository,
    @Inject(PRODUCT_REPOSITORY)
    private readonly productRepo: ProductRepository,
    @Inject(TRANSACTION_DETAIL_REPOSITORY)
    private readonly detailRepo: TransactionDetailRepository,
  ) {}
  async execute(
    command: TransactionCreateCommand,
  ): Promise<TransactionCreateCommandResponse> {
    // console.dir(command, { depth: null });
    // return await this.transactionRepo.createTransaction(command);
    try {
      const transactionId = new ObjectId().toString();
      // start a transactions (so when ever error happens it will rollback)
      // ex: transaction created, but product not found / detail not saved, the created transaction will be deleted (rolled back)
      await this.prismaService.$transaction(
        async (tx) => {
          // find product
          const products: ProductWithQty[] = [];
          let totalTransactions: number = 0;

          // loop trough transaction details
          for (const detail of command.transaction_details) {
            // fetch the product
            const fetchP = await this.productRepo.findProductById(
              {
                id: detail.product_id,
              },
              tx,
            );

            if (!fetchP) {
              throw new NotFoundException(
                `Product ${detail.product_id} not found`,
              );
            }

            products.push({
              ...fetchP,
              qty: detail.qty,
            });
            const thisItemTotal = fetchP.price * detail.qty;
            totalTransactions += thisItemTotal;
          }

          // create transaction
          await this.transactionRepo.create(
            {
              id: transactionId,
              cashier_id: command.cashier_id,
              name_customer: command.name_customer,
              total_transactions: totalTransactions,
              payment_method_name: command.payment_method_name,
              pay: command.pay,
            },
            tx,
          );

          // create transaction details
          if (products.length > 0) {
            for (const p of products) {
              await this.detailRepo.create({
                product_id: p.id,
                category: p.cat_product_detail ? p.cat_product_detail.name : '',
                name: p.name,
                price: p.price,
                quantity: p.qty,
                images: p.images,
                transaction_id: transactionId,
              });
            }
          }
        },
        {
          timeout: 50000,
        },
      );

      const data = await this.transactionRepo.findFirst({
        transaction_id: transactionId,
        include_relations: ['cashier_info', 'transaction_details'],
      });

      if (!data) {
        throw new NotFoundException(`Transaction ${transactionId} not found!`);
      }

      return { data };
    } catch (error) {
      throw error;
    }
  }
}
