import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, Min } from 'class-validator';

export class CreateCatProductDto {
  @ApiProperty()
  @IsString({ message: 'nama harus string' })
  @IsNotEmpty({ message: 'string tidak boleh kosong' })
  name: string;
}
