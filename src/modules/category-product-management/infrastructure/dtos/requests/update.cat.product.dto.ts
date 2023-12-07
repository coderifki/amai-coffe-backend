import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId, IsNotEmpty, IsString } from 'class-validator';

export class UpdateCatProductDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @IsMongoId()
  id: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;
}
