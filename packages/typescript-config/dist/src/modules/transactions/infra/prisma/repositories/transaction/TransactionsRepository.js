"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionsRepository = void 0;
const prisma_1 = require("@shared/infra/prisma");
const date_fns_1 = require("date-fns");
const TransactionMappers_1 = require("../../mappers/transaction/TransactionMappers");
class TransactionsRepository {
    async create({ id, description, detail, type, date, amount, userId, financialCategoryId, subcategoryId, }) {
        const data = {
            description,
            detail,
            date,
            type,
            amount,
            userId,
            financialCategoryId,
            subcategoryId: subcategoryId || null,
        };
        await prisma_1.PrismaSingleton.getInstance().transaction.upsert({
            where: { id: id.toString() },
            create: data,
            update: data,
        });
    }
    async listAll() {
        const result = await prisma_1.PrismaSingleton.getInstance().transaction.findMany();
        return TransactionMappers_1.TransactionMappers.getMapper().toDomainArray(result);
    }
    async listByMonth(userId, month) {
        const year = new Date().getFullYear();
        const startDate = new Date(year, month - 1, 1);
        const endDate = new Date(year, month, 0);
        const result = await prisma_1.PrismaSingleton.getInstance().transaction.findMany({
            where: {
                userId,
                AND: [{ date: { gte: startDate } }, { date: { lte: endDate } }],
            },
            orderBy: { date: 'asc' },
        });
        return TransactionMappers_1.TransactionMappers.getMapper().toDomainArray(result);
    }
    async listByDateRange(userId, startDate, endDate) {
        const normalizedStartDate = (0, date_fns_1.startOfDay)(startDate);
        const normalizedEndDate = (0, date_fns_1.endOfDay)(endDate);
        const result = await prisma_1.PrismaSingleton.getInstance().transaction.findMany({
            where: {
                userId,
                date: { gte: normalizedStartDate, lte: normalizedEndDate },
            },
            include: { financialCategory: true },
            orderBy: { date: 'asc' },
        });
        return TransactionMappers_1.TransactionMappers.getMapper().toDomainArray(result);
    }
    async listByType(userId, type) {
        const result = await prisma_1.PrismaSingleton.getInstance().transaction.findMany({
            where: {
                userId,
                type: type.type,
            },
            include: { financialCategory: true },
            orderBy: { date: 'asc' },
        });
        return TransactionMappers_1.TransactionMappers.getMapper().toDomainArray(result);
    }
    async listByUser(userId) {
        const result = await prisma_1.PrismaSingleton.getInstance().transaction.findMany({
            where: { userId },
            include: { financialCategory: true },
        });
        return TransactionMappers_1.TransactionMappers.getMapper().toDomainArray(result);
    }
    async listByCategoryAndTypeAndMonth(financialCategoryId, type, month) {
        throw new Error('Method not implemented.');
    }
    async findById(id) {
        const result = await prisma_1.PrismaSingleton.getInstance().transaction.findFirst({
            where: { id },
        });
        return TransactionMappers_1.TransactionMappers.getMapper().toDomain(result);
    }
    async findByDescription(description) {
        const result = await prisma_1.PrismaSingleton.getInstance().transaction.findFirst({
            where: { description },
        });
        return TransactionMappers_1.TransactionMappers.getMapper().toDomain(result);
    }
    async findByDate(date) {
        const result = await prisma_1.PrismaSingleton.getInstance().transaction.findFirst({
            where: { date },
        });
        return TransactionMappers_1.TransactionMappers.getMapper().toDomain(result);
    }
}
exports.TransactionsRepository = TransactionsRepository;
//# sourceMappingURL=TransactionsRepository.js.map