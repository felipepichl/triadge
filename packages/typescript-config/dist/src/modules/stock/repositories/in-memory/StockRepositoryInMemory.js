"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StockRepositoryInMemory = void 0;
class StockRepositoryInMemory {
    constructor() {
        this.stocks = [];
    }
    async create(stock) {
        this.stocks.push(stock);
    }
    async listAll(userId) {
        return this.stocks.filter((stock) => stock.userId === userId);
    }
    async listByDateRange(userId, startDate, endDate) {
        return this.stocks.filter((stock) => stock.userId === userId &&
            stock.date >= startDate &&
            stock.date <= endDate);
    }
    async listByType(userId, type) {
        return this.stocks.filter((stock) => stock.userId === userId && stock.type.stockType === type.stockType);
    }
    async listByMonth(userId, month) {
        return this.stocks.filter((stock) => {
            return stock.userId === userId && stock.date.getUTCMonth() + 1 === month;
        });
    }
    async listAllSymbolsByUserIdAndType(userId, type) {
        return this.stocks
            .filter((stock) => stock.userId === userId && stock.type.stockType === type.stockType)
            .map((stock) => stock.symbol);
    }
    async findBySymbol(symbol) {
        return this.stocks.find((stock) => stock.symbol === symbol);
    }
}
exports.StockRepositoryInMemory = StockRepositoryInMemory;
//# sourceMappingURL=StockRepositoryInMemory.js.map