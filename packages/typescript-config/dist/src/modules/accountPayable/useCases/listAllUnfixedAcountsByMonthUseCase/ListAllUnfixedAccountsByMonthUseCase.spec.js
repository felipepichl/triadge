"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AccountPayable_1 = require("@modules/accountPayable/domain/AccountPayable");
const AccountsPayableRepositoryInMemory_1 = require("@modules/accountPayable/repositories/in-memory/AccountsPayableRepositoryInMemory");
const ListAllUnfixedAccountsByMonthUseCase_1 = require("./ListAllUnfixedAccountsByMonthUseCase");
let accountsPayableRepositoryInMemory;
let listAllUnfixedAccountsByMonthUseCase;
async function createAccountPayable() {
    accountsPayableRepositoryInMemory = new AccountsPayableRepositoryInMemory_1.AccountsPayableRepositoryInMemory();
    const accounts = [];
    const accountPayable1 = AccountPayable_1.AccountPayable.createAccountPayable({
        description: 'Unifixed Account Payable',
        amount: 100,
        dueDate: new Date('2025,04,01'),
        isFixed: true,
        userId: 'user_id',
        financialCategoryId: 'financial_category_id',
        subcategoryId: 'subcategory_id',
    });
    const accountPayable2 = AccountPayable_1.AccountPayable.createAccountPayable({
        description: 'Unfixed Account Payable',
        amount: 100,
        dueDate: new Date('2025,04,01'),
        isFixed: false,
        userId: 'user_id',
        financialCategoryId: 'financial_category_id',
        subcategoryId: 'subcategory_id',
    });
    accounts.push(accountPayable1, accountPayable2);
    accountsPayableRepositoryInMemory.createMany(accounts);
}
describe('[AccountPayable] - List all unfixed accounts payable by month', () => {
    beforeEach(() => {
        createAccountPayable();
        listAllUnfixedAccountsByMonthUseCase =
            new ListAllUnfixedAccountsByMonthUseCase_1.ListAllUnfixedAccountsByMonthUseCase(accountsPayableRepositoryInMemory);
    });
    it('should be able to list all unfixed account payable by month', async () => {
        const { unfixedAccountsPayable } = await listAllUnfixedAccountsByMonthUseCase.execute({
            userId: 'user_id',
            month: 4,
        });
        expect(unfixedAccountsPayable[0]).toBeDefined();
        expect(unfixedAccountsPayable.length).toBe(1);
    });
});
//# sourceMappingURL=ListAllUnfixedAccountsByMonthUseCase.spec.js.map