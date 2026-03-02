"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AccountPayable_1 = require("@modules/accountPayable/domain/AccountPayable");
const AccountsPayableRepositoryInMemory_1 = require("@modules/accountPayable/repositories/in-memory/AccountsPayableRepositoryInMemory");
const UpdateAmountVariableUseCase_1 = require("./UpdateAmountVariableUseCase");
let accountsPayableRepositoryInMemory;
let updateAmountVariableUseCase;
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
        amount: 150,
        dueDate: new Date('2025,04,01'),
        userId: 'user_id',
        financialCategoryId: 'financial_category_id',
        subcategoryId: 'subcategory_id',
    });
    accounts.push(accountPayable1, accountPayable2);
    accountsPayableRepositoryInMemory.createMany(accounts);
    return accountPayable1.id.toString();
}
describe('[AccountPayable] - Update amount variable to account payable', () => {
    let accountPayableId;
    beforeEach(async () => {
        accountPayableId = await createAccountPayable();
        updateAmountVariableUseCase = new UpdateAmountVariableUseCase_1.UpdateAmountVariableUseCase(accountsPayableRepositoryInMemory);
    });
    it('should be able to update amount variable to account payable', async () => {
        await updateAmountVariableUseCase.execute({
            accountPayableId,
            amount: 200,
        });
        const result = await accountsPayableRepositoryInMemory.listAll('user_id');
        expect(result).toEqual(expect.arrayContaining([
            expect.objectContaining({
                amount: 200,
            }),
        ]));
    });
});
//# sourceMappingURL=UpdateAmountVariableUseCase.spec.js.map