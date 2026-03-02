"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authConfig = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config({ path: '.env' });
if (!process.env.SECRET_TOKEN) {
    throw new Error('SECRET_TOKEN environment variable is required');
}
if (!process.env.SECRET_REFRESH_TOKEN) {
    throw new Error('SECRET_REFRESH_TOKEN environment variable is required');
}
const authConfig = {
    secretToken: process.env.SECRET_TOKEN,
    expiresInToken: process.env.EXPIRES_IN_TOKEN || '15m',
    secretRefreshToken: process.env.SECRET_REFRESH_TOKEN,
    expiresInRefreshToken: process.env.EXPIRES_IN_REFRESH_TOKEN || '30d',
    expiresRefreshTokenDays: Number(process.env.EXPIRES_IN_REFRESH_TOKEN_DAYS) || 30,
};
exports.authConfig = authConfig;
//# sourceMappingURL=auth.js.map