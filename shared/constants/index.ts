export const SERVICES = {
  GATEWAY: 'gateway',
  USER_SERVICE: 'user-service',
  ORDER_SERVICE: 'order-service',
  PRODUCT_SERVICE: 'product-service',
} as const;

export const SERVICE_PORTS = {
  GATEWAY: 8000,
  USER_SERVICE: 8001,
  ORDER_SERVICE: 8002,
  PRODUCT_SERVICE: 8003,
  FRONTEND: 3000,
} as const;

export const API_PATHS = {
  USERS: '/users',
  ORDERS: '/orders',
  PRODUCTS: '/products',
  HEALTH: '/health',
} as const;
