"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Stock_1 = require("@modules/stock/domain/Stock");
const StockPosition_1 = require("@modules/stock/domain/StockPosition");
const StockPositionRepositoryInMemory_1 = require("@modules/stock/repositories/in-memory/StockPositionRepositoryInMemory");
const StockRepositoryInMemory_1 = require("@modules/stock/repositories/in-memory/StockRepositoryInMemory");
const AppError_1 = require("@shared/error/AppError");
const SellStocksUseCase_1 = require("./SellStocksUseCase");
let stockRepositoryInMemory;
let stockPositionRepositoryInMemory;
let sellStockUseCase;
async function createStock() {
    stockRepositoryInMemory = new StockRepositoryInMemory_1.StockRepositoryInMemory();
    const stock1 = Stock_1.Stock.createStock({
        shortName: 'short name 1',
        symbol: 'symbol1',
        price: 3,
        date: new Date(),
        quantity: 5,
        type: { stockType: 'fii' },
        userId: 'userId',
    });
    const stock2 = Stock_1.Stock.createStock({
        shortName: 'short name 2',
        symbol: 'symbol2',
        price: 3,
        date: new Date(),
        quantity: 5,
        type: { stockType: 'fii' },
        userId: 'userId',
    });
    const stock3 = Stock_1.Stock.createStock({
        shortName: 'short name 1',
        symbol: 'symbol1',
        price: 2,
        date: new Date(),
        quantity: 5,
        type: { stockType: 'fii' },
        userId: 'userId',
    });
    const stocksToCreate = [stock1, stock2, stock3];
    for (const stockData of stocksToCreate) {
        const stock = stockData;
        await stockRepositoryInMemory.create(stock);
    }
}
async function createStockPosition() {
    stockPositionRepositoryInMemory = new StockPositionRepositoryInMemory_1.StockPositionRepositoryInMemory();
    const stockPosition1 = StockPosition_1.StockPosition.createStockPosition({
        symbol: 'symbol1',
        quantity: 10,
        type: { stockType: 'fii' },
        avgPrice: 3,
        userId: 'userId',
    });
    const stockPosition2 = StockPosition_1.StockPosition.createStockPosition({
        symbol: 'symbol2',
        quantity: 7,
        type: { stockType: 'fii' },
        avgPrice: 3,
        userId: 'userId',
    });
    const stockPositionsToCreate = [stockPosition1, stockPosition2];
    for (const stockPositionData of stockPositionsToCreate) {
        const stockPosition = stockPositionData;
        await stockPositionRepositoryInMemory.create(stockPosition);
    }
}
describe('[StockPosition] - Sell a stock', () => {
    beforeEach(async () => {
        await createStock();
        await createStockPosition();
        sellStockUseCase = new SellStocksUseCase_1.SellStocksUseCase(stockRepositoryInMemory, stockPositionRepositoryInMemory);
    });
    it('should be able to create a new sell to stock', async () => {
        await sellStockUseCase.execute({
            symbol: 'symbol1',
            price: 11,
            quantity: 9,
            userId: 'userId',
        });
        const stockPosition = await stockPositionRepositoryInMemory.findByUserAndSymbol('userId', 'symbol1');
        expect(stockPosition).toBeDefined();
        expect(stockPosition.quantity).toBe(1);
        expect(stockPosition.symbol).toBe('symbol1');
    });
    it('should not be able to create a new sell stock without position', async () => {
        await expect(sellStockUseCase.execute({
            symbol: 'nonexistent',
            price: 10,
            quantity: 7,
            userId: 'userId',
        })).rejects.toEqual(new AppError_1.AppError('Cannot sell, no stock position found', 404));
    });
});
//# sourceMappingURL=SellStocksUseCase.spec.js.map