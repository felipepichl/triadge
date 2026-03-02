"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetTotalInvestedAndCurrentQuoteUseCase = void 0;
const fetch_stock_quotes_1 = require("@modules/stock/utils/fetch-stock-quotes");
const grouped_stocks_utils_1 = require("@modules/stock/utils/grouped-stocks-utils");
const AppError_1 = require("@shared/error/AppError");
const tsyringe_1 = require("tsyringe");
let GetTotalInvestedAndCurrentQuoteUseCase = class GetTotalInvestedAndCurrentQuoteUseCase {
    constructor(stocksRpository, b3Provider) {
        this.stocksRpository = stocksRpository;
        this.b3Provider = b3Provider;
    }
    async execute({ userId, type }) {
        const stocks = await this.stocksRpository.listByType(userId, type);
        if (!stocks) {
            throw new AppError_1.AppError('User stock not found', 404);
        }
        const stocksInWallet = stocks.filter((stock) => stock.operation.stockOperationType === 'buy');
        const groupedStocks = (0, grouped_stocks_utils_1.groupedStocksUtils)(stocksInWallet);
        const symbols = Object.keys(groupedStocks);
        const quotes = await (0, fetch_stock_quotes_1.fetchStockQuotes)(symbols, this.b3Provider);
        const { totalInvested, currentValue } = symbols.reduce((acc, symbol) => {
            var _a;
            const stockData = groupedStocks[symbol];
            const quote = quotes.find((item) => item.symbol === symbol);
            acc.totalInvested += stockData.totalInvested;
            acc.currentValue += stockData.totalStock * ((_a = quote === null || quote === void 0 ? void 0 : quote.price) !== null && _a !== void 0 ? _a : 0);
            return acc;
        }, { totalInvested: 0, currentValue: 0 });
        const position = currentValue - totalInvested;
        return {
            totalInvested,
            currentValue,
            position,
        };
    }
};
exports.GetTotalInvestedAndCurrentQuoteUseCase = GetTotalInvestedAndCurrentQuoteUseCase;
exports.GetTotalInvestedAndCurrentQuoteUseCase = GetTotalInvestedAndCurrentQuoteUseCase = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)('StockRepository')),
    __param(1, (0, tsyringe_1.inject)('BrapiB3Provider')),
    __metadata("design:paramtypes", [Object, Object])
], GetTotalInvestedAndCurrentQuoteUseCase);
//# sourceMappingURL=GetTotalInvestedAndCurrentQuoteUseCase.js.map