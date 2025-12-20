import { PrismaClient } from '@prisma/client'
import dotenv from 'dotenv'

dotenv.config({
  path: process.env.NODE_ENV === 'test' ? '.env.testing' : '.env',
})

class PrismaSingleton {
  private static instance: PrismaClient | null = null
  private static lastDatabaseUrl: string

  private constructor() {
    // Prevent direct constructor calls with the `new` operator.
  }

  public static getInstance(): PrismaClient {
    const currentDatabaseUrl = process.env.DATABASE_URL

    // If DATABASE_URL changed or no instance exists, create a new one
    if (
      !PrismaSingleton.instance ||
      PrismaSingleton.lastDatabaseUrl !== currentDatabaseUrl
    ) {
      if (PrismaSingleton.instance) {
        PrismaSingleton.instance.$disconnect()
      }
      PrismaSingleton.instance = new PrismaClient()
      PrismaSingleton.lastDatabaseUrl = currentDatabaseUrl || ''
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
