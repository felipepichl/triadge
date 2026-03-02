"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const StockPosition_1 = require("@modules/stock/domain/StockPosition");
const B3ProviderInMemory_1 = require("@modules/stock/providers/B3Provider/in-memory/B3ProviderInMemory");
const StockPositionRepositoryInMemory_1 = require("@modules/stock/repositories/in-memory/StockPositionRepositoryInMemory");
const GetPortfolioQuotesUseCase_1 = require("./GetPortfolioQuotesUseCase");
let stockPositionRepositoryInMemory;
let b3ProviderInMemory;
let getPortfolioQuotesUseCase;
async function createStockPositions() {
    stockPositionRepositoryInMemory = new StockPositionRepositoryInMemory_1.StockPositionRepositoryInMemory();
    const position1 = StockPosition_1.StockPosition.createStockPosition({
        symbol: 'symbol1',
        quantity: 1,
        type: { stockType: 'stock' },
        avgPrice: 7,
        userId: 'userId',
    });
    const position2 = StockPosition_1.StockPosition.createStockPosition({
        symbol: 'symbol2',
        quantity: 3,
        type: { stockType: 'fii' },
        avgPrice: 7,
        userId: 'userId',
    });
    const position3 = StockPosition_1.StockPosition.createStockPosition({
        symbol: 'symbol3',
        quantity: 2,
        type: { stockType: 'fii' },
        avgPrice: 7.5,
        userId: 'userId',
    });
    const positionsToCreate = [position1, position2, position3];
    for (const position of positionsToCreate) {
        await stockPositionRepositoryInMemory.create(position);
    }
    b3ProviderInMemory.addSymbol(['symbol1', 'symbol2', 'symbol3']);
}
describe('[Stock] - List stock positions and total invested e current value to stock', () => {
    beforeEach(async () => {
        b3ProviderInMemory = new B3ProviderInMemory_1.B3ProviderInMemory();
        await createStockPositions();
        getPortfolioQuotesUseCase = new GetPortfolioQuotesUseCase_1.GetPortfolioQuotesUseCase(stockPositionRepositoryInMemory, b3ProviderInMemory);
    });
    it('should be able to list all stock positions with total invested e current value to stock', async () => {
        const result = await getPortfolioQuotesUseCase.execute({
            userId: 'userId',
            type: { stockType: 'fii' },
        });
        const { portfolio } = result;
        expect(portfolio).toBeDefined();
        expect(portfolio.length).toBe(2);
        const symbol2Position = portfolio.find((p) => p.stock.symbol === 'symbol2');
        expect(symbol2Position).toBeDefined();
        expect(symbol2Position === null || symbol2Position === void 0 ? void 0 : symbol2Position.totalInvested).toBe(21);
        expect(symbol2Position === null || symbol2Position === void 0 ? void 0 : symbol2Position.currentValue).toBe(39);
        expect(symbol2Position === null || symbol2Position === void 0 ? void 0 : symbol2Position.stock.totalStock).toBe(3);
        const symbol3Position = portfolio.find((p) => p.stock.symbol === 'symbol3');
        expect(symbol3Position).toBeDefined();
        expect(symbol3Position === null || symbol3Position === void 0 ? void 0 : symbol3Position.totalInvested).toBe(15);
        expect(symbol3Position === null || symbol3Position === void 0 ? void 0 : symbol3Position.currentValue).toBe(26);
        expect(symbol3Position === null || symbol3Position === void 0 ? void 0 : symbol3Position.stock.totalStock).toBe(2);
    });
});
//# sourceMappingURL=GetPortfolioQuotesUseCaseUseCase.spec.js.map