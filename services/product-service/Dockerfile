FROM node:18-alpine AS builder
WORKDIR /app

# 复制 workspace 配置
COPY package.json pnpm-workspace.yaml ./
COPY shared/ ./shared/
COPY services/product-service/ ./services/product-service/

# 安装 pnpm 和依赖
RUN npm install -g pnpm
RUN pnpm install --filter product-service --filter @shared/types --filter @shared/constants --filter @shared/libs

# 构建
RUN cd services/product-service && pnpm build

# 生产阶段
FROM node:18-alpine
WORKDIR /app
COPY --from=builder /app/services/product-service/dist ./dist
COPY --from=builder /app/services/product-service/package.json ./
COPY --from=builder /app/services/product-service/node_modules ./node_modules
COPY --from=builder /app/shared ./shared
EXPOSE 8003
CMD ["node", "dist/main.js"]
