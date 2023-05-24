import { registerAs } from '@nestjs/config';
import * as Joi from 'joi';
import { baseJoiRequiredNumber } from '../utils/joi-required-number';
import { baseJoiRequiredString } from '../utils/joi-required-string';

/**
 * App Config (.env loader)
 * @author RDanang(iyoy)
 */
export interface IAppConfig {
  port: number;
  env: string;
  appName: string;
  appVersion: string;
  jwtSecret: string;
  jwtExpire: number;
}

export const appConfig = registerAs('appConfig', (): IAppConfig => {
  const values = {
    port: parseInt(process.env.APP_PORT, 10),
    env: process.env.NODE_ENV || 'development',
    appName: process.env.APP_NAME,
    appVersion: process.env.APP_VERSION,
    jwtSecret: process.env.JWT_SECRET,
    jwtExpire: parseInt(process.env.JWT_EXPIRE_TIME, 10),
  };

  const schema = Joi.object<IAppConfig>({
    port: baseJoiRequiredNumber('APP_PORT'),
    env: Joi.string().required().valid('development', 'production', 'test'),
    appName: baseJoiRequiredString('APP_NAME'),
    appVersion: baseJoiRequiredString('APP_VERSION'),
    jwtSecret: baseJoiRequiredString('JWT_SECRET'),
    jwtExpire: baseJoiRequiredNumber('JWT_EXPIRE_TIME'),
  });

  const { error, value } = schema.validate(values, {
    abortEarly: false,
  });
  if (error) {
    throw new Error(
      `An error occurred while validating the environment variables for App environment : ${error.message}`,
    );
  }

  return value;
});
