import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,       // strip unknown properties
      forbidNonWhitelisted: true,
      transform: true,       // auto-convert @Type() decorators
      transformOptions: { enableImplicitConversion: false },
    }),
  );

  await app.listen(process.env['PORT'] ?? 3000);
}

bootstrap();
