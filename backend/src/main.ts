import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app/app.module';
import * as cors from 'cors';
async function bootstrap() {
  console.info(process.env.DB_URL);
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.use(cors());

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
