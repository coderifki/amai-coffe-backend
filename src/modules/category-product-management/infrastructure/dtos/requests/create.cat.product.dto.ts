import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, Min } from 'class-validator';

export class CreateProductDto {
  @ApiProperty()
  @IsString({ message: 'nama harus string' })
  @IsNotEmpty({ message: 'string tidak boleh kosong' })
  name: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'number tidak boleh kosong' })
  @IsNumber({}, {})
  @Min(1)
  price: number;
}
