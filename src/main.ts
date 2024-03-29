import { RequestMethod, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { json, urlencoded } from 'express';
import { AppModule } from './app.module';
import {
  DocumentBuilder,
  SwaggerDocumentOptions,
  SwaggerModule,
} from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    snapshot: true,
  });

  // validation pipe ref: https://docs.nestjs.com/techniques/validation
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      // whitelist: true, // only allow whitelisted values from dto
      // forbidNonWhitelisted: true, // only allow whitelisted values from dto
    }),
  );

  // file upload limit
  app.use(json({ limit: '50mb' }));
  app.use(urlencoded({ limit: '50mb', extended: true }));
  app.enableCors({ origin: 'http://localhost:3004', credentials: true });

  const swaggerConfig = new DocumentBuilder()
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'JWT',
        description: 'Please login, and insert your JWT token here',
        in: 'header',
      },
      'JwtAuthGuard', // This name here is important for matching up with @ApiBearerAuth() in your controller!
    )
    .setTitle('Amai Backend')
    .setDescription('Amai Backend API')
    .setVersion('3.0')
    .build();

  const swaggerOptions: SwaggerDocumentOptions = {
    operationIdFactory: (controllerKey, methodKey) => methodKey,
  };

  const document = SwaggerModule.createDocument(
    app,
    swaggerConfig,
    swaggerOptions,
  );

  SwaggerModule.setup('api', app, document);

  // add prefix 'api' before all endpoint except the root endpoint
  app.setGlobalPrefix('api', {
    exclude: [{ path: '/', method: RequestMethod.GET }],
  });
  const configService: ConfigService = app.get(ConfigService);

  const port = configService.get<number>('APP_PORT');
  await app.listen(port);

  // await app.init();
}
bootstrap().then(() => {
  console.log('server started at port:', process.env.APP_PORT);
});
