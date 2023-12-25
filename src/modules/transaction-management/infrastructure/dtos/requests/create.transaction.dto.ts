import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, Min } from 'class-validator';

export class CreateTransactionDto {
  @ApiProperty()
  @IsString({ message: 'Nama harus berupa string' })
  @IsNotEmpty({ message: 'Nama tidak boleh kosong' })
  name_customer: string;

  @ApiProperty()
  @IsString({ message: 'Nama harus berupa string' })
  cashier_id: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'Total transaksi tidak boleh kosong' })
  @IsNumber({}, { message: 'Total transaksi harus berupa angka' })
  @Min(1, { message: 'Total transaksi harus lebih besar dari 0' })
  totalTransaction: number;

  @ApiProperty()
  @IsNotEmpty({ message: 'Pembayaran tidak boleh kosong' })
  @IsNumber({}, { message: 'Pembayaran harus berupa angka' })
  @Min(1, { message: 'Pembayaran harus lebih besar dari 0' })
  pay: number;

  @ApiProperty()
  @IsString({ message: 'Nama harus berupa string' })
  @IsNotEmpty({ message: 'Nama tidak boleh kosong' })
  payment_method_name: string;
}
