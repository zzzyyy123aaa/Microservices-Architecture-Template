FROM node:18-alpine AS builder
WORKDIR /app

# 复制 workspace 配置
COPY package.json pnpm-workspace.yaml ./
COPY shared/ ./shared/
COPY gateway/ ./gateway/

# 安装 pnpm 和依赖
RUN npm install -g pnpm
RUN pnpm install --filter gateway --filter @shared/types --filter @shared/constants --filter @shared/libs

# 构建
RUN cd gateway && pnpm build

# 生产阶段
FROM node:18-alpine
WORKDIR /app
COPY --from=builder /app/gateway/dist ./dist
COPY --from=builder /app/gateway/package.json ./
COPY --from=builder /app/gateway/node_modules ./node_modules
COPY --from=builder /app/shared ./shared
EXPOSE 8000
CMD ["node", "dist/main.js"]
