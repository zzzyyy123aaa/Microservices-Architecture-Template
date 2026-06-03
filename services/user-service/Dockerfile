FROM node:18-alpine AS builder
WORKDIR /app

COPY services/user-service/ ./
RUN npm config set registry https://registry.npmmirror.com && npm install -g pnpm && rm -rf node_modules pnpm-lock.yaml && pnpm install --no-frozen-lockfile

RUN pnpm build

FROM node:18-alpine
WORKDIR /app
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package.json ./
COPY --from=builder /app/node_modules ./node_modules
EXPOSE 8001
CMD ["node", "dist/main.js"]
