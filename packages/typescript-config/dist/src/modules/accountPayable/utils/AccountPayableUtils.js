"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateAccountsPayableTotals = calculateAccountsPayableTotals;
function calculateAccountsPayableTotals(accountsPayable) {
    return accountsPayable.reduce((accumulator, accountPayable) => {
        accumulator.total += accountPayable.amount;
        return accumulator;
    }, {
        total: 0,
    });
}
//# sourceMappingURL=AccountPayableUtils.js.map