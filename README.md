# Microservices Architecture Template

基于 Node.js + NestJS + Vue 3 的企业级微服务架构模板

## 📋 项目概述

一个完整的微服务架构示例项目，涵盖前后端分离、服务治理、监控运维等企业级最佳实践。可作为微服务学习和项目脚手架使用。

## 🛠️ 技术栈

| 层级 | 技术方案 |
|------|---------|
| **前端** | Vue 3 + Vite + Element Plus + Pinia |
| **网关** | NestJS + JWT + Rate Limiting |
| **后端** | NestJS + TypeScript + TypeORM |
| **数据库** | PostgreSQL |
| **缓存** | Redis |
| **消息队列** | RabbitMQ |
| **服务注册** | Consul |
| **监控** | Prometheus + Grafana |
| **容器化** | Docker + Docker Compose |

## 🏗️ 项目结构

```
├── frontend/                  # Vue 3 前端应用
│   ├── src/
│   │   ├── api/              # API 调用封装
│   │   ├── layouts/          # 布局组件
│   │   ├── router/           # 路由配置
│   │   ├── stores/           # Pinia 状态管理
│   │   └── views/            # 页面视图
│   ├── Dockerfile
│   └── nginx.conf
│
├── gateway/                   # API 网关服务
│   └── src/
│       ├── auth/             # JWT 认证模块
│       ├── health/           # 健康检查
│       ├── metrics/          # Prometheus 指标
│       ├── middleware/       # 中间件（限流、日志）
│       └── proxy/            # 路由代理
│
├── services/
│   ├── user-service/         # 用户服务
│   │   └── src/users/        # 用户 CRUD、JWT 认证
│   ├── order-service/        # 订单服务
│   │   └── src/orders/       # 订单管理、状态流转
│   └── product-service/      # 产品服务
│       └── src/products/     # 产品目录、库存管理
│
├── shared/                   # 共享库
│   ├── types/                # TypeScript 类型定义
│   ├── constants/            # 常量定义
│   └── libs/                 # 工具函数
│
├── infrastructure/           # 基础设施配置
│   ├── registry/             # Consul 配置
│   └── monitor/              # Prometheus + Grafana 配置
│
├── docker-compose.yml        # Docker 编排配置
└── package.json              # Monorepo 根配置
```

## 🚀 快速开始

### 前置要求

- Node.js >= 18.0.0
- pnpm >= 8.0.0
- Docker >= 20.10.0
- Docker Compose >= 2.0.0

### 方式一：Docker Compose 一键部署（推荐）

```bash
# 克隆项目
git clone https://github.com/zzzyyy123aaa/Microservices-Architecture-Template.git
cd Microservices-Architecture-Template

# 复制环境配置
cp .env.example .env

# 启动所有服务
docker-compose up -d

# 查看服务状态
docker-compose ps
```

### 方式二：本地开发

```bash
# 安装依赖
pnpm install

# 启动基础设施
docker-compose up -d postgres redis consul

# 启动后端服务（分别在不同终端）
pnpm dev:gateway    # 网关 - http://localhost:8000
pnpm dev:user       # 用户服务 - http://localhost:8001
pnpm dev:order      # 订单服务 - http://localhost:8002
pnpm dev:product    # 产品服务 - http://localhost:8003

# 启动前端
pnpm dev:frontend   # 前端 - http://localhost:3000
```

## 📊 服务访问地址

| 服务 | 地址 | 说明 |
|------|------|------|
| 前端应用 | http://localhost:3000 | Vue 3 管理后台 |
| API 网关 | http://localhost:8000 | 统一入口 |
| Swagger 文档 | http://localhost:8000/api/docs | API 文档 |
| Consul UI | http://localhost:8500 | 服务注册中心 |
| Grafana | http://localhost:3001 | 监控仪表盘 (admin/admin) |
| Prometheus | http://localhost:9090 | 指标采集 |
| RabbitMQ | http://localhost:15672 | 消息队列管理 (guest/guest) |

## 📚 API 文档

