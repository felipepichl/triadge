"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_child_process_1 = require("node:child_process");
const node_crypto_1 = __importDefault(require("node:crypto"));
const node_util_1 = __importDefault(require("node:util"));
const dotenv_1 = __importDefault(require("dotenv"));
const fs_1 = __importDefault(require("fs"));
const jest_environment_node_1 = __importDefault(require("jest-environment-node"));
const path_1 = __importDefault(require("path"));
dotenv_1.default.config({ path: '.env.testing' });
const execSync = node_util_1.default.promisify(node_child_process_1.exec);
const prismaBinary = './node_modules/.bin/prisma';
class PrismaTestEnvironment extends jest_environment_node_1.default {
    constructor(config, _context) {
        super(config, _context);
        this.schema = `test_${node_crypto_1.default.randomUUID()}.db`;
        this.connectionString = `file:./${this.schema}`;
        this.prismaLocation =
            '--schema=./src/shared/infra/prisma/schema.test.prisma';
    }
    async setup() {
        process.env.DATABASE_URL = this.connectionString;
        this.global.process.env.DATABASE_URL = this.connectionString;
        const { PrismaSingleton } = await Promise.resolve().then(() => __importStar(require('./index')));
        await PrismaSingleton.closeConnection();
        await execSync(`${prismaBinary} db push ${this.prismaLocation} --accept-data-loss`);
        return super.setup();
    }
    async teardown() {
        try {
            const { PrismaSingleton } = await Promise.resolve().then(() => __importStar(require('./index')));
            await PrismaSingleton.closeConnection();
            await new Promise((resolve) => setTimeout(resolve, 100));
            const dbPath = path_1.default.join(__dirname, '..', 'prisma', this.schema);
            const journalPath = `${dbPath}-journal`;
            const removeFile = (filePath) => {
                if (fs_1.default.existsSync(filePath)) {
                    try {
                        fs_1.default.unlinkSync(filePath);
                    }
                    catch (err) {
                        try {
                            fs_1.default.truncateSync(filePath, 0);
                        }
                        catch (truncateErr) {
                            console.warn(`Warning: Failed to cleanup ${filePath}:`, err);
                        }
                    }
                }
            };
            removeFile(dbPath);
            removeFile(journalPath);
        }
        catch (error) {
            console.warn(`Warning: Failed to cleanup test database ${this.schema}:`, error);
        }
        return super.teardown();
    }
}
exports.default = PrismaTestEnvironment;
//# sourceMappingURL=prisma-test-environment.js.map