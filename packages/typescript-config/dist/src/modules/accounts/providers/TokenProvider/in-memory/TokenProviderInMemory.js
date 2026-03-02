"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenProviderInMemory = void 0;
class TokenProviderInMemory {
    encodeToken(payload, _secret, _expiresIn) {
        return `${Buffer.from(JSON.stringify(payload)).toString('base64')}`;
    }
    decodeToken(token, _secret) {
        try {
            const [encodedPayload] = token.split('-');
            const decodedPayload = JSON.parse(Buffer.from(encodedPayload, 'base64').toString('ascii'));
            return decodedPayload;
        }
        catch (_a) {
            return { email: '', sub: '' };
        }
    }
}
exports.TokenProviderInMemory = TokenProviderInMemory;
//# sourceMappingURL=TokenProviderInMemory.js.map