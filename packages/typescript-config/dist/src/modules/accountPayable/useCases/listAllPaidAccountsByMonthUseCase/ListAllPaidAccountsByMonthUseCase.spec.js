"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AccountPayable_1 = require("@modules/accountPayable/domain/AccountPayable");
const AccountsPayableRepositoryInMemory_1 = require("@modules/accountPayable/repositories/in-memory/AccountsPayableRepositoryInMemory");
const ListAllPaidAccountsByMonthUseCase_1 = require("./ListAllPaidAccountsByMonthUseCase");
let accountsPayableRepositoryInMemory;
let listAllPaidAccountsByMonthUseCase;
async function createAccountPayable() {
    accountsPayableRepositoryInMemory = new AccountsPayableRepositoryInMemory_1.AccountsPayableRepositoryInMemory();
    const accounts = [];
    const accountPayable1 = AccountPayable_1.AccountPayable.createAccountPayable({
        description: 'Account Payable 1',
        amount: 200,
        dueDate: new Date('2025,04,01'),
        isFixed: true,
        userId: 'user_id',
        isPaid: true,
        financialCategoryId: 'financial_category_id',
        subcategoryId: 'subcategory_id',
    });
    const accountPayable2 = AccountPayable_1.AccountPayable.createAccountPayable({
        description: 'Account Payable 2',
        amount: 300,
        dueDate: new Date('2025,04,01'),
        userId: 'user_id',
        isPaid: false,
        financialCategoryId: 'financial_category_id',
        subcategoryId: 'subcategory_id',
    });
    const accountPayable3 = AccountPayable_1.AccountPayable.createAccountPayable({
        description: 'Account Payable 3',
        amount: 150,
        dueDate: new Date('2025,04,01'),
        userId: 'user_id',
        isPaid: false,
        financialCategoryId: 'financial_category_id',
        subcategoryId: 'subcategory_id',
    });
    accounts.push(accountPayable1, accountPayable2, accountPayable3);
    accountsPayableRepositoryInMemory.createMany(accounts);
}
describe('[AccountPayable] - List all paid accounts payable by month', () => {
    beforeEach(() => {
        createAccountPayable();
        listAllPaidAccountsByMonthUseCase = new ListAllPaidAccountsByMonthUseCase_1.ListAllPaidAccountsByMonthUseCase(accountsPayableRepositoryInMemory);
    });
    it('should be able to list all paid account payable by month', async () => {
        const { paidAccountsPayable, paidAccountsPayableTotalAmount } = await listAllPaidAccountsByMonthUseCase.execute({
            userId: 'user_id',
            month: 4,
        });
        expect(paidAccountsPayable[0]).toBeDefined();
        expect(paidAccountsPayable.length).toBe(1);
        expect(paidAccountsPayableTotalAmount).toBe(200);
    });
});
//# sourceMappingURL=ListAllPaidAccountsByMonthUseCase.spec.js.map