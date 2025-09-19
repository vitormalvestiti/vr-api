import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.enableCors({ origin: '*'});
  await app.listen(3000);
  console.log(`http://localhost:3000/api`);
}
bootstrap();