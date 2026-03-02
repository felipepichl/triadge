"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BrapiB3Provider = void 0;
const brapi_1 = require("../services/brapi");
const BrapiErrorHandler_1 = require("../utils/BrapiErrorHandler");
class BrapiB3Provider {
    async getQuoteTickers(ticket) {
        try {
            const { data } = await brapi_1.brapi.get(`/quote/${ticket}?token=${process.env.BRAPI_TOKEN}`);
            const { shortName, symbol, regularMarketPrice } = data.results[0];
            if (!shortName) {
                return null;
            }
            return {
                shortName,
                symbol,
                regularMarketPrice,
            };
        }
        catch (error) {
            BrapiErrorHandler_1.BrapiErrorHandler.handle(error);
        }
    }
    async getPortfolioQuotes(tickets) {
        try {
            const stocks = [];
            for (const ticket of tickets) {
                const { data } = await brapi_1.brapi.get(`/quote/${ticket}?token=${process.env.BRAPI_TOKEN}`);
                const { shortName, symbol, regularMarketPrice } = data.results[0];
                if (!shortName) {
                    return null;
                }
                stocks.push({
                    shortName,
                    symbol,
                    regularMarketPrice,
                });
            }
            return stocks;
        }
        catch (error) {
            BrapiErrorHandler_1.BrapiErrorHandler.handle(error);
        }
    }
}
exports.BrapiB3Provider = BrapiB3Provider;
//# sourceMappingURL=BrapiB3Provider.js.map