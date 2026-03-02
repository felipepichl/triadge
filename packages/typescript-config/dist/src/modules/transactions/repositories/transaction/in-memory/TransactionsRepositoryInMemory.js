"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionsRepositoryInMemory = void 0;
class TransactionsRepositoryInMemory {
    constructor() {
        this.transactions = [];
    }
    async create(transaction) {
        this.transactions.push(transaction);
    }
    async listAll() {
        return this.transactions;
    }
    async listByMonth(userId, month) {
        return this.transactions.filter((transaction) => {
            return (transaction.userId === userId &&
                transaction.date.getUTCMonth() + 1 === month);
        });
    }
    async listByDateRange(userId, startDate, endDate) {
        return this.transactions.filter((transaction) => transaction.userId === userId &&
            transaction.date >= startDate &&
            transaction.date <= endDate);
    }
    async listByType(userId, type) {
        return this.transactions.filter((transaction) => transaction.userId === userId && transaction.type === type.type);
    }
    async listByUser(userId) {
        return this.transactions.filter((transaction) => transaction.userId === userId);
    }
    async listByCategoryAndTypeAndMonth(financialCategoryId, type, month) {
        return this.transactions.filter((transaction) => {
            return (transaction.financialCategoryId === financialCategoryId &&
                transaction.type === type.type &&
                transaction.date.getUTCMonth() + 1 === month);
        });
    }
    async findById(id) {
        const transaction = this.transactions.find((transaction) => transaction.id.toString() === id);
        return transaction;
    }
    async findByDescription(description) {
        const transaction = this.transactions.find((transaction) => transaction.description === description);
        return transaction;
    }
    async findByDate(date) {
        const transaction = this.transactions.find((transaction) => transaction.date === date);
        return transaction;
    }
}
exports.TransactionsRepositoryInMemory = TransactionsRepositoryInMemory;
//# sourceMappingURL=TransactionsRepositoryInMemory.js.map