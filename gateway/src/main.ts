import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { createProxyMiddleware } from 'http-proxy-middleware';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Proxy: /api/users -> user-service, /api/orders -> order-service, /api/products -> product-service
  const serviceMap: Record<string, string> = {
    '/api/users': 'http://user-service:8001',
    '/api/orders': 'http://order-service:8002',
    '/api/products': 'http://product-service:8003',
  };

  const expressApp = app.getHttpAdapter().getInstance();
  for (const [path, target] of Object.entries(serviceMap)) {
    expressApp.use(
      path,
      createProxyMiddleware({
        target,
        changeOrigin: true,
        pathRewrite: (p) => p.replace(/^\/api/, '') || '/',
        onError: (err, req, res) => {
          console.error(`Proxy error [${path}]: ${err.message}`);
          (res as any).status(502).json({ code: 502, message: `Service unavailable: ${target}` });
        },
      }),
    );
  }

  app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
  app.enableCors({ origin: process.env.CORS_ORIGIN || 'http://localhost:3000', credentials: true });

  const config = new DocumentBuilder()
    .setTitle('API Gateway')
    .setDescription('Microservices API Gateway')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  const port = process.env.GATEWAY_PORT || 8000;
  await app.listen(port);
  console.log(`🚀 Gateway running on: http://localhost:${port}`);
  console.log(`📚 Swagger docs: http://localhost:${port}/api/docs`);
}
bootstrap();
