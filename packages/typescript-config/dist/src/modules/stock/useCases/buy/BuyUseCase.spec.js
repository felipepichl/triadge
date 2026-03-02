"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const B3ProviderInMemory_1 = require("@modules/stock/providers/B3Provider/in-memory/B3ProviderInMemory");
const StockPositionRepositoryInMemory_1 = require("@modules/stock/repositories/in-memory/StockPositionRepositoryInMemory");
const StockRepositoryInMemory_1 = require("@modules/stock/repositories/in-memory/StockRepositoryInMemory");
const AppError_1 = require("@shared/error/AppError");
const BuyUseCase_1 = require("./BuyUseCase");
let stockRepositoryInMemory;
let b3ProviderInMemory;
let stockPositionRepositoryInMemory;
let buyUseCase;
describe('[StockPosition] - Buy a stock', () => {
    beforeEach(() => {
        stockRepositoryInMemory = new StockRepositoryInMemory_1.StockRepositoryInMemory();
        b3ProviderInMemory = new B3ProviderInMemory_1.B3ProviderInMemory();
        stockPositionRepositoryInMemory = new StockPositionRepositoryInMemory_1.StockPositionRepositoryInMemory();
        buyUseCase = new BuyUseCase_1.BuyUseCase(stockRepositoryInMemory, b3ProviderInMemory, stockPositionRepositoryInMemory);
    });
    it('should be able to create a new buy', async () => {
        await buyUseCase.execute({
            symbol: 'RAAA11',
            price: 10,
            quantity: 7,
            type: { stockType: 'stock' },
            userId: 'userId',
        });
        const stockCreated = await stockRepositoryInMemory.listAll('userId');
        expect(stockCreated[0]).toBeDefined();
        expect(stockCreated.length).toBe(1);
        expect(stockCreated[0].price).toBe(10);
        expect(stockCreated[0].symbol).toBe('RAAA11');
    });
    it('should be able to create a new buy with increase position', async () => {
        await buyUseCase.execute({
            symbol: 'RAAA11',
            price: 10,
            quantity: 7,
            type: { stockType: 'stock' },
            userId: 'userId',
        });
        await buyUseCase.execute({
            symbol: 'RAAA11',
            price: 9.9,
            quantity: 7,
            type: { stockType: 'stock' },
            userId: 'userId',
        });
        const stockCreated = await stockRepositoryInMemory.listAll('userId');
        const position = await stockPositionRepositoryInMemory.findByUserAndSymbol('userId', 'RAAA11');
        expect(stockCreated[0]).toBeDefined();
        expect(stockCreated.length).toBe(2);
        expect(stockCreated[0].symbol).toBe('RAAA11');
        expect(position.quantity).toBe(14);
    });
    it('should not be able to create a new stock with nonexistent ticket', async () => {
        await expect(buyUseCase.execute({
            symbol: 'nonexistent',
            price: 10,
            quantity: 7,
            type: { stockType: 'fii' },
            userId: 'userId',
        })).rejects.toEqual(new AppError_1.AppError('Ticket does not exists', 404));
    });
});
//# sourceMappingURL=BuyUseCase.spec.js.map