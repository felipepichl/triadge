"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersTokensRepository = void 0;
const prisma_1 = require("@shared/infra/prisma");
const UserTokensMappers_1 = require("../mappers/UserTokensMappers");
class UsersTokensRepository {
    async create({ id, userId, expiresDate, refreshToken, }) {
        const data = {
            userId,
            expiresDate,
            refreshToken,
        };
        const result = await prisma_1.PrismaSingleton.getInstance().userTokens.upsert({
            where: { id: id.toString() },
            create: data,
            update: data,
        });
        return UserTokensMappers_1.UserTokensMappers.getMapper().toDomain(result);
    }
    async findByUserIdAndRefreshToken(userId, refreshToken) {
        const result = await prisma_1.PrismaSingleton.getInstance().userTokens.findFirst({
            where: { userId, refreshToken },
        });
        return UserTokensMappers_1.UserTokensMappers.getMapper().toDomain(result);
    }
    async deleteById(id) {
        await prisma_1.PrismaSingleton.getInstance().userTokens.delete({
            where: { id },
        });
    }
}
exports.UsersTokensRepository = UsersTokensRepository;
//# sourceMappingURL=UsersTokensRepository.js.map