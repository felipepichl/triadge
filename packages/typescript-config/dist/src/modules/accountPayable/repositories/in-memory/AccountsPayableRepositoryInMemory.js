"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccountsPayableRepositoryInMemory = void 0;
class AccountsPayableRepositoryInMemory {
    constructor() {
        this.accountsPayable = [];
    }
    async create(accountPayable) {
        this.accountsPayable.push(accountPayable);
    }
    async createMany(accounts) {
        this.accountsPayable.push(...accounts);
    }
    async update(accountPayable) {
        const index = this.accountsPayable.findIndex((item) => item.id === accountPayable.id);
        if (index !== -1) {
            this.accountsPayable[index] = accountPayable;
        }
    }
    async listAll(userId, page = 1, pageSize = 50) {
        const filtered = this.accountsPayable.filter((accountPayable) => accountPayable.userId === userId);
        const skip = (page - 1) * pageSize;
        return filtered.slice(skip, skip + pageSize);
    }
    async listByDateRange(userId, startDate, endDate) {
        return this.accountsPayable.filter((accountPayable) => accountPayable.userId === userId &&
            accountPayable.dueDate >= startDate &&
            accountPayable.dueDate <= endDate);
    }
    async listAllFixedAccountsByMonth(userId, month) {
        return this.accountsPayable.filter((accountPayable) => accountPayable.userId === userId &&
            accountPayable.isFixed === true &&
            accountPayable.dueDate.getUTCMonth() + 1 === month);
    }
    async listAllUnfixedAccountsByMonth(userId, month) {
        return this.accountsPayable.filter((accountPayable) => accountPayable.userId === userId &&
            accountPayable.isFixed === false &&
            accountPayable.dueDate.getUTCMonth() + 1 === month);
    }
    async listAllUnpaidAccountsByMonth(userId, month) {
        return this.accountsPayable.filter((accountPayable) => accountPayable.userId === userId &&
            accountPayable.isPaid === false &&
            accountPayable.dueDate.getUTCMonth() + 1 === month);
    }
    async listAllPaidAccountsByMonth(userId, month) {
        return this.accountsPayable.filter((accountPayable) => accountPayable.userId === userId &&
            accountPayable.isPaid === true &&
            accountPayable.dueDate.getUTCMonth() + 1 === month);
    }
    async findById(accountPayableId) {
        return this.accountsPayable.find((accountPayable) => accountPayable.id.toString() === accountPayableId);
    }
    async markAccountAsPaid(accountPayableId) {
        const findIndex = this.accountsPayable.findIndex((accountPayable) => accountPayable.id.toString() === accountPayableId);
        this.accountsPayable[findIndex] = Object.assign(Object.assign({}, this.accountsPayable[findIndex]), { isPaid: true });
    }
}
exports.AccountsPayableRepositoryInMemory = AccountsPayableRepositoryInMemory;
//# sourceMappingURL=AccountsPayableRepositoryInMemory.js.map