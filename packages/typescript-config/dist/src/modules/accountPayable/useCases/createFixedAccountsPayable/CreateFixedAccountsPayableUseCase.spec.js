"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AccountsPayableRepositoryInMemory_1 = require("@modules/accountPayable/repositories/in-memory/AccountsPayableRepositoryInMemory");
const CreateFixedAccounsPayableUseCase_1 = require("./CreateFixedAccounsPayableUseCase");
let accountsPayableRepositoryInMemory;
let createFixedAccountsPayableUseCase;
function monthsUntilEndOfYear() {
    const today = new Date();
    const currentMonth = today.getMonth();
    const monthsLeft = 12 - currentMonth;
    return monthsLeft;
}
describe('[AccountPayable] - Create a fixed account payable', () => {
    beforeEach(() => {
        accountsPayableRepositoryInMemory = new AccountsPayableRepositoryInMemory_1.AccountsPayableRepositoryInMemory();
        createFixedAccountsPayableUseCase = new CreateFixedAccounsPayableUseCase_1.CreateFixedAccountsPayableUseCase(accountsPayableRepositoryInMemory);
    });
    it('should be able to create a new fixed account payable', async () => {
        await createFixedAccountsPayableUseCase.execute({
            description: 'Account Payable description',
            amount: 100,
            dueDate: new Date(),
            userId: 'user_id',
            financialCategoryId: 'financial_category_id',
            subcategoryId: 'subcategory_id',
        });
        const accountPayableCreated = await accountsPayableRepositoryInMemory.listAll('user_id');
        expect(accountPayableCreated[0]).toBeDefined();
        expect(accountPayableCreated.length).toBe(monthsUntilEndOfYear());
    });
});
//# sourceMappingURL=CreateFixedAccountsPayableUseCase.spec.js.map