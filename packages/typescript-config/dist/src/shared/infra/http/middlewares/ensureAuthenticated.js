"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ensureAuthenticated = ensureAuthenticated;
const auth_1 = require("@config/auth");
const AppError_1 = require("@shared/error/AppError");
const jsonwebtoken_1 = require("jsonwebtoken");
async function ensureAuthenticated(request, response, next) {
    const authHeader = request.headers.authorization;
    if (!authHeader) {
        throw new AppError_1.AppError('Token missing', 401);
    }
    const [, token] = authHeader.split(' ');
    const { secretToken } = auth_1.authConfig;
    try {
        const decoded = (0, jsonwebtoken_1.verify)(token, secretToken);
        const { sub: userId, email } = decoded;
        request.user = {
            id: userId,
            email,
        };
        return next();
    }
    catch (_a) {
        throw new AppError_1.AppError('Invalid JWT token', 401);
    }
}
//# sourceMappingURL=ensureAuthenticated.js.map