"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = require("@modules/accounts/domain/User");
const UsersRepositoryInMemory_1 = require("@modules/accounts/repositories/in-memory/UsersRepositoryInMemory");
const FinancialCategory_1 = require("@modules/financialCategory/domain/FinancialCategory");
const FinancialCategoriesRepositoryInMemory_1 = require("@modules/financialCategory/repositories/in-memory/FinancialCategoriesRepositoryInMemory");
const Transaction_1 = require("@modules/transactions/domain/transaction/Transaction");
const TransactionsRepositoryInMemory_1 = require("@modules/transactions/repositories/transaction/in-memory/TransactionsRepositoryInMemory");
const ListAllTransactionUseCase_1 = require("./ListAllTransactionUseCase");
let transactionsRepositoryInMemory;
let listAllTransactionUseCase;
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
async function createFinancialCategory() {
    const financialCategory = FinancialCategory_1.FinancialCategory.createFinancialCategory({
        description: 'Transaction category description',
        userId: 'user_id',
    });
    const financialCategoryInMemory = new FinancialCategoriesRepositoryInMemory_1.FinancialCategoriesRepositoryInMemory();
    await financialCategoryInMemory.create(financialCategory);
    const financialCategoryId = (await financialCategoryInMemory.listAllCategoriesByUser('user_id'))[0].id;
    return financialCategoryId.toString();
}
async function createTransaction() {
    const userId = await createUser();
    const financialCategoryId = await createFinancialCategory();
    const transaction1 = Transaction_1.Transaction.createTransaction({
        description: 'Transaction description',
        type: 'income',
        amount: 1000,
        userId,
        financialCategoryId,
    });
    const transaction2 = Transaction_1.Transaction.createTransaction({
        description: 'Transaction description',
        type: 'outcome',
        amount: 500,
        userId,
        financialCategoryId,
    });
    const transactionsToCreate = [transaction1, transaction2];
    for (const transactionData of transactionsToCreate) {
        const transaction = transactionData;
        await transactionsRepositoryInMemory.create(transaction);
    }
    return userId;
}
describe('[Transaction] - List all transacition with balance', () => {
    let userId;
    beforeEach(async () => {
        transactionsRepositoryInMemory = new TransactionsRepositoryInMemory_1.TransactionsRepositoryInMemory();
        listAllTransactionUseCase = new ListAllTransactionUseCase_1.ListAllTransactionUseCase(transactionsRepositoryInMemory);
        userId = await createTransaction();
    });
    it('should be able to list all transacitions with balance', async () => {
        const result = await listAllTransactionUseCase.execute({ userId });
        expect(result.transactions).toHaveLength(2);
        expect(result.transactions).toEqual(expect.arrayContaining([
            expect.objectContaining({
                type: 'income',
            }),
            expect.objectContaining({
                type: 'outcome',
            }),
        ]));
    });
    it('should return an empty array if no transaction exist', async () => {
        const result = await listAllTransactionUseCase.execute({
            userId: '',
        });
        expect(result.transactions).toHaveLength(0);
    });
});
//# sourceMappingURL=ListAllTransactionUseCase.spec.js.map