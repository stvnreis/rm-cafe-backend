import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { EnvService } from './env/env.service';
import { Logger, ValidationPipe } from '@nestjs/common';
import { ResourceNotFoundFilter } from './filters/resource-not-found.filter';
import { PrismaExceptionFilter } from './filters/prisma-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const envService = app.get(EnvService);
  const logger = new Logger('arfudyBackendAPI');

  app.useGlobalFilters(
    new ResourceNotFoundFilter(),
    new PrismaExceptionFilter(),
  );

  app.enableCors({
    origin: true,
    methods: 'GET, POST, PATCH, DELETE, OPTIONS, HEAD',
    credentials: true,
  });

  app
    .useGlobalPipes(
      new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }),
    )
    .setGlobalPrefix('api');

  await app
    .listen(envService.get('PORT'))
    .then(() =>
      logger.log(`Server listening on port ${envService.get('PORT')}`),
    )
    .catch((err) => {
      logger.error(err);
    });
}
bootstrap();
