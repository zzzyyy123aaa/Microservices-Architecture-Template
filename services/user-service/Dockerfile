FROM node:18-alpine AS builder
RUN apk add --no-cache python3 make g++
WORKDIR /app

COPY services/user-service/package.json ./
RUN npm config set registry https://registry.npmmirror.com && npm install -g pnpm && pnpm install

COPY services/user-service/ ./
RUN pnpm build

FROM node:18-alpine
WORKDIR /app
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package.json ./
COPY --from=builder /app/node_modules ./node_modules
EXPOSE 8001
CMD ["node", "dist/main.js"]
