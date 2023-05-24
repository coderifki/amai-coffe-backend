import { Inject, UnauthorizedException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { JwtService } from '@nestjs/jwt';
import { comparePassword } from '../../../../../../core/utils/passwordHash';
import { LoginResponse } from '../../../../infrastructure/dtos/responses/login.response.dto';
import {
  USER_REPOSITORY,
  UserRepository,
} from '../../../ports/user.repository';

// this is the service (business logic)

export class LoginEmployeeCommand {
  login_id: string;
  password: string;
}

@CommandHandler(LoginEmployeeCommand)
export class LoginEmployeeCommandHandler
  implements ICommandHandler<LoginEmployeeCommand>
{
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepo: UserRepository,
    private readonly jwtService: JwtService,
  ) {}

  async execute(command: LoginEmployeeCommand): Promise<LoginResponse> {
    // console.log('payload on merchant login command', command);
    const {
      /* auth */
      login_id,
      password,
    } = command;

    let email: string = '';
    let phone: string = '';
    // Check if loginId is an email
    // Email format: <sequence of non-whitespace characters>@<sequence of non-whitespace characters>.<sequence of non-whitespace characters>
    if (/^\S+@\S+\.\S+$/.test(login_id)) email = login_id;

    // Check if loginId is a phone number
    // Phone number format: <sequence of digits>
    if (/^\d+$/.test(login_id)) phone = login_id;

    // const hashedPassword = await hashPassword(password);

    const user = await this.userRepo.checkExistence({
      email,
      phone,
    });
    // console.log(user);

    if (!user) throw new UnauthorizedException('Wrong Credentials');

    const comparedPassword = await comparePassword(password, user.password);
    if (!comparedPassword) throw new UnauthorizedException('Wrong Credentials');
    // console.log(comparedPassword);

    const jwtPayload = {
      sub: user.id,
      phone: user.phone,
      email: user.email,
      role: user.role,
    };

    return {
      jwt_token: this.jwtService.sign(jwtPayload),
      user: {
        ...user,
      },
    };
  }
}
