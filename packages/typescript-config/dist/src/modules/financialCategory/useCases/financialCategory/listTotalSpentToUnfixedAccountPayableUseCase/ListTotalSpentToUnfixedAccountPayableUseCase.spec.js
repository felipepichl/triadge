"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AccountPayable_1 = require("@modules/accountPayable/domain/AccountPayable");
const FinancialCategory_1 = require("@modules/financialCategory/domain/FinancialCategory");
const FinancialCategoriesRepositoryInMemory_1 = require("@modules/financialCategory/repositories/in-memory/FinancialCategoriesRepositoryInMemory");
const ListTotalSpentToUnfixedAccountPayableUseCase_1 = require("./ListTotalSpentToUnfixedAccountPayableUseCase");
let financialCategoriesRepositoryInMemory;
let listTotalSpentToUnfixedAccountPayableUseCase;
describe('[FinancialCategory] - List total spent by financial category to accounts payable', () => {
    const currentMonth = new Date().getMonth() + 1;
    beforeEach(() => {
        financialCategoriesRepositoryInMemory =
            new FinancialCategoriesRepositoryInMemory_1.FinancialCategoriesRepositoryInMemory();
        listTotalSpentToUnfixedAccountPayableUseCase =
            new ListTotalSpentToUnfixedAccountPayableUseCase_1.ListTotalSpentToUnfixedAccountPayableUseCase(financialCategoriesRepositoryInMemory);
    });
    it('should be able to calculate the total spent by financial category to unfixed accounts payable', async () => {
        const financialCategory1 = FinancialCategory_1.FinancialCategory.createFinancialCategory({
            description: 'Category 1',
            userId: 'userId',
        });
        const financialCategory2 = FinancialCategory_1.FinancialCategory.createFinancialCategory({
            description: 'Category 2',
            userId: 'userId',
        });
        const finacialCategories = [financialCategory1, financialCategory2];
        for (const financialCategory of finacialCategories) {
            await financialCategoriesRepositoryInMemory.create(financialCategory);
        }
        const fixedAccountPayable1 = AccountPayable_1.AccountPayable.createAccountPayable({
            description: 'Account Payable 1',
            amount: 100,
            dueDate: new Date(new Date().getFullYear(), currentMonth - 1, 1),
            isFixed: false,
            userId: 'userId',
            financialCategoryId: financialCategory1.id.toString(),
        });
        const fixedAccountPayable2 = AccountPayable_1.AccountPayable.createAccountPayable({
            description: 'Account Payable 2',
            amount: 200,
            dueDate: new Date(new Date().getFullYear(), currentMonth - 1, 15),
            isFixed: false,
            userId: 'userId',
            financialCategoryId: financialCategory1.id.toString(),
        });
        const fixedAccountPayable3 = AccountPayable_1.AccountPayable.createAccountPayable({
            description: 'Account Payable 3',
            amount: 50,
            dueDate: new Date(new Date().getFullYear(), currentMonth - 1, 20),
            isFixed: false,
            userId: 'userId',
            financialCategoryId: financialCategory2.id.toString(),
        });
        const accountsPayable = [
            fixedAccountPayable1,
            fixedAccountPayable2,
            fixedAccountPayable3,
        ];
        for (const accountPayable of accountsPayable) {
            await financialCategoriesRepositoryInMemory.addAccountPayable(accountPayable);
        }
        const result = await listTotalSpentToUnfixedAccountPayableUseCase.execute({
            userId: 'userId',
            month: currentMonth,
        });
        expect(result.totalExpensesByFinancialCategory).toHaveLength(2);
        expect(result.totalExpensesByFinancialCategory).toEqual(expect.arrayContaining([
            expect.objectContaining({
                financialCategory: expect.objectContaining({
                    description: 'Category 1',
                }),
                totalSpent: 300.0,
            }),
            expect.objectContaining({
                financialCategory: expect.objectContaining({
                    description: 'Category 2',
                }),
                totalSpent: 50.0,
            }),
        ]));
    });
    it('should return an empty array if no accounts payable exist for the user', async () => {
        const result = await listTotalSpentToUnfixedAccountPayableUseCase.execute({
            userId: 'userWithoutAccountsPayable',
            month: currentMonth,
        });
        expect(result.totalExpensesByFinancialCategory).toHaveLength(0);
    });
});
//# sourceMappingURL=ListTotalSpentToUnfixedAccountPayableUseCase.spec.js.map