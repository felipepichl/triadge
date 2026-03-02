"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JWTTokenProvider = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
class JWTTokenProvider {
    encodeToken(payload, secret, expiresIn) {
        return (0, jsonwebtoken_1.sign)(payload, secret, {
            expiresIn: expiresIn,
        });
    }
    decodeToken(token, secret) {
        return (0, jsonwebtoken_1.verify)(token, secret);
    }
}
exports.JWTTokenProvider = JWTTokenProvider;
//# sourceMappingURL=JWTTokenProvider.js.map