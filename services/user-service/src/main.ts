import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('users');
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
  app.enableCors();
  const config = new DocumentBuilder().setTitle('User Service').setDescription('User management API').setVersion('1.0').build();
  SwaggerModule.setup('users/docs', app, SwaggerModule.createDocument(app, config));
  await app.listen(process.env.USER_SERVICE_PORT || 8001);
  console.log('🚀 User Service running on: http://localhost:8001');
}
bootstrap();
