import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('products');
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
  app.enableCors();
  const config = new DocumentBuilder().setTitle('Product Service').setDescription('Product catalog API').setVersion('1.0').build();
  SwaggerModule.setup('products/docs', app, SwaggerModule.createDocument(app, config));
  await app.listen(process.env.PRODUCT_SERVICE_PORT || 8003);
  console.log('🚀 Product Service running on: http://localhost:8003');
}
bootstrap();
