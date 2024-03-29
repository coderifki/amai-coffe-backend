import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class DeleteProductDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  id: string;
}
