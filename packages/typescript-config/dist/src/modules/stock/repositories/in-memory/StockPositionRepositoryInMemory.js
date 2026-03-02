"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StockPositionRepositoryInMemory = void 0;
class StockPositionRepositoryInMemory {
    constructor() {
        this.stocks = [];
    }
    async create(stockPosition) {
        this.stocks.push(stockPosition);
    }
    async update(stockPosition) {
        const index = this.stocks.findIndex((item) => item.id === stockPosition.id);
        if (index !== -1) {
            this.stocks[index] = stockPosition;
        }
    }
    async findByUserAndSymbol(userId, symbol) {
        return this.stocks.find((stockPosition) => stockPosition.userId === userId && stockPosition.symbol === symbol);
    }
    async listByType(userId, type) {
        return this.stocks.filter((stockPosition) => stockPosition.userId === userId && stockPosition.type.stockType === type.stockType);
    }
}
exports.StockPositionRepositoryInMemory = StockPositionRepositoryInMemory;
//# sourceMappingURL=StockPositionRepositoryInMemory.js.map