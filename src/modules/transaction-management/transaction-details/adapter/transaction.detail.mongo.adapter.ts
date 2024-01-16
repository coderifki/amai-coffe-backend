import { ConflictException } from '@nestjs/common';
import { Injectable } from '@nestjs/common/decorators';
import { Builder } from 'builder-pattern';

import { ObjectId } from 'bson';
import { PrismaService } from '../../../../shared/prisma/prisma.service';
import { TransactionDetailEntity } from '../entities/transaction.detail.entity';
import {
  TransactionDetailCreateProps,
  TransactionDetailRepository,
} from '../repositories/transaction.detail.repository';

@Injectable()
export class TransactionDetailMongoAdapter
  implements TransactionDetailRepository
{
  constructor(private prismaService: PrismaService) {}

  async create(
    props: TransactionDetailCreateProps,
    session?: PrismaService,
  ): Promise<TransactionDetailEntity> {
    const prisma = session || this.prismaService;
    try {
      const result = await prisma.transactionDetails.create({
        data: {
          id: props.id || new ObjectId().toString(),
          name: props.name,
          price: props.price,
          category: props.category,
          quantity: props.quantity,
          product_id: props.product_id,
          image: props.images,
          transaction_id: props.transaction_id,
        },
      });

      if (!result) {
        throw new ConflictException('Id had to be created');
      }
      const response = Builder<TransactionDetailEntity>(
        TransactionDetailEntity,
        {
          ...result,
        },
      ).build();

      return response;
    } catch (e) {
      console.log(e);
      throw e;
    }
  }
}
