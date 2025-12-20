import { PrismaClient } from '@prisma/client'
import dotenv from 'dotenv'

// Load environment variables based on NODE_ENV
const envPath = process.env.NODE_ENV === 'test' ? '.env.testing' : '.env'
try {
  dotenv.config({ path: envPath })
} catch (error) {
  console.warn('dotenv failed to load, using environment variables as-is')
}

// Fallback: Ensure production has correct DATABASE_URL if not loaded
if (process.env.NODE_ENV !== 'test' && (!process.env.DATABASE_URL || process.env.DATABASE_URL.startsWith('file:'))) {
  process.env.DATABASE_URL = 'postgresql://postgres.vkzmliesmrphzxcfzinn:%40House1991%24%23@aws-0-us-west-2.pooler.supabase.com:6543/postgres?pgbouncer=true'
  process.env.DIRECT_URL = 'postgresql://postgres.vkzmliesmrphzxcfzinn:%40House1991%24%23@aws-0-us-west-2.pooler.supabase.com:5432/postgres'
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
        PrismaSingleton.instance.$disconnect().catch(() => {}) // Ignore disconnect errors
      }
      try {
        PrismaSingleton.instance = new PrismaClient()
        PrismaSingleton.lastDatabaseUrl = currentDatabaseUrl || ''
        PrismaSingleton.lastNodeEnv = currentNodeEnv
      } catch (error) {
        console.error('Failed to create PrismaClient:', error)
        throw error
      }
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
