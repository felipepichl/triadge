import jestConfig from './jest.config'

export default {
  ...jestConfig,
  testEnvironment: './src/shared/infra/prisma/prisma-test-environment.ts',
  globalTeardown: './src/shared/infra/prisma/prisma-e2e-global-teardown.ts',
  testRegex: '.e2e-spec.ts$',
}
