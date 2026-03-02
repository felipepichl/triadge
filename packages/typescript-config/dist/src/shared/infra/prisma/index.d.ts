import { PrismaClient } from '@prisma/client';
declare class PrismaSingleton {
    private static instance;
    private static lastDatabaseUrl;
    private static lastNodeEnv;
    private constructor();
    static getInstance(): PrismaClient;
    static closeConnection(): Promise<void>;
}
export { PrismaSingleton };
//# sourceMappingURL=index.d.ts.map