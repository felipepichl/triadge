"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AccountPayable_1 = require("@modules/accountPayable/domain/AccountPayable");
const AccountsPayableRepositoryInMemory_1 = require("@modules/accountPayable/repositories/in-memory/AccountsPayableRepositoryInMemory");
const TransactionsRepositoryInMemory_1 = require("@modules/transactions/repositories/transaction/in-memory/TransactionsRepositoryInMemory");
const MarkAccountPayableAsPaidUseCase_1 = require("./MarkAccountPayableAsPaidUseCase");
let accountsPayableRepositoryInMemory;
let transactionsRepositoryInMemory;
let markAccountPayableAsPaidUseCase;
async function createAccountPayable() {
    accountsPayableRepositoryInMemory = new AccountsPayableRepositoryInMemory_1.AccountsPayableRepositoryInMemory();
    const accounts = [];
    const accountPayable1 = AccountPayable_1.AccountPayable.createAccountPayable({
        description: 'Account Payable 1',
        amount: 100,
        dueDate: new Date('2025,04,01'),
        userId: 'user_id',
        financialCategoryId: 'financial_category_id',
        subcategoryId: 'subcategory_id',
    });
    const accountPayable2 = AccountPayable_1.AccountPayable.createAccountPayable({
        description: 'Account Payable 2',
        amount: 100,
        dueDate: new Date('2025,04,01'),
        userId: 'user_id',
        financialCategoryId: 'financial_category_id',
        subcategoryId: 'subcategory_id',
    });
    accounts.push(accountPayable1, accountPayable2);
    accountsPayableRepositoryInMemory.createMany(accounts);
    return accountPayable1.id.toString();
}
describe('[AccountPayable] - Mark account payable as to paid', () => {
    let accountPayableId;
    beforeEach(async () => {
        accountPayableId = await createAccountPayable();
        transactionsRepositoryInMemory = new TransactionsRepositoryInMemory_1.TransactionsRepositoryInMemory();
        markAccountPayableAsPaidUseCase = new MarkAccountPayableAsPaidUseCase_1.MarkAccountPayableAsPaidUseCase(accountsPayableRepositoryInMemory, transactionsRepositoryInMemory);
    });
    it('should be able to mark account payable as to paid', async () => {
        await markAccountPayableAsPaidUseCase.execute({
            accountPayableId,
        });
        const result = await accountsPayableRepositoryInMemory.listAllPaidAccountsByMonth('user_id', 4);
        expect(result[0]).toBeDefined();
        expect(result.length).toBe(1);
        expect(result).toEqual(expect.arrayContaining([
            expect.objectContaining({
                isPaid: true,
            }),
        ]));
    });
    it('should be able to create a new transaction when account payable as to paid', async () => {
        await markAccountPayableAsPaidUseCase.execute({
            accountPayableId,
        });
        const result = await transactionsRepositoryInMemory.findByDescription('Account Payable 1');
        expect(result).toBeDefined();
        expect(result).toEqual(expect.objectContaining({
            description: 'Account Payable 1',
            type: 'outcome',
        }));
    });
});
//# sourceMappingURL=MarkAccountPayableAsPaid.spec.js.map