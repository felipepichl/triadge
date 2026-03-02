"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HashProviderInMemory = void 0;
class HashProviderInMemory {
    async generateHash(payload) {
        return payload;
    }
    async compareHash(payload, hashed) {
        return payload === hashed;
    }
}
exports.HashProviderInMemory = HashProviderInMemory;
//# sourceMappingURL=HashProviderInMemory.js.map