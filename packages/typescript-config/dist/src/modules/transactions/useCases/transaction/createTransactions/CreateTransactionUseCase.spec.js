"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const TransactionsRepositoryInMemory_1 = require("@modules/transactions/repositories/transaction/in-memory/TransactionsRepositoryInMemory");
const CreateTransactionUseCase_1 = require("./CreateTransactionUseCase");
let transactionsRepositoryInMemory;
let createTransactionUseCase;
describe('[Transaction] - Create a transaction', () => {
    beforeEach(() => {
        transactionsRepositoryInMemory = new TransactionsRepositoryInMemory_1.TransactionsRepositoryInMemory();
        createTransactionUseCase = new CreateTransactionUseCase_1.CreateTransactionUseCase(transactionsRepositoryInMemory);
    });
    it('should be able to create a new transaction', async () => {
        await createTransactionUseCase.execute({
            description: 'Transaction Test',
            detail: 'Detail Test',
            type: 'income',
            amount: 1000,
            userId: 'userId',
            financialCategoryId: 'financialCategoryId',
            subcategoryId: 'subcategoryId',
        });
        const transactionCreated = await transactionsRepositoryInMemory.listAll();
        expect(transactionCreated[0]).toBeDefined();
        expect(transactionCreated[0].description).toEqual('Transaction Test');
    });
});
//# sourceMappingURL=CreateTransactionUseCase.spec.js.map