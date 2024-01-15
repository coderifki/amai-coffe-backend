import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
  ValidateIf,
} from 'class-validator';

export class UpdateProductDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  id: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString({ message: 'nama harus string' })
  @IsNotEmpty({ message: 'string tidak boleh kosong' })
  @ValidateIf((e) => e !== undefined)
  name?: string;

  @ApiPropertyOptional()
  @IsNotEmpty({ message: 'number tidak boleh kosong' })
  @IsNumber({
    allowInfinity: false,
    allowNaN: false,
    maxDecimalPlaces: 4,
  })
  @Type(() => Number) // parse form data menjadi type number (by default form data itu string)
  @Min(1)
  @ValidateIf((e) => e !== undefined)
  price?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString() // validasi bahwa cat_product_id harus string
  @IsNotEmpty({ message: 'category tidak boleh kosong' })
  cat_product_id?: string;
}
