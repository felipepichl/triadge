import type { EnvironmentContext, JestEnvironmentConfig } from '@jest/environment';
import NodeEnvironment from 'jest-environment-node';
export default class PrismaTestEnvironment extends NodeEnvironment {
    private schema;
    private connectionString;
    private prismaLocation;
    constructor(config: JestEnvironmentConfig, _context?: EnvironmentContext);
    setup(): Promise<void>;
    teardown(): Promise<void>;
}
//# sourceMappingURL=prisma-test-environment.d.ts.map