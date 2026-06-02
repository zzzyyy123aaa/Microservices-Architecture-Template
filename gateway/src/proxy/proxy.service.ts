import { Injectable, Logger } from '@nestjs/common';
import { SERVICES, SERVICE_PORTS } from '../../shared/constants';

interface ServiceRoute { path: string; target: string; }

@Injectable()
export class ProxyService {
  private readonly logger = new Logger(ProxyService.name);
  private readonly routes: ServiceRoute[] = [
    { path: '/api/users', target: `http://${SERVICES.USER_SERVICE}:${SERVICE_PORTS.USER_SERVICE}` },
    { path: '/api/orders', target: `http://${SERVICES.ORDER_SERVICE}:${SERVICE_PORTS.ORDER_SERVICE}` },
    { path: '/api/products', target: `http://${SERVICES.PRODUCT_SERVICE}:${SERVICE_PORTS.PRODUCT_SERVICE}` },
  ];

  getRoute(path: string) { return this.routes.find(r => path.startsWith(r.path)); }
  getAllRoutes() { return this.routes; }
}
