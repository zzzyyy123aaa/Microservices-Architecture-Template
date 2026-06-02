FROM node:18-alpine AS builder
WORKDIR /app

# 复制 workspace 配置
COPY package.json pnpm-workspace.yaml ./
COPY shared/ ./shared/
COPY services/order-service/ ./services/order-service/

# 安装 pnpm 和依赖
RUN npm install -g pnpm
RUN pnpm install --filter order-service --filter @shared/types --filter @shared/constants --filter @shared/libs

# 构建
RUN cd services/order-service && pnpm build

# 生产阶段
FROM node:18-alpine
WORKDIR /app
COPY --from=builder /app/services/order-service/dist ./dist
COPY --from=builder /app/services/order-service/package.json ./
COPY --from=builder /app/services/order-service/node_modules ./node_modules
COPY --from=builder /app/shared ./shared
EXPOSE 8002
CMD ["node", "dist/main.js"]
