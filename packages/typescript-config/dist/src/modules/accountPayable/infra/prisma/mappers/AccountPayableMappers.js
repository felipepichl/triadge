"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccountPayableMappers = void 0;
const AccountPayable_1 = require("@modules/accountPayable/domain/AccountPayable");
const FinancialCategory_1 = require("@modules/financialCategory/domain/FinancialCategory");
class AccountPayableMappers {
    toPersistence(accountPayable) {
        return accountPayable;
    }
    toDomain({ id, description, amount, dueDate, paymentDate, isPaid, isFixed, userId, financialCategory, financialCategoryId, }) {
        const normalizedFinancialCategory = financialCategory && 'description' in financialCategory
            ? FinancialCategory_1.FinancialCategory.createFinancialCategory({
                id: String(financialCategory.id),
                description: financialCategory.description,
                userId,
            })
            : financialCategory;
        const amountNumber = typeof amount === 'object' && 'toNumber' in amount
            ? amount.toNumber()
            : Number(amount);
        return AccountPayable_1.AccountPayable.createAccountPayable({
            id,
            description,
            amount: amountNumber,
            dueDate,
            paymentDate: paymentDate || undefined,
            isPaid,
            isFixed,
            userId,
            financialCategory: normalizedFinancialCategory,
            financialCategoryId,
        });
    }
    toDomainArray(rawAccountsPayable) {
        return rawAccountsPayable.map(this.toDomain);
    }
    getMapper() {
        return AccountPayableMappers.getMapper();
    }
    static getMapper() {
        return new AccountPayableMappers();
    }
}
exports.AccountPayableMappers = AccountPayableMappers;
//# sourceMappingURL=AccountPayableMappers.js.map