# Microservices Project

基于 Node.js + NestJS + Vue 3 的微服务架构项目

## 技术栈

| 组件 | 技术 |
|------|------|
| 前端 | Vue 3 + Vite + Element Plus |
| 后端 | NestJS + TypeScript + TypeORM |
| 数据库 | PostgreSQL |
| 缓存 | Redis |
| 服务注册 | Consul |
| 监控 | Prometheus + Grafana |
| 容器化 | Docker + Docker Compose |

## 项目结构

```
test/
├── frontend/          # Vue 3 前端
├── gateway/           # API 网关
├── services/
│   ├── user-service/  # 用户服务
│   ├── order-service/ # 订单服务
│   └── product-service/ # 产品服务
├── shared/            # 共享库
├── infrastructure/    # 基础设施配置
└── docker-compose.yml
```

## 快速启动

```bash
# Docker Compose 一键启动
docker-compose up -d

# 访问
# 前端: http://localhost:3000
# API网关: http://localhost:8000
# Consul: http://localhost:8500
# Grafana: http://localhost:3001
```

## API 端点

- **用户服务** `/users/*` - 注册、登录、CRUD
- **订单服务** `/orders/*` - 订单管理
- **产品服务** `/products/*` - 产品管理
