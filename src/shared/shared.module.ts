import { Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CqrsModule } from '@nestjs/cqrs';
import { JwtModule } from '@nestjs/jwt';
import { appConfig, IAppConfig } from '../core/config/app.config';
import { PrismaModule } from './prisma/prisma.module';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env'],
      load: [appConfig],
      isGlobal: true,
    }),
    PrismaModule,
    CqrsModule,
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
      global: true,
    }),
  ],
})
export class SharedModule {}
