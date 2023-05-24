import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, Min } from 'class-validator';

export class CreateProductDto {
  @ApiProperty()
  @IsString({ message: 'name harus string' })
  @IsNotEmpty({ message: 'string tidak boleh kosong' })
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber({}, {})
  @Min(1)
  price: number;
}
