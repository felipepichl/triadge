"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const FinancialCategory_1 = require("@modules/financialCategory/domain/FinancialCategory");
const FinancialCategoriesRepositoryInMemory_1 = require("@modules/financialCategory/repositories/in-memory/FinancialCategoriesRepositoryInMemory");
const Transaction_1 = require("@modules/transactions/domain/transaction/Transaction");
const ListTotalSpentByFinancialCategoryUseCase_1 = require("./ListTotalSpentByFinancialCategoryUseCase");
let financialCategoriesRepositoryInMemory;
let listTotalSpentByFinancialCategoryUseCase;
describe('[FinancialCategory] - List total spent by financial category', () => {
    const currentMonth = new Date().getMonth() + 1;
    beforeEach(() => {
        financialCategoriesRepositoryInMemory =
            new FinancialCategoriesRepositoryInMemory_1.FinancialCategoriesRepositoryInMemory();
        listTotalSpentByFinancialCategoryUseCase =
            new ListTotalSpentByFinancialCategoryUseCase_1.ListTotalSpentByFinancialCategoryUseCase(financialCategoriesRepositoryInMemory);
    });
    it('should be able to calculate the total spent by financial category', async () => {
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
        const transaction1 = Transaction_1.Transaction.createTransaction({
            description: 'Transaction 1',
            type: 'outcome',
            amount: 10.0,
            date: new Date(new Date().getFullYear(), currentMonth - 1, 1),
            userId: 'userId',
            financialCategoryId: financialCategory1.id.toString(),
        });
        const transaction2 = Transaction_1.Transaction.createTransaction({
            description: 'Transaction 2',
            type: 'outcome',
            amount: 20.0,
            date: new Date(new Date().getFullYear(), currentMonth - 1, 15),
            userId: 'userId',
            financialCategoryId: financialCategory1.id.toString(),
        });
        const transaction3 = Transaction_1.Transaction.createTransaction({
            description: 'Transaction 3',
            type: 'outcome',
            amount: 5.0,
            date: new Date(new Date().getFullYear(), currentMonth - 1, 20),
            userId: 'userId',
            financialCategoryId: financialCategory2.id.toString(),
        });
        const transactions = [transaction1, transaction2, transaction3];
        for (const transaction of transactions) {
            await financialCategoriesRepositoryInMemory.addTransaction(transaction);
        }
        const result = await listTotalSpentByFinancialCategoryUseCase.execute({
            userId: 'userId',
            type: { type: 'outcome' },
            month: currentMonth,
        });
        expect(result.totalExpensesByFinancialCategory).toHaveLength(2);
        expect(result.totalExpensesByFinancialCategory).toEqual(expect.arrayContaining([
            expect.objectContaining({
                financialCategory: expect.objectContaining({
                    description: 'Category 1',
                }),
                totalSpent: 30.0,
            }),
            expect.objectContaining({
                financialCategory: expect.objectContaining({
                    description: 'Category 2',
                }),
                totalSpent: 5.0,
            }),
        ]));
    });
    it('should return an empty array if no transactions exist for the user', async () => {
        const result = await listTotalSpentByFinancialCategoryUseCase.execute({
            userId: 'userWithoutTransactions',
            type: { type: 'outcome' },
            month: currentMonth,
        });
        expect(result.totalExpensesByFinancialCategory).toHaveLength(0);
    });
});
//# sourceMappingURL=ListTotalSpentByFinancialCategoryUseCase.spec.js.map