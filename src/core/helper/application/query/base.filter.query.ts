import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumber } from 'class-validator';

export class BaseFilterQuery {
  @ApiProperty({
    example: 10,
  })
  @IsNumber()
  @Type(() => Number)
  limit: number = 1;

  @ApiProperty({
    example: 1,
  })
  @IsNumber()
  @Type(() => Number)
  page: number = 20;
}
