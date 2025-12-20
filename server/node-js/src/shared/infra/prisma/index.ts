import { PrismaClient } from '@prisma/client'
import dotenv from 'dotenv'

// CRITICAL: Load environment variables BEFORE any other imports
// This prevents PrismaSingleton from being initialized with wrong DATABASE_URL

// Ensure NODE_ENV is set for production environments
if (!process.env.NODE_ENV || process.env.NODE_ENV === '') {
  process.env.NODE_ENV = 'production'
}

// TEMPORARY: Hardcode production DATABASE_URL to fix the issue
if (process.env.NODE_ENV === 'production') {
  process.env.DATABASE_URL = 'postgresql://postgres.vkzmliesmrphzxcfzinn:%40House1991%24%23@aws-0-us-west-2.pooler.supabase.com:6543/postgres?pgbouncer=true'
  process.env.DIRECT_URL = 'postgresql://postgres.vkzmliesmrphzxcfzinn:%40House1991%24%23@aws-0-us-west-2.pooler.supabase.com:5432/postgres'
} else {
  // For tests, load .env.testing
  dotenv.config({ path: '.env.testing' })
}

// Ensure correct DATABASE_URL for each environment
if (process.env.NODE_ENV === 'test') {
  // Tests should use SQLite URL from .env.testing
  if (!process.env.DATABASE_URL?.startsWith('file:')) {
    console.error(
      '❌ ERROR: Test environment should use SQLite DATABASE_URL starting with "file:"',
    )
  }
} else {
  // Non-test environments should NOT use SQLite
  if (process.env.DATABASE_URL?.startsWith('file:')) {
    console.error(
      '❌ ERROR: Non-test environment should NOT use SQLite DATABASE_URL',
    )
    process.exit(1) // Exit to prevent running with wrong database
  }
}

class PrismaSingleton {
  private static instance: PrismaClient | null = null
  private static lastDatabaseUrl: string
  private static lastNodeEnv: string

  private constructor() {
    // Prevent direct constructor calls with the `new` operator.
  }

  public static getInstance(): PrismaClient {
    const currentDatabaseUrl = process.env.DATABASE_URL
    const currentNodeEnv = process.env.NODE_ENV || 'development'

    // If DATABASE_URL or NODE_ENV changed, or no instance exists, create a new one
    if (
      !PrismaSingleton.instance ||
      PrismaSingleton.lastDatabaseUrl !== currentDatabaseUrl ||
      PrismaSingleton.lastNodeEnv !== currentNodeEnv
    ) {
      if (PrismaSingleton.instance) {
        PrismaSingleton.instance.$disconnect()
      }
      PrismaSingleton.instance = new PrismaClient()
      PrismaSingleton.lastDatabaseUrl = currentDatabaseUrl || ''
      PrismaSingleton.lastNodeEnv = currentNodeEnv
    }

    return PrismaSingleton.instance
  }

  public static async closeConnection(): Promise<void> {
    if (PrismaSingleton.instance) {
      await PrismaSingleton.instance.$disconnect()
      PrismaSingleton.instance = null
    }
  }
}

process.on('beforeExit', async () => {
  await PrismaSingleton.closeConnection()
})

process.on('SIGINT', async () => {
  await PrismaSingleton.closeConnection()
  process.exit()
})

process.on('SIGTERM', async () => {
  await PrismaSingleton.closeConnection()
  process.exit()
})

export { PrismaSingleton }
