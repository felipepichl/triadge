#!/bin/bash

echo "🔧 Fixing corrupted dependencies..."

# Remove corrupted node_modules
echo "🗑️  Removing corrupted node_modules..."
rm -rf node_modules package-lock.json

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Generate Prisma client
echo "🗃️  Generating Prisma client..."
npx prisma generate --schema=./src/shared/infra/prisma/schema.prisma

# Run tests to verify
echo "🧪 Running tests..."
npm run test:e2e -- --testNamePattern="should be to create a new account payable" --maxWorkers=1

echo "✅ Dependencies fixed! Try running your application now."