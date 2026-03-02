"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadConfig = void 0;
const crypto_1 = __importDefault(require("crypto"));
const multer_1 = __importDefault(require("multer"));
const path_1 = require("path");
const tempFolder = (0, path_1.resolve)(__dirname, '..', '..', 'temp');
const uploadConfig = {
    tempFolder,
    storage: multer_1.default.diskStorage({
        destination: tempFolder,
        filename: (request, file, callback) => {
            const fileHash = crypto_1.default.randomBytes(16).toString('hex');
            const filename = `${fileHash}-${file.originalname}`;
            return callback(null, filename);
        },
    }),
};
exports.uploadConfig = uploadConfig;
//# sourceMappingURL=upload.js.map