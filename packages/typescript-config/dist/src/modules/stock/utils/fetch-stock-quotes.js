"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchStockQuotes = fetchStockQuotes;
const AppError_1 = require("@shared/error/AppError");
async function fetchStockQuotes(symbols, b3Provider) {
    return await Promise.all(symbols.map(async (symbol) => {
        const quote = await b3Provider.getQuoteTickers(symbol);
        if (!quote) {
            throw new AppError_1.AppError(`Stock ${symbol} not found on BrAPI`, 404);
        }
        return {
            symbol,
            price: Number(quote.regularMarketPrice),
            shortName: quote.shortName,
        };
    }));
}
//# sourceMappingURL=fetch-stock-quotes.js.map