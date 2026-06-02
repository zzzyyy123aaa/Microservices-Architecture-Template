import { Injectable, Logger } from '@nestjs/common';

export interface ServiceRoute { path: string; target: string; }

@Injectable()
export class ProxyService {
  private readonly logger = new Logger(ProxyService.name);
  private readonly routes: ServiceRoute[] = [
    { path: '/api/users', target: 'http://user-service:8001' },
    { path: '/api/orders', target: 'http://order-service:8002' },
    { path: '/api/products', target: 'http://product-service:8003' },
  ];

  getRoute(path: string) { return this.routes.find(r => path.startsWith(r.path)); }
  getAllRoutes() { return this.routes; }
}
