"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DiskStorageProvider = void 0;
const upload_1 = require("@config/upload");
const fs_1 = __importDefault(require("fs"));
const path_1 = require("path");
class DiskStorageProvider {
    async saveFile(file, folder) {
        await fs_1.default.promises.rename((0, path_1.resolve)(upload_1.uploadConfig.tempFolder, file), (0, path_1.resolve)(`${upload_1.uploadConfig.tempFolder}/${folder}`, file));
        return file;
    }
    async deleteFile(file, folder) {
        const filePath = (0, path_1.resolve)(`${upload_1.uploadConfig.tempFolder}/${folder}`, file);
        try {
            await fs_1.default.promises.stat(filePath);
        }
        catch (_a) {
            return;
        }
        await fs_1.default.promises.unlink(filePath);
    }
}
exports.DiskStorageProvider = DiskStorageProvider;
//# sourceMappingURL=DiskStorageProvider.js.map