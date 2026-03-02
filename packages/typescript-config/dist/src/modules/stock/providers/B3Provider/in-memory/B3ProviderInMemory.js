"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.B3ProviderInMemory = void 0;
class B3ProviderInMemory {
    constructor() {
        this.stocks = [];
    }
    async getQuoteTickers(ticket) {
        const ticketInMemory = {
            shortName: 'RAAA Name',
            symbol: 'RAAA11',
        };
        this.stocks.push(ticketInMemory);
        return this.stocks.find((item) => item.symbol === ticket);
    }
    async getPortfolioQuotes(tickets) {
        return this.stocks.filter((item) => tickets.includes(item.symbol));
    }
    async addSymbol(symbols) {
        for (const symbol of symbols) {
            this.stocks.push({
                shortName: `shortname to ${symbol}`,
                symbol,
                regularMarketPrice: '13.00',
            });
        }
    }
}
exports.B3ProviderInMemory = B3ProviderInMemory;
//# sourceMappingURL=B3ProviderInMemory.js.map