"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ensureRefreshToken = ensureRefreshToken;
const AppError_1 = require("@shared/error/AppError");
const UsersTokensRepository_1 = require("../../prisma/repositories/UsersTokensRepository");
async function ensureRefreshToken(request, response, next) {
    const refreshToken = request.cookies.refreshToken;
    if (!refreshToken) {
        throw new AppError_1.AppError('RefreshToken missing', 401);
    }
    const { id: userId } = request.user;
    const userTokensRepository = new UsersTokensRepository_1.UsersTokensRepository();
    const userToken = await userTokensRepository.findByUserIdAndRefreshToken(userId, refreshToken);
    if (!userToken) {
        throw new AppError_1.AppError('RefreshToken does not exists', 401);
    }
    next();
}
//# sourceMappingURL=ensureRefreshToken.js.map