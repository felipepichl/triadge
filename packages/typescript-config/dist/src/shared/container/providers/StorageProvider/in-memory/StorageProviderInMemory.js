"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StorageProviderInMemory = void 0;
class StorageProviderInMemory {
    constructor() {
        this.storage = [];
    }
    async saveFile(file, folder) {
        const path = {
            file,
            folder,
        };
        this.storage.push(path);
        return path.file;
    }
    async deleteFile(file, folder) {
        const findIndex = this.storage.findIndex((path) => path.file === folder && path.folder === folder);
        this.storage.splice(findIndex, 1);
    }
}
exports.StorageProviderInMemory = StorageProviderInMemory;
//# sourceMappingURL=StorageProviderInMemory.js.map