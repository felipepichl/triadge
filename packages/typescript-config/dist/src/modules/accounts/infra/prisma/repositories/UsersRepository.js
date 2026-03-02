"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersRepository = void 0;
const prisma_1 = require("@shared/infra/prisma");
const UserMappers_1 = require("../mappers/UserMappers");
class UsersRepository {
    async create({ id, name, email, password, phoneNumber, avatar, }) {
        const data = {
            name,
            email,
            password,
            phoneNumber,
            avatar,
        };
        await prisma_1.PrismaSingleton.getInstance().user.upsert({
            where: { id: id.toString() },
            create: data,
            update: data,
        });
    }
    async findByEmail(email) {
        const result = await prisma_1.PrismaSingleton.getInstance().user.findFirst({
            where: { email },
        });
        if (!result) {
            return null;
        }
        return UserMappers_1.UserMappers.getMapper().toDomain(result);
    }
    async findByPhoneNumber(phoneNumber) {
        const result = await prisma_1.PrismaSingleton.getInstance().user.findFirst({
            where: { phoneNumber },
        });
        if (!result) {
            return null;
        }
        return UserMappers_1.UserMappers.getMapper().toDomain(result);
    }
    async findById(userId) {
        const result = await prisma_1.PrismaSingleton.getInstance().user.findFirst({
            where: { id: userId },
        });
        if (!result) {
            return null;
        }
        return UserMappers_1.UserMappers.getMapper().toDomain(result);
    }
    async findByIds(userIds) {
        const result = await prisma_1.PrismaSingleton.getInstance().user.findMany({
            where: {
                id: {
                    in: userIds,
                },
            },
        });
        return UserMappers_1.UserMappers.getMapper().toDomainArray(result);
    }
    async listAll() {
        const result = await prisma_1.PrismaSingleton.getInstance().user.findMany();
        return UserMappers_1.UserMappers.getMapper().toDomainArray(result);
    }
}
exports.UsersRepository = UsersRepository;
//# sourceMappingURL=UsersRepository.js.map