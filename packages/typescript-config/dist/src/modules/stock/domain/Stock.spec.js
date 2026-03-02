"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Stock_1 = require("./Stock");
describe('[Stock] - Create a new Stock', () => {
    it('should be able to create a new instance of stock', () => {
        const stock = Stock_1.Stock.createStock({
            shortName: 'short name',
            symbol: 'symbol',
            price: 7,
            date: new Date(),
            quantity: 1,
            type: { stockType: 'stock' },
            userId: 'userId',
        });
        expect(stock instanceof Stock_1.Stock).toBe(true);
        expect(stock).toBeTruthy();
    });
});
//# sourceMappingURL=Stock.spec.js.map