"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BCryptHashProvider = void 0;
const bcrypt_1 = require("bcrypt");
class BCryptHashProvider {
    async generateHash(payload) {
        return (0, bcrypt_1.hash)(payload, 8);
    }
    async compareHash(payload, hashed) {
        return (0, bcrypt_1.compare)(payload, hashed);
    }
}
exports.BCryptHashProvider = BCryptHashProvider;
//# sourceMappingURL=BCryptHashProvider.js.map