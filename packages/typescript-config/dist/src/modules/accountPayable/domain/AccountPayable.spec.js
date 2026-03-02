"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AccountPayable_1 = require("./AccountPayable");
describe('[AccountPayable] - Create a new account payable', () => {
    it('should be able to create a new instance of account payable', () => {
        const accountPayable = AccountPayable_1.AccountPayable.createAccountPayable({
            description: 'Account Payable description',
            amount: 100,
            dueDate: new Date(),
            isPaid: false,
            isFixed: false,
            userId: 'user_id',
            financialCategoryId: 'financial_category_id',
            subcategoryId: 'subcategory_id',
        });
        expect(accountPayable instanceof AccountPayable_1.AccountPayable).toBe(true);
        expect(accountPayable).toBeTruthy();
    });
});
//# sourceMappingURL=AccountPayable.spec.js.map