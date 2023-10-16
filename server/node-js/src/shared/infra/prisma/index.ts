import { PrismaClient } from '@prisma/client'
import dotenv from 'dotenv'

dotenv.config({
  path: process.env.NODE_ENV === 'test' ? '.env.test' : '.env',
})

class PrismaSingleton {
  private static instance: PrismaClient

  private constructor() {
    // Prevent direct constructor calls with the `new` operator.
  }

  public static getInstance(): PrismaClient {
    if (!PrismaSingleton.instance) {
      PrismaSingleton.instance = new PrismaClient()
    }

    return PrismaSingleton.instance
  }

  public static async closeConnection(): Promise<void> {
    if (PrismaSingleton.instance) {
      await PrismaSingleton.instance.$disconnect()
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
