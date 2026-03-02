"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FinancialCategoriesRepositoryInMemory = void 0;
class FinancialCategoriesRepositoryInMemory {
    constructor() {
        this.financialCategories = [];
        this.transactions = [];
        this.accountsPayable = [];
    }
    async create(financialCategory) {
        this.financialCategories.push(financialCategory);
    }
    async listAllCategoriesByUser(userId) {
        return this.financialCategories.filter((financialCategory) => financialCategory.userId === userId);
    }
    async listSubcategoriesByCategoryId(userId, parentCategoryId) {
        return this.financialCategories.filter((financialCategory) => financialCategory.userId === userId &&
            financialCategory.parentCategoryId === parentCategoryId);
    }
    async listFinancialCategoriesWithTransactionsByType(userId, type, month) {
        const year = new Date().getFullYear();
        const userFinancialCategories = this.financialCategories.filter((financialCategory) => financialCategory.userId === userId);
        return userFinancialCategories.map((financialCategory) => {
            const financialCategoryTransactions = this.transactions.filter((transaction) => transaction.financialCategoryId === financialCategory.id.toString() &&
                transaction.type === type.type &&
                transaction.date.getFullYear() === year &&
                transaction.date.getMonth() === month - 1);
            return {
                financialCategory,
                financialCategoryTransactions,
            };
        });
    }
    async listFinancialCategoriesWithFixedAccountsPayable(userId, month) {
        const year = new Date().getFullYear();
        const userFinancialCategories = this.financialCategories.filter((financialCategory) => financialCategory.userId === userId);
        return userFinancialCategories.map((financialCategory) => {
            const financialCategoryAccountsPayable = this.accountsPayable.filter((accountPayable) => accountPayable.financialCategoryId ===
                financialCategory.id.toString() &&
                accountPayable.isFixed === true &&
                accountPayable.dueDate.getFullYear() === year &&
                accountPayable.dueDate.getMonth() === month - 1);
            return {
                financialCategory,
                financialCategoryAccountsPayable,
            };
        });
    }
    async listFinancialCategoriesWithUnfixedAccountsPayable(userId, month) {
        const year = new Date().getFullYear();
        const userFinancialCategories = this.financialCategories.filter((financialCategory) => financialCategory.userId === userId);
        return userFinancialCategories.map((financialCategory) => {
            const financialCategoryAccountsPayable = this.accountsPayable.filter((accountPayable) => accountPayable.financialCategoryId ===
                financialCategory.id.toString() &&
                accountPayable.isFixed === false &&
                accountPayable.dueDate.getFullYear() === year &&
                accountPayable.dueDate.getMonth() === month - 1);
            return {
                financialCategory,
                financialCategoryAccountsPayable,
            };
        });
    }
    async findByDescription(description) {
        return this.financialCategories.find((financialCategory) => financialCategory.description === description);
    }
    async findByDescriptionAndParentCategory(description, parentCategoryId) {
        return this.financialCategories.find((financialCategory) => financialCategory.description === description &&
            financialCategory.parentCategoryId === parentCategoryId);
    }
    async findById(id) {
        return this.financialCategories.find((financialCategory) => financialCategory.id.toString() === id);
    }
    async addTransaction(transaction) {
        this.transactions.push(transaction);
    }
    async addAccountPayable(accountPayable) {
        this.accountsPayable.push(accountPayable);
    }
}
exports.FinancialCategoriesRepositoryInMemory = FinancialCategoriesRepositoryInMemory;
//# sourceMappingURL=FinancialCategoriesRepositoryInMemory.js.map