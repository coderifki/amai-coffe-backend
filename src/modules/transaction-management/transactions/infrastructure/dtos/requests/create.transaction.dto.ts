import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsNumber,
  IsString,
  Min,
  ValidateNested,
} from 'class-validator';

export class TransactionDetailsDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  product_id: string;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  @Min(1)
  qty: number;
}

export class CreateTransactionDto {
  @ApiProperty()
  @IsString({ message: 'Nama harus berupa string' })
  @IsNotEmpty({ message: 'Nama tidak boleh kosong' })
  name_customer: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'Total transaksi tidak boleh kosong' })
  @IsNumber({}, { message: 'Total transaksi harus berupa angka' })
  @Min(1, { message: 'Total transaksi harus lebih besar dari 0' })
  total_transactions: number;

  @ApiProperty()
  @IsNotEmpty({ message: 'Pembayaran tidak boleh kosong' })
  @IsNumber({}, { message: 'Pembayaran harus berupa angka' })
  @Min(1, { message: 'Pembayaran harus lebih besar dari 0' })
  pay: number;

  @ApiProperty()
  @IsString({ message: 'Nama metode pembayaran harus berupa string' })
  @IsNotEmpty({ message: 'Nama metode pembayaran tidak boleh kosong' })
  payment_method_name: string;

  @ApiProperty()
  @ValidateNested({ each: true })
  @Type(() => TransactionDetailsDto)
  transaction_details: TransactionDetailsDto[];
}
