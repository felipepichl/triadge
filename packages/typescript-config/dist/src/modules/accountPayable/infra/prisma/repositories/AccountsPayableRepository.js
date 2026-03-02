"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccountsPayableRepository = void 0;
const prisma_1 = require("@shared/infra/prisma");
const date_fns_1 = require("date-fns");
const AccountPayableMappers_1 = require("../mappers/AccountPayableMappers");
function getMonthDateRange(month, year) {
    const monthDate = new Date(year, month - 1, 1);
    const startDate = (0, date_fns_1.startOfMonth)(monthDate);
    const endDate = (0, date_fns_1.endOfMonth)(monthDate);
    return { startDate, endDate };
}
class AccountsPayableRepository {
    async create({ id, description, amount, dueDate, paymentDate, isPaid, isFixed, userId, financialCategoryId, subcategoryId, }) {
        const data = {
            description,
            amount,
            dueDate,
            paymentDate,
            isPaid,
            isFixed,
            userId,
            financialCategoryId,
            subcategoryId: subcategoryId || null,
        };
        await prisma_1.PrismaSingleton.getInstance().accountPayable.upsert({
            where: { id: id.toString() },
            create: data,
            update: data,
        });
    }
    async createMany(accounts) {
        if (!accounts || accounts.length === 0) {
            return;
        }
        const data = accounts.map(({ description, amount, dueDate, paymentDate, isPaid, isFixed, userId, financialCategoryId, subcategoryId, }) => ({
            description,
            amount,
            dueDate,
            paymentDate,
            isPaid,
            isFixed,
            userId,
            financialCategoryId,
            subcategoryId: subcategoryId || null,
        }));
        await prisma_1.PrismaSingleton.getInstance().accountPayable.createMany({
            data,
            skipDuplicates: true,
        });
    }
    async update({ id, description, amount, dueDate, paymentDate, isPaid, isFixed, interestPaid, isInterestPaid, userId, financialCategoryId, subcategoryId, }) {
        await prisma_1.PrismaSingleton.getInstance().accountPayable.update({
            where: { id: id.toString() },
            data: {
                description,
                amount,
                dueDate,
                paymentDate,
                isPaid,
                isFixed,
                interestPaid,
                isInterestPaid,
                userId,
                financialCategoryId,
                subcategoryId,
            },
        });
    }
    async listAll(userId, page = 1, pageSize = 50) {
        const skip = (page - 1) * pageSize;
        const result = await prisma_1.PrismaSingleton.getInstance().accountPayable.findMany({
            where: { userId },
            select: {
                id: true,
                description: true,
                amount: true,
                dueDate: true,
                paymentDate: true,
                isPaid: true,
                isFixed: true,
                userId: true,
                financialCategoryId: true,
            },
            skip,
            take: pageSize,
            orderBy: { dueDate: 'desc' },
        });
        return AccountPayableMappers_1.AccountPayableMappers.getMapper().toDomainArray(result);
    }
    async listByDateRange(userId, startDate, endDate) {
        const normalizedStartDate = (0, date_fns_1.startOfDay)(startDate);
        const normalizedEndDate = (0, date_fns_1.endOfDay)(endDate);
        const result = await prisma_1.PrismaSingleton.getInstance().accountPayable.findMany({
            where: {
                userId,
                dueDate: { gte: normalizedStartDate, lte: normalizedEndDate },
            },
            select: {
                id: true,
                description: true,
                amount: true,
                dueDate: true,
                paymentDate: true,
                isPaid: true,
                isFixed: true,
                userId: true,
                financialCategoryId: true,
                subcategoryId: true,
                financialCategory: {
                    select: {
                        id: true,
                        description: true,
                    },
                },
                subcategory: {
                    select: {
                        id: true,
                        description: true,
                    },
                },
            },
        });
        return AccountPayableMappers_1.AccountPayableMappers.getMapper().toDomainArray(result);
    }
    async listAllFixedAccountsByMonth(userId, month) {
        const year = new Date().getFullYear();
        const { startDate, endDate } = getMonthDateRange(month, year);
        const result = await prisma_1.PrismaSingleton.getInstance().accountPayable.findMany({
            where: {
                userId,
                dueDate: { gte: startDate, lte: endDate },
                isFixed: true,
            },
            select: {
                id: true,
                description: true,
                amount: true,
                dueDate: true,
                paymentDate: true,
                isPaid: true,
                isFixed: true,
                userId: true,
                financialCategoryId: true,
                financialCategory: {
                    select: {
                        id: true,
                        description: true,
                    },
                },
            },
            orderBy: { dueDate: 'desc' },
        });
        return AccountPayableMappers_1.AccountPayableMappers.getMapper().toDomainArray(result);
    }
    async listAllUnfixedAccountsByMonth(userId, month) {
        const year = new Date().getFullYear();
        const { startDate, endDate } = getMonthDateRange(month, year);
        const result = await prisma_1.PrismaSingleton.getInstance().accountPayable.findMany({
            where: {
                userId,
                dueDate: { gte: startDate, lte: endDate },
                isFixed: false,
            },
            select: {
                id: true,
                description: true,
                amount: true,
                dueDate: true,
                paymentDate: true,
                isPaid: true,
                isFixed: true,
                userId: true,
                financialCategoryId: true,
                financialCategory: {
                    select: {
                        id: true,
                        description: true,
                    },
                },
            },
            orderBy: { dueDate: 'desc' },
        });
        return AccountPayableMappers_1.AccountPayableMappers.getMapper().toDomainArray(result);
    }
    async listAllUnpaidAccountsByMonth(userId, month) {
        const year = new Date().getFullYear();
        const { startDate, endDate } = getMonthDateRange(month, year);
        const result = await prisma_1.PrismaSingleton.getInstance().accountPayable.findMany({
            where: {
                userId,
                dueDate: { gte: startDate, lte: endDate },
                isPaid: false,
            },
            select: {
                id: true,
                description: true,
                amount: true,
                dueDate: true,
                paymentDate: true,
                isPaid: true,
                isFixed: true,
                userId: true,
                financialCategoryId: true,
                financialCategory: {
                    select: {
                        id: true,
                        description: true,
                    },
                },
            },
            orderBy: { dueDate: 'desc' },
        });
        return AccountPayableMappers_1.AccountPayableMappers.getMapper().toDomainArray(result);
    }
    async listAllPaidAccountsByMonth(userId, month) {
        const year = new Date().getFullYear();
        const { startDate, endDate } = getMonthDateRange(month, year);
        const result = await prisma_1.PrismaSingleton.getInstance().accountPayable.findMany({
            where: {
                userId,
                dueDate: { gte: startDate, lte: endDate },
                isPaid: true,
            },
            select: {
                id: true,
                description: true,
                amount: true,
                dueDate: true,
                paymentDate: true,
                isPaid: true,
                isFixed: true,
                userId: true,
                financialCategoryId: true,
                financialCategory: {
                    select: {
                        id: true,
                        description: true,
                    },
                },
            },
            orderBy: { dueDate: 'desc' },
        });
        return AccountPayableMappers_1.AccountPayableMappers.getMapper().toDomainArray(result);
    }
    async findById(accountPayableId) {
        const result = await prisma_1.PrismaSingleton.getInstance().accountPayable.findUnique({
            where: { id: accountPayableId },
        });
        return AccountPayableMappers_1.AccountPayableMappers.getMapper().toDomain(result);
    }
    async markAccountAsPaid(accountPayableId) {
        await prisma_1.PrismaSingleton.getInstance().accountPayable.update({
            where: { id: accountPayableId },
            data: { isPaid: true },
        });
    }
}
exports.AccountsPayableRepository = AccountsPayableRepository;
//# sourceMappingURL=AccountsPayableRepository.js.map