FROM node:20-slim AS base

RUN corepack enable && corepack prepare pnpm@10.28.1 --activate
RUN apt-get update && apt-get install -y openssl && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Copy workspace root files
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml turbo.json ./

# Copy package configs
COPY packages/typescript-config ./packages/typescript-config
COPY packages/eslint-config ./packages/eslint-config

# Copy API source
COPY apps/api ./apps/api

# Install dependencies
RUN pnpm install --frozen-lockfile

# Generate Prisma client and build
RUN pnpm --filter @umabel/api db:generate
RUN pnpm --filter @umabel/api build

EXPOSE 3331

CMD ["node", "apps/api/dist/shared/infra/http/start/server.js"]
