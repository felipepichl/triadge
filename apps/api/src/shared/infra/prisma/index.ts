import { PrismaClient } from '@prisma/client'
import dotenv from 'dotenv'

dotenv.config({ path: '.env' })

if (process.env.NODE_ENV === 'test') {
  dotenv.config({ path: '.env.testing' })
}

class PrismaSingleton {
  private static instance: PrismaClient | null = null
  private static lastDatabaseUrl: string

  private constructor() {}

  public static getInstance(): PrismaClient {
    const currentDatabaseUrl = process.env.DATABASE_URL

    if (
      !PrismaSingleton.instance ||
      PrismaSingleton.lastDatabaseUrl !== currentDatabaseUrl
    ) {
      if (PrismaSingleton.instance) {
        PrismaSingleton.instance.$disconnect().catch(() => {})
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

export { PrismaSingleton }
