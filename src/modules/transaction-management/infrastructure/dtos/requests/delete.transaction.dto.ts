import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  IsNumber,
  Min,
  IsMongoId,
} from 'class-validator';

export class DeleteTransactionDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  id: string;
}
