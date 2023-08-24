import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  IsNumber,
  Min,
  IsMongoId,
} from 'class-validator';

export class DeleteCatProductDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  id: string;
}
