import { Body, Controller, Post, Res } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { Builder } from 'builder-pattern';
import { BaseHttpResponseDto } from '../../../../core/helper/application/dtos/base.http.response.dto';
import { baseHttpResponseHelper } from '../../../../core/helper/base.response.helper';
import { BaseLoginRequestDto } from '../dtos/requests/base.login.request.dto';
import { Response } from 'express';
import { LoginEmployeeCommand } from '../../applications/command/employee/login/login.employee.command';

@Controller('auth')
export class AuthController {
  constructor(private readonly commandBus: CommandBus) {}

  @Post('employee/login')
  async login(@Res() res: Response, @Body() dto: BaseLoginRequestDto) {
    // map the incoming request into a command
    const command = Builder<LoginEmployeeCommand>(LoginEmployeeCommand, {
      ...dto,
    }).build();

    const result = await this.commandBus.execute(command);

    const responseBuilder = Builder<BaseHttpResponseDto<any, any>>(
      BaseHttpResponseDto,
      {
        data: {
          ...result,
        },
      },
    );
    responseBuilder.statusCode(201);
    responseBuilder.message('User Registerd Successfully!');
    const response = responseBuilder.build();

    return baseHttpResponseHelper(res, response);
  }
}
