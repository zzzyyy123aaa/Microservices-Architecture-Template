FROM node:18-alpine AS builder
WORKDIR /app

# 复制 package.json
COPY frontend/package.json ./

# 安装依赖
RUN npm install -g pnpm && pnpm install

# 复制源代码并构建
COPY frontend/ ./
RUN pnpm build

# 生产阶段
FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY frontend/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
