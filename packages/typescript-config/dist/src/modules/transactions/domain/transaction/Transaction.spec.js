"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Transaction_1 = require("./Transaction");
describe('[Transaction] - Create a new transaction', () => {
    it('should be able to create a new instance of transaction', () => {
        const transaction = Transaction_1.Transaction.createTransaction({
            description: 'Transaction description',
            type: 'income',
            amount: 1000,
            userId: 'userId',
            financialCategoryId: 'financialCategoryId',
        });
        expect(transaction instanceof Transaction_1.Transaction).toBe(true);
        expect(transaction).toBeTruthy();
    });
});
//# sourceMappingURL=Transaction.spec.js.map