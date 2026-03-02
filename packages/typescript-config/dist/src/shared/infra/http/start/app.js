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
exports.app = void 0;
require("express-async-errors");
const AppError_1 = require("@shared/error/AppError");
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swegger_json_1 = __importDefault(require("../../../../../swegger.json"));
const routes_1 = require("../routes");
dotenv_1.default.config({ path: '.env' });
const app = (0, express_1.default)();
exports.app = app;
app.get('/health', (req, res) => {
    res.json({
        status: 'ok',
        timestamp: new Date().toISOString(),
        environment: process.env.NODE_ENV || 'development',
    });
});
try {
    Promise.resolve().then(() => __importStar(require('@shared/container')));
}
catch (error) {
    console.error('❌ Failed to load container:', error);
    process.exit(1);
}
const allowedOrigins = [
    'http://localhost:3577',
    'http://localhost:8081',
    'http://localhost:3000',
    'http://192.168.1.1:8081',
    'http://192.168.1.100:8081',
    'http://10.0.2.2:8081',
    'exp://192.168.1.1:8081',
    'exp://192.168.1.100:8081',
    'exp://10.0.2.2:8081',
];
const corsOptions = {
    origin: function (origin, callback) {
        if (!origin)
            return callback(null, true);
        if (origin.startsWith('http://localhost:') ||
            origin.startsWith('http://127.0.0.1:') ||
            origin.startsWith('exp://')) {
            return callback(null, true);
        }
        if (origin.includes('.exp.direct') ||
            origin.includes('.expo.dev') ||
            origin.includes('.expo.io') ||
            origin.includes('expo-development.app') ||
            origin.match(/^https:\/\/[a-z0-9-]+\.exp\.direct/) ||
            origin.match(/^https:\/\/[a-z0-9-]+\.expo\.dev/) ||
            origin.match(/^https:\/\/[a-z0-9-]+\.expo\.io/)) {
            return callback(null, true);
        }
        if (allowedOrigins.includes(origin)) {
            return callback(null, true);
        }
        if (process.env.NODE_ENV === 'development') {
            return callback(null, true);
        }
        return callback(new Error('Not allowed by CORS'));
    },
    credentials: true,
};
app.use((0, cors_1.default)(corsOptions));
app.use(express_1.default.json());
app.use('/api-docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swegger_json_1.default));
app.use(routes_1.routes);
app.use((err, request, response, _next) => {
    if (err instanceof AppError_1.AppError) {
        return response.status(err.statusCode).json({ message: err.message });
    }
    console.log('AppError => ', err.message);
    return response.status(500).json({
        message: `Internal server error ${err.message}`,
    });
});
//# sourceMappingURL=app.js.map