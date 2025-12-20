import { exec } from 'node:child_process'
import crypto from 'node:crypto'
import util from 'node:util'

import type {
  EnvironmentContext,
  JestEnvironmentConfig,
} from '@jest/environment'
import dotenv from 'dotenv'
import fs from 'fs'
import NodeEnvironment from 'jest-environment-node'
import path from 'path'

dotenv.config({ path: '.env.testing' })

const execSync = util.promisify(exec)

const prismaBinary = './node_modules/.bin/prisma'

export default class PrismaTestEnvironment extends NodeEnvironment {
  private schema: string
  private connectionString: string
  private prismaLocation: string

  constructor(config: JestEnvironmentConfig, _context?: EnvironmentContext) {
    super(config, _context)

    this.schema = `test_${crypto.randomUUID()}.db`
    this.connectionString = `file:./${this.schema}`
    this.prismaLocation =
      '--schema=./src/shared/infra/prisma/schema.test.prisma'
  }

  async setup() {
    process.env.DATABASE_URL = this.connectionString
    this.global.process.env.DATABASE_URL = this.connectionString

    // Reset Prisma singleton to ensure it uses the new DATABASE_URL
    const { PrismaSingleton } = await import('./index')
    await PrismaSingleton.closeConnection()

    await execSync(
      `${prismaBinary} db push ${this.prismaLocation} --accept-data-loss`,
    )

    return super.setup()
  }

  async teardown() {
    try {
      // Disconnect Prisma client before removing database files
      const { PrismaSingleton } = await import('./index')
      await PrismaSingleton.closeConnection()

      // Small delay to ensure SQLite releases the file
      await new Promise((resolve) => setTimeout(resolve, 100))

      // Remove both .db and .db-journal files
      const dbPath = path.join(__dirname, '..', 'prisma', this.schema)
      const journalPath = `${dbPath}-journal`

      // Try to remove files immediately
      const removeFile = (filePath: string) => {
        if (fs.existsSync(filePath)) {
          try {
            fs.unlinkSync(filePath)
          } catch (err) {
            // If file is locked, truncate it to zero bytes instead
            try {
              fs.truncateSync(filePath, 0)
            } catch (truncateErr) {
              console.warn(`Warning: Failed to cleanup ${filePath}:`, err)
            }
          }
        }
      }

      removeFile(dbPath)
      removeFile(journalPath)
    } catch (error) {
      // Log error but don't fail the test teardown
      console.warn(
        `Warning: Failed to cleanup test database ${this.schema}:`,
        error,
      )
    }

    return super.teardown()
  }
}
