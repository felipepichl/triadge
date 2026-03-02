"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrismaSingleton = void 0;
const client_1 = require("@prisma/client");
const dotenv_1 = __importDefault(require("dotenv"));
try {
    dotenv_1.default.config({ path: '.env' });
}
catch (error) {
    console.warn('❌ Failed to load .env file:', error.message);
}
if (process.env.NODE_ENV === 'test') {
    try {
        dotenv_1.default.config({ path: '.env.testing' });
    }
    catch (error) {
        console.warn('❌ Failed to load .env.testing file:', error.message);
    }
}
if (process.env.NODE_ENV !== 'test' &&
    !((_a = process.env.DATABASE_URL) === null || _a === void 0 ? void 0 : _a.startsWith('postgresql://'))) {
    console.warn('⚠️  DATABASE_URL is not PostgreSQL in production, applying emergency fallback');
    process.env.DATABASE_URL =
        'postgresql://postgres.vkzmliesmrphzxcfzinn:%40House1991%24%23@aws-0-us-west-2.pooler.supabase.com:6543/postgres?pgbouncer=true';
    process.env.DIRECT_URL =
        'postgresql://postgres.vkzmliesmrphzxcfzinn:%40House1991%24%23@aws-0-us-west-2.pooler.supabase.com:5432/postgres';
}
class PrismaSingleton {
    constructor() {
    }
    static getInstance() {
        const currentDatabaseUrl = process.env.DATABASE_URL;
        const currentNodeEnv = process.env.NODE_ENV || 'development';
        if (!PrismaSingleton.instance ||
            PrismaSingleton.lastDatabaseUrl !== currentDatabaseUrl ||
            PrismaSingleton.lastNodeEnv !== currentNodeEnv) {
            if (PrismaSingleton.instance) {
                PrismaSingleton.instance.$disconnect().catch(() => { });
            }
            try {
                PrismaSingleton.instance = new client_1.PrismaClient();
                PrismaSingleton.lastDatabaseUrl = currentDatabaseUrl || '';
                PrismaSingleton.lastNodeEnv = currentNodeEnv;
            }
            catch (error) {
                console.error('Failed to create PrismaClient:', error);
                throw error;
            }
        }
        return PrismaSingleton.instance;
    }
    static async closeConnection() {
        if (PrismaSingleton.instance) {
            await PrismaSingleton.instance.$disconnect();
            PrismaSingleton.instance = null;
        }
    }
}
exports.PrismaSingleton = PrismaSingleton;
PrismaSingleton.instance = null;
process.on('beforeExit', async () => {
    await PrismaSingleton.closeConnection();
});
process.on('SIGINT', async () => {
    await PrismaSingleton.closeConnection();
    process.exit();
});
process.on('SIGTERM', async () => {
    await PrismaSingleton.closeConnection();
    process.exit();
});
//# sourceMappingURL=index.js.map