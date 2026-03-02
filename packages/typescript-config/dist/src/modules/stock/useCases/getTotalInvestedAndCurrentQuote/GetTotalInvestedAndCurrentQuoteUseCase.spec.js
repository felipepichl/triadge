"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Stock_1 = require("@modules/stock/domain/Stock");
const B3ProviderInMemory_1 = require("@modules/stock/providers/B3Provider/in-memory/B3ProviderInMemory");
const StockRepositoryInMemory_1 = require("@modules/stock/repositories/in-memory/StockRepositoryInMemory");
const GetTotalInvestedAndCurrentQuoteUseCase_1 = require("./GetTotalInvestedAndCurrentQuoteUseCase");
let stockRepositoryInMemory;
let b3ProviderInMemory;
let getTotalInvestedAndCurrentQuoteUseCase;
async function buyStocks(currentPrices) {
    stockRepositoryInMemory = new StockRepositoryInMemory_1.StockRepositoryInMemory();
    const stock1 = Stock_1.Stock.createStock({
        shortName: 'short name 1',
        symbol: 'symbol1',
        price: 7,
        date: new Date(),
        quantity: 1,
        type: { stockType: 'stock' },
        operation: { stockOperationType: 'buy' },
        userId: 'userId',
    });
    const stock2 = Stock_1.Stock.createStock({
        shortName: 'short name 2',
        symbol: 'symbol2',
        price: 7,
        date: new Date(),
        quantity: 3,
        type: { stockType: 'fii' },
        operation: { stockOperationType: 'buy' },
        userId: 'userId',
    });
    const stock3 = Stock_1.Stock.createStock({
        shortName: 'short name 3',
        symbol: 'symbol3',
        price: 7,
        date: new Date(),
        quantity: 1,
        type: { stockType: 'fii' },
        operation: { stockOperationType: 'buy' },
        userId: 'userId',
    });
    const stock4 = Stock_1.Stock.createStock({
        shortName: 'short name 3',
        symbol: 'symbol3',
        price: 8,
        date: new Date(),
        quantity: 1,
        type: { stockType: 'fii' },
        operation: { stockOperationType: 'buy' },
        userId: 'userId',
    });
    const stock5 = Stock_1.Stock.createStock({
        shortName: 'short name 3',
        symbol: 'symbol3',
        price: 8,
        date: new Date(),
        quantity: 1,
        type: { stockType: 'fii' },
        operation: { stockOperationType: 'sell' },
        userId: 'userId',
    });
    const stocksToCreate = [stock1, stock2, stock3, stock4, stock5];
    for (const stockData of stocksToCreate) {
        const stock = stockData;
        await stockRepositoryInMemory.create(stock);
    }
    if (currentPrices) {
        for (const [symbol, price] of Object.entries(currentPrices)) {
            b3ProviderInMemory.stocks.push({
                shortName: `shortname to ${symbol}`,
                symbol,
                regularMarketPrice: price.toString(),
            });
        }
    }
    else {
        b3ProviderInMemory.addSymbol(['symbol1', 'symbol2', 'symbol3']);
    }
}
describe('[Stock] - List total invested e current value to wallet', () => {
    beforeEach(async () => {
        b3ProviderInMemory = new B3ProviderInMemory_1.B3ProviderInMemory();
        await buyStocks();
        getTotalInvestedAndCurrentQuoteUseCase =
            new GetTotalInvestedAndCurrentQuoteUseCase_1.GetTotalInvestedAndCurrentQuoteUseCase(stockRepositoryInMemory, b3ProviderInMemory);
    });
    it('should be able to list total invested e current value to wallet', async () => {
        const result = await getTotalInvestedAndCurrentQuoteUseCase.execute({
            userId: 'userId',
            type: { stockType: 'fii' },
        });
        const { currentValue, totalInvested, position } = result;
        expect(totalInvested).toBe(36);
        expect(currentValue).toBe(65);
        expect(position).toBe(29);
    });
    it('should calculate position with profit when current prices are higher than purchase prices', async () => {
        stockRepositoryInMemory = new StockRepositoryInMemory_1.StockRepositoryInMemory();
        b3ProviderInMemory = new B3ProviderInMemory_1.B3ProviderInMemory();
        await buyStocks({
            symbol2: 15,
            symbol3: 12,
        });
        getTotalInvestedAndCurrentQuoteUseCase =
            new GetTotalInvestedAndCurrentQuoteUseCase_1.GetTotalInvestedAndCurrentQuoteUseCase(stockRepositoryInMemory, b3ProviderInMemory);
        const result = await getTotalInvestedAndCurrentQuoteUseCase.execute({
            userId: 'userId',
            type: { stockType: 'fii' },
        });
        const { currentValue, totalInvested, position } = result;
        expect(totalInvested).toBe(36);
        expect(currentValue).toBe(69);
        expect(position).toBe(33);
    });
    it('should calculate position with loss when current prices are lower than purchase prices', async () => {
        stockRepositoryInMemory = new StockRepositoryInMemory_1.StockRepositoryInMemory();
        b3ProviderInMemory = new B3ProviderInMemory_1.B3ProviderInMemory();
        await buyStocks({
            symbol2: 5,
            symbol3: 6,
        });
        getTotalInvestedAndCurrentQuoteUseCase =
            new GetTotalInvestedAndCurrentQuoteUseCase_1.GetTotalInvestedAndCurrentQuoteUseCase(stockRepositoryInMemory, b3ProviderInMemory);
        const result = await getTotalInvestedAndCurrentQuoteUseCase.execute({
            userId: 'userId',
            type: { stockType: 'fii' },
        });
        const { currentValue, totalInvested, position } = result;
        expect(totalInvested).toBe(36);
        expect(currentValue).toBe(27);
        expect(position).toBe(-9);
    });
});
//# sourceMappingURL=GetTotalInvestedAndCurrentQuoteUseCase.spec.js.map