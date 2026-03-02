"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateTransactionTotals = calculateTransactionTotals;
function calculateTransactionTotals(transactions) {
    return transactions.reduce((accumulator, transaction) => {
        switch (transaction.type) {
            case 'income':
                accumulator.income += Number(transaction.amount);
                break;
            case 'outcome':
                accumulator.outcome += Number(transaction.amount);
                break;
            default:
                break;
        }
        return accumulator;
    }, {
        income: 0,
        outcome: 0,
    });
}
//# sourceMappingURL=transactions-utils.js.map