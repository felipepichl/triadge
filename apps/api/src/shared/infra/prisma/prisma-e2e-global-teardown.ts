import { exec } from 'node:child_process'
import util from 'node:util'

const execAsync = util.promisify(exec)

export default async function globalTeardown() {
  await execAsync(
    './node_modules/.bin/prisma generate --schema=./src/shared/infra/prisma/schema.prisma',
  )
}
