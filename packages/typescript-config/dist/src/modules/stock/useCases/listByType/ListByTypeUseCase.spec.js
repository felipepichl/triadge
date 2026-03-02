"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Stock_1 = require("@modules/stock/domain/Stock");
const StockRepositoryInMemory_1 = require("@modules/stock/repositories/in-memory/StockRepositoryInMemory");
const ListByTypeUseCase_1 = require("./ListByTypeUseCase");
let stockRepositoryInMemory;
let listByTypeUseCase;
async function createStock() {
    stockRepositoryInMemory = new StockRepositoryInMemory_1.StockRepositoryInMemory();
    const stock1 = Stock_1.Stock.createStock({
        shortName: 'short name 1',
        symbol: 'symbol 1',
        price: 7,
        date: new Date(),
        quantity: 1,
        type: { stockType: 'stock' },
        userId: 'userId',
    });
    const stock2 = Stock_1.Stock.createStock({
        shortName: 'short name 2',
        symbol: 'symbol 2',
        price: 7,
        date: new Date(),
        quantity: 1,
        type: { stockType: 'fii' },
        userId: 'userId',
    });
    const stocksToCreate = [stock1, stock2];
    for (const stockData of stocksToCreate) {
        const stock = stockData;
        await stockRepositoryInMemory.create(stock);
    }
}
describe('[Stock] - List by type', () => {
    beforeEach(async () => {
        await createStock();
        listByTypeUseCase = new ListByTypeUseCase_1.ListByTypeUseCase(stockRepositoryInMemory);
    });
    it('should be able to list all stocks by type', async () => {
        const result = await listByTypeUseCase.execute({
            userId: 'userId',
            type: { stockType: 'fii' },
        });
        const { stocks } = result;
        expect(stocks[0]).toBeDefined();
        expect(stocks.length).toBe(1);
        expect(stocks[0].price).toBe(7);
        expect(stocks[0].symbol).toBe('symbol 2');
    });
});
//# sourceMappingURL=ListByTypeUseCase.spec.js.map