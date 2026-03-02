"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = require("@modules/accounts/domain/User");
const UsersRepositoryInMemory_1 = require("@modules/accounts/repositories/in-memory/UsersRepositoryInMemory");
const FinancialCategory_1 = require("@modules/financialCategory/domain/FinancialCategory");
const FinancialCategoriesRepositoryInMemory_1 = require("@modules/financialCategory/repositories/in-memory/FinancialCategoriesRepositoryInMemory");
const Transaction_1 = require("@modules/transactions/domain/transaction/Transaction");
const TransactionsRepositoryInMemory_1 = require("@modules/transactions/repositories/transaction/in-memory/TransactionsRepositoryInMemory");
const ListByDateRangeUseCase_1 = require("./ListByDateRangeUseCase");
let transactionsRepositoryInMemory;
let listByDateRangeUseCase;
const startDate = new Date('2024-08-01');
const endDate = new Date('2024-08-31');
async function createUser() {
    const user = User_1.User.createUser({
        name: 'Jonh Due',
        email: 'johndue@example.com',
        password: 'hash123',
        phoneNumber: '51999999999',
    });
    const usersRepositoryInMemory = new UsersRepositoryInMemory_1.UsersRepositoryInMemory();
    await usersRepositoryInMemory.create(user);
    const userId = (await usersRepositoryInMemory.listAll())[0].id;
    return userId.toString();
}
async function createTransaction() {
    const financialCategory = FinancialCategory_1.FinancialCategory.createFinancialCategory({
        description: 'Transaction category description',
        userId: 'user_id',
    });
    const financialCategoryInMemory = new FinancialCategoriesRepositoryInMemory_1.FinancialCategoriesRepositoryInMemory();
    await financialCategoryInMemory.create(financialCategory);
    const financialCategoryId = (await financialCategoryInMemory.listAllCategoriesByUser('user_id'))[0].id;
    const userId = await createUser();
    const transaction1 = Transaction_1.Transaction.createTransaction({
        description: 'Transaction description 1',
        type: 'income',
        date: startDate,
        amount: 1000,
        userId,
        financialCategoryId: financialCategoryId.toString(),
    });
    const transaction2 = Transaction_1.Transaction.createTransaction({
        description: 'Transaction description 2',
        type: 'outcome',
        date: endDate,
        amount: 500,
        userId,
        financialCategoryId: financialCategoryId.toString(),
    });
    const transaction3 = Transaction_1.Transaction.createTransaction({
        description: 'Transaction description 3',
        type: 'outcome',
        amount: 500,
        date: new Date('2023-07-01'),
        userId,
        financialCategoryId: financialCategoryId.toString(),
    });
    const transactionsToCreate = [transaction1, transaction2, transaction3];
    for (const transactionData of transactionsToCreate) {
        const transaction = transactionData;
        await transactionsRepositoryInMemory.create(transaction);
    }
    return userId;
}
describe('[Transaction] - List all transacition by date range', () => {
    let userId;
    beforeEach(async () => {
        transactionsRepositoryInMemory = new TransactionsRepositoryInMemory_1.TransactionsRepositoryInMemory();
        listByDateRangeUseCase = new ListByDateRangeUseCase_1.ListByDateRangeUseCase(transactionsRepositoryInMemory);
        userId = await createTransaction();
    });
    it('should be able to list all transacitions with balance', async () => {
        const result = await listByDateRangeUseCase.execute({
            userId,
            startDate,
            endDate,
        });
        expect(result.transactions).toHaveLength(2);
        expect(result.transactions).toEqual(expect.arrayContaining([
            expect.objectContaining({
                date: startDate,
            }),
            expect.objectContaining({
                date: endDate,
            }),
        ]));
    });
    it('should return an empty array if no transaction exist', async () => {
        const result = await listByDateRangeUseCase.execute({
            userId: '',
            startDate,
            endDate,
        });
        expect(result.transactions).toHaveLength(0);
    });
});
//# sourceMappingURL=ListByDateRangeUseCase.spec.js.map