import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsString, Min } from 'class-validator';

export class CreateProductDto {
  @ApiProperty()
  @IsString({ message: 'nama harus string' })
  @IsNotEmpty({ message: 'string tidak boleh kosong' })
  name: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'number tidak boleh kosong' })
  @IsNumber({
    allowInfinity: false,
    allowNaN: false,
    maxDecimalPlaces: 4,
  })
  @Type(() => Number) // parse form data menjadi type number (by default form data itu string)
  @Min(1)
  price: number;

  @ApiProperty()
  @IsString() // validasi bahwa cat_product_id harus string
  @IsNotEmpty({ message: 'category tidak boleh kosong' })
  cat_product_id: string;
}