### 用户服务 `/users`

| 方法 | 路径 | 说明 |
|------|------|------|
| POST | `/users/register` | 用户注册 |
| POST | `/users/login` | 用户登录 |
| GET | `/users` | 获取用户列表 |
| GET | `/users/:id` | 获取用户详情 |
| PUT | `/users/:id` | 更新用户 |
| DELETE | `/users/:id` | 删除用户 |

### 订单服务 `/orders`

| 方法 | 路径 | 说明 |
|------|------|------|
| POST | `/orders` | 创建订单 |
| GET | `/orders` | 获取订单列表 |
| GET | `/orders/:id` | 获取订单详情 |
| GET | `/orders/user/:userId` | 获取用户订单 |
| PUT | `/orders/:id` | 更新订单 |
| PATCH | `/orders/:id/cancel` | 取消订单 |

### 产品服务 `/products`

| 方法 | 路径 | 说明 |
|------|------|------|
| POST | `/products` | 创建产品 |
| GET | `/products` | 获取产品列表 |
| GET | `/products/:id` | 获取产品详情 |
| GET | `/products/categories` | 获取分类列表 |
| GET | `/products/search?keyword=` | 搜索产品 |
| PUT | `/products/:id` | 更新产品 |
| PATCH | `/products/:id/stock` | 更新库存 |
| DELETE | `/products/:id` | 删除产品（软删除） |

## 🔧 环境变量

| 变量名 | 说明 | 默认值 |
|--------|------|--------|
| `NODE_ENV` | 运行环境 | `development` |
| `JWT_SECRET` | JWT 密钥 | `your-secret-key` |
| `DB_HOST` | 数据库主机 | `localhost` |
| `DB_PORT` | 数据库端口 | `5432` |
| `DB_USERNAME` | 数据库用户名 | `postgres` |
| `DB_PASSWORD` | 数据库密码 | `postgres` |
| `REDIS_HOST` | Redis 主机 | `localhost` |
| `REDIS_PORT` | Redis 端口 | `6379` |

## 🐳 Docker 服务

| 服务 | 端口 | 说明 |
|------|------|------|
| PostgreSQL | 5432 | 关系型数据库 |
| Redis | 6379 | 缓存服务 |
| Consul | 8500 | 服务注册中心 |
| Prometheus | 9090 | 指标监控 |
| Grafana | 3001 | 可视化仪表盘 |
| RabbitMQ | 5672/15672 | 消息队列 |
| Gateway | 8000 | API 网关 |
| User Service | 8001 | 用户服务 |
| Order Service | 8002 | 订单服务 |
| Product Service | 8003 | 产品服务 |
| Frontend | 3000 | 前端应用 |

## 📦 核心功能

### 用户服务
- 用户注册/登录
- JWT Token 认证
- 角色权限管理 (RBAC)
- 用户 CRUD 操作

### 订单服务
- 订单创建与管理
- 订单状态流转（待支付 → 已支付 → 已发货 → 已送达）
- 订单取消（仅待支付状态）
- 按用户/状态查询

### 产品服务
- 产品 CRUD 操作
- 分类管理
- 库存管理
- 关键词搜索
- 软删除

### API 网关
- 统一入口路由
- JWT 认证验证
- 请求限流保护
- 请求日志记录
- Prometheus 指标采集

## 🛡️ 安全特性

- JWT Token 认证
- 密码 bcrypt 加密
- API 限流保护
- CORS 跨域配置
- Helmet 安全头

## 📈 监控指标

- HTTP 请求总数
- 请求延迟分布 (P95/P99)
- 内存使用情况
- CPU 使用率
- 服务健康状态

## 🤝 贡献指南

1. Fork 本项目
2. 创建功能分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 创建 Pull Request

## 📄 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情

## 🔗 相关链接

- [NestJS 文档](https://nestjs.com/)
- [Vue 3 文档](https://vuejs.org/)
- [Element Plus](https://element-plus.org/)
- [TypeORM](https://typeorm.io/)
- [Docker](https://www.docker.com/)
