import { Injectable, NestMiddleware, Logger } from '@nestjs/common';
import { createProxyMiddleware, Options } from 'http-proxy-middleware';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class ProxyMiddleware implements NestMiddleware {
  private readonly logger = new Logger(ProxyMiddleware.name);
  private readonly serviceMap: Record<string, string> = {
    '/api/users': 'http://user-service:8001',
    '/api/orders': 'http://order-service:8002',
    '/api/products': 'http://product-service:8003',
  };

  use(req: Request, res: Response, next: NextFunction) {
    const matchedPath = Object.keys(this.serviceMap).find((path) =>
      req.path.startsWith(path)
    );

    if (!matchedPath) {
      next();
      return;
    }

    const target = this.serviceMap[matchedPath];
    this.logger.log(`Proxying ${req.method} ${req.path} -> ${target}`);

    const proxy = createProxyMiddleware({
      target,
      changeOrigin: true,
      pathRewrite: (path) => path.replace(/^\/api/, '') || '/',
      onError: (err, req, res) => {
        this.logger.error(`Proxy error: ${err.message}`);
        (res as Response).status(502).json({
          code: 502,
          message: `Service unavailable: ${target}`,
          timestamp: Date.now(),
        });
      },
      onProxyReq: (proxyReq) => {
        this.logger.log(`Proxying to ${proxyReq.getHeader('host')}${proxyReq.path}`);
      },
    });

    proxy(req, res, next);
  }
}
