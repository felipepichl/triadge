"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FinancialCategoriesRepository = void 0;
const AccountPayableMappers_1 = require("@modules/accountPayable/infra/prisma/mappers/AccountPayableMappers");
const TransactionMappers_1 = require("@modules/transactions/infra/prisma/mappers/transaction/TransactionMappers");
const prisma_1 = require("@shared/infra/prisma");
const FinancialCategoryMappers_1 = require("../mappers/FinancialCategoryMappers");
class FinancialCategoriesRepository {
    async create({ id, description, parentCategoryId, userId, }) {
        const data = {
            description,
            parentCategoryId: parentCategoryId || null,
            userId,
        };
        prisma_1.PrismaSingleton.getInstance().financialCategory.findMany({
            where: { userId },
        });
        await prisma_1.PrismaSingleton.getInstance().financialCategory.upsert({
            where: { id: id.toString() },
            create: data,
            update: data,
        });
    }
    async listAllCategoriesByUser(userId) {
        const result = await prisma_1.PrismaSingleton.getInstance().financialCategory.findMany({
            where: { parentCategoryId: null, userId },
        });
        return FinancialCategoryMappers_1.FinancialCategoryMappers.getMapper().toDomainArray(result);
    }
    async listSubcategoriesByCategoryId(userId, parentCategoryId) {
        const result = await prisma_1.PrismaSingleton.getInstance().financialCategory.findMany({
            where: { userId, parentCategoryId },
        });
        return FinancialCategoryMappers_1.FinancialCategoryMappers.getMapper().toDomainArray(result);
    }
    async listFinancialCategoriesWithTransactionsByType(userId, type, month) {
        const year = new Date().getFullYear();
        const financialCategoriesWithTransactions = await prisma_1.PrismaSingleton.getInstance().transaction.groupBy({
            by: ['financialCategoryId'],
            where: {
                userId,
                type: type.type,
                date: {
                    gte: new Date(year, month - 1, 1),
                    lt: new Date(year, month, 1),
                },
            },
            _count: {
                financialCategoryId: true,
            },
        });
        const categoryIds = financialCategoriesWithTransactions.map((transaction) => transaction.financialCategoryId);
        const financialCategories = await prisma_1.PrismaSingleton.getInstance().financialCategory.findMany({
            where: {
                id: {
                    in: categoryIds,
                },
            },
            include: {
                transactions: {
                    where: {
                        type: type.type,
                        date: {
                            gte: new Date(year, month - 1, 1),
                            lt: new Date(year, month, 1),
                        },
                    },
                },
            },
        });
        return financialCategories.map((category) => ({
            financialCategory: FinancialCategoryMappers_1.FinancialCategoryMappers.getMapper().toDomain(category),
            financialCategoryTransactions: TransactionMappers_1.TransactionMappers.getMapper().toDomainArray(category.transactions),
        }));
    }
    async listFinancialCategoriesWithFixedAccountsPayable(userId, month) {
        const year = new Date().getFullYear();
        const financialCategoriesWithAccountPayable = await prisma_1.PrismaSingleton.getInstance().accountPayable.groupBy({
            by: ['financialCategoryId'],
            where: {
                userId,
                isFixed: true,
                dueDate: {
                    gte: new Date(year, month - 1, 1),
                    lt: new Date(year, month, 1),
                },
            },
            _count: {
                financialCategoryId: true,
            },
        });
        const categoryIds = financialCategoriesWithAccountPayable.map((account) => account.financialCategoryId);
        const financialCategories = await prisma_1.PrismaSingleton.getInstance().financialCategory.findMany({
            where: {
                id: {
                    in: categoryIds,
                },
            },
            include: {
                accountsPayable: {
                    where: {
                        isFixed: true,
                        dueDate: {
                            gte: new Date(year, month - 1, 1),
                            lt: new Date(year, month, 1),
                        },
                    },
                },
            },
        });
        return financialCategories.map((category) => ({
            financialCategory: FinancialCategoryMappers_1.FinancialCategoryMappers.getMapper().toDomain(category),
            financialCategoryAccountsPayable: AccountPayableMappers_1.AccountPayableMappers.getMapper().toDomainArray(category.accountsPayable),
        }));
    }
    async listFinancialCategoriesWithUnfixedAccountsPayable(userId, month) {
        const year = new Date().getFullYear();
        const financialCategoriesWithAccountPayable = await prisma_1.PrismaSingleton.getInstance().accountPayable.groupBy({
            by: ['financialCategoryId'],
            where: {
                userId,
                isFixed: false,
                dueDate: {
                    gte: new Date(year, month - 1, 1),
                    lt: new Date(year, month, 1),
                },
            },
            _count: {
                financialCategoryId: true,
            },
        });
        const categoryIds = financialCategoriesWithAccountPayable.map((account) => account.financialCategoryId);
        const financialCategories = await prisma_1.PrismaSingleton.getInstance().financialCategory.findMany({
            where: {
                id: {
                    in: categoryIds,
                },
            },
            include: {
                accountsPayable: {
                    where: {
                        isFixed: false,
                        dueDate: {
                            gte: new Date(year, month - 1, 1),
                            lt: new Date(year, month, 1),
                        },
                    },
                },
            },
        });
        return financialCategories.map((category) => ({
            financialCategory: FinancialCategoryMappers_1.FinancialCategoryMappers.getMapper().toDomain(category),
            financialCategoryAccountsPayable: AccountPayableMappers_1.AccountPayableMappers.getMapper().toDomainArray(category.accountsPayable),
        }));
    }
    async findByDescription(description) {
        const result = await prisma_1.PrismaSingleton.getInstance().financialCategory.findFirst({
            where: { description },
        });
        if (!result) {
            return null;
        }
        return FinancialCategoryMappers_1.FinancialCategoryMappers.getMapper().toDomain(result);
    }
    async findByDescriptionAndParentCategory(description, parentCategoryId) {
        const result = await prisma_1.PrismaSingleton.getInstance().financialCategory.findFirst({
            where: { description, parentCategoryId },
        });
        if (!result) {
            return null;
        }
        return FinancialCategoryMappers_1.FinancialCategoryMappers.getMapper().toDomain(result);
    }
    async findById(id) {
        const result = await prisma_1.PrismaSingleton.getInstance().financialCategory.findFirst({
            where: { id },
        });
        if (!result) {
            return null;
        }
        return FinancialCategoryMappers_1.FinancialCategoryMappers.getMapper().toDomain(result);
    }
}
exports.FinancialCategoriesRepository = FinancialCategoriesRepository;
//# sourceMappingURL=FinancialCategoriesRepository.js.map