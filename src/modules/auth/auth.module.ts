import { Module, Provider } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CqrsModule } from '@nestjs/cqrs';
import { JwtModule } from '@nestjs/jwt';
import { IAppConfig } from '../../core/config/app.config';
import { LoginEmployeeCommandHandler } from './applications/command/employee/login/login.employee.command';
import { USER_REPOSITORY } from './applications/ports/user.repository';
import { UserMongoAdapter } from './infrastructure/adapter/user.mongo.adapter';
import { AuthController } from './infrastructure/delivery/auth.employee.controller';

const apiControllers = [AuthController];

const modules = [CqrsModule];

// const queries: Provider[] = [];

const repositories: Provider[] = [
  {
    provide: USER_REPOSITORY,
    useClass: UserMongoAdapter,
  },
];

const commands: Provider[] = [
  /* authentication */
  LoginEmployeeCommandHandler,
];

@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => {
        const appConfig = config.get<IAppConfig>('appConfig');
        return {
          secret: appConfig.jwtSecret,
          signOptions: { expiresIn: appConfig.jwtExpire },
        };
      },
    }),
    ...modules,
  ],
  controllers: [...apiControllers],
  providers: [...commands, ...repositories],
  exports: [
    {
      provide: USER_REPOSITORY,
      useClass: UserMongoAdapter,
    },
  ],
})
export class AuthModule {}
