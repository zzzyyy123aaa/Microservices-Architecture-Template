import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('orders');
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
  app.enableCors();
  const config = new DocumentBuilder().setTitle('Order Service').setDescription('Order management API').setVersion('1.0').build();
  SwaggerModule.setup('orders/docs', app, SwaggerModule.createDocument(app, config));
  await app.listen(process.env.ORDER_SERVICE_PORT || 8002);
  console.log('🚀 Order Service running on: http://localhost:8002');
}
bootstrap();
