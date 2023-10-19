import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import env from './common/config/env.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  await app.listen(env.port);
}
bootstrap();
