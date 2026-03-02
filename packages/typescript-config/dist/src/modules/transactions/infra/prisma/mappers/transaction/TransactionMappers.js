"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionMappers = void 0;
const Transaction_1 = require("@modules/transactions/domain/transaction/Transaction");
class TransactionMappers {
    toPersistence(transaction) {
        return transaction;
    }
    toDomain({ id, description, detail, type, amount, date, userId, financialCategory, financialCategoryId, }) {
        return Transaction_1.Transaction.createTransaction({
            id,
            description,
            detail,
            type: type,
            amount: Number(amount),
            date,
            userId,
            financialCategory,
            financialCategoryId,
        });
    }
    toDomainArray(rawTransactions) {
        return rawTransactions.map(this.toDomain);
    }
    getMapper() {
        return TransactionMappers.getMapper();
    }
    static getMapper() {
        return new TransactionMappers();
    }
}
exports.TransactionMappers = TransactionMappers;
//# sourceMappingURL=TransactionMappers.js.map