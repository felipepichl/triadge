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

import { PrismaSingleton } from './index'

dotenv.config({ path: '.env.testing' })

const execSync = util.promisify(exec)

const prismaBinary = './node_modules/.bin/prisma'

export default class PrismaTestEnvironment extends NodeEnvironment {
  private schema: string
  private connectionString: string
  private prismaLocation: string

  constructor(config: JestEnvironmentConfig, _context: EnvironmentContext) {
    super(config, _context)

    this.schema = `test_${crypto.randomUUID()}.db`
    this.connectionString = `file:./${this.schema}`
    this.prismaLocation = '--schema=./src/shared/infra/test/schema.test.prisma'
  }

  async setup() {
    process.env.DATABASE_URL = this.connectionString
    this.global.process.env.DATABASE_URL = this.connectionString

    await PrismaSingleton.closeConnection()

    await execSync(
      `${prismaBinary} db push ${this.prismaLocation} --accept-data-loss`,
    )

    return super.setup()
  }

  async teardown() {
    try {
      await PrismaSingleton.closeConnection()

      await new Promise((resolve) => setTimeout(resolve, 100))

      const dbPath = path.join(__dirname, '..', 'test', this.schema)
      const journalPath = `${dbPath}-journal`

      if (fs.existsSync(dbPath)) {
        fs.unlinkSync(dbPath)
      }

      if (fs.existsSync(journalPath)) {
        fs.unlinkSync(journalPath)
      }
    } catch (error) {
      console.warn(
        `Warning: Failed to cleanup test database ${this.schema}:`,
        error,
      )
    }

    return super.teardown()
  }
}
