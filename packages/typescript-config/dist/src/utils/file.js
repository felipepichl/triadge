"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteFile = void 0;
const fs_1 = __importDefault(require("fs"));
const deleteFile = async (filename) => {
    try {
        await fs_1.default.promises.stat(filename);
    }
    catch (_a) {
        return;
    }
    await fs_1.default.promises.unlink(filename);
};
exports.deleteFile = deleteFile;
//# sourceMappingURL=file.js.map