import { NestFactory } from '@nestjs/core';
import { INestApplication } from '@nestjs/common';
import { AppModule } from './app.module';
import { setupSwagger } from './swagger';

async function bootstrap() {
  const app = await NestFactory.create<INestApplication>(AppModule);
  setupSwagger(app)

  await app.listen(process.env.PORT || 3000);
}
bootstrap();
