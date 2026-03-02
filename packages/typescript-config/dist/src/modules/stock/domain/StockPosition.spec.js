"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const StockPosition_1 = require("./StockPosition");
describe('[StockPosition] - Create a new Stock Position', () => {
    it('should be able to create a new instance of stock position', () => {
        const stockPosition = StockPosition_1.StockPosition.createStockPosition({
            symbol: 'symbol',
            quantity: 1,
            type: { stockType: 'stock' },
            avgPrice: 1,
            userId: 'userId',
        });
        expect(stockPosition instanceof StockPosition_1.StockPosition).toBe(true);
        expect(stockPosition).toBeTruthy();
    });
});
//# sourceMappingURL=StockPosition.spec.js.map