import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

// validate payload that goes in to the app (controller)
export class BaseLoginRequestDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  login_id: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  password: string;
}
