FROM node:18-alpine AS builder
WORKDIR /app

COPY services/order-service/package.json ./
RUN npm config set registry https://registry.npmmirror.com && npm install -g pnpm && pnpm install

COPY services/order-service/ ./
RUN pnpm build

FROM node:18-alpine
WORKDIR /app
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package.json ./
COPY --from=builder /app/node_modules ./node_modules
EXPOSE 8002
CMD ["node", "dist/main.js"]
