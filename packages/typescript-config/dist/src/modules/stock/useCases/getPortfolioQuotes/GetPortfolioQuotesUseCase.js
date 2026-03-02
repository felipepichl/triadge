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
exports.GetPortfolioQuotesUseCase = void 0;
const fetch_stock_quotes_1 = require("@modules/stock/utils/fetch-stock-quotes");
const AppError_1 = require("@shared/error/AppError");
const tsyringe_1 = require("tsyringe");
let GetPortfolioQuotesUseCase = class GetPortfolioQuotesUseCase {
    constructor(stockPositionRepository, b3Provider) {
        this.stockPositionRepository = stockPositionRepository;
        this.b3Provider = b3Provider;
    }
    async execute({ userId, type }) {
        const stockPositions = await this.stockPositionRepository.listByType(userId, type);
        if (!stockPositions || stockPositions.length === 0) {
            throw new AppError_1.AppError('User stock positions not found', 404);
        }
        const symbols = stockPositions.map((position) => position.symbol);
        const quotes = await (0, fetch_stock_quotes_1.fetchStockQuotes)(symbols, this.b3Provider);
        const portfolio = stockPositions.map((position) => {
            var _a, _b, _c;
            const quote = quotes.find((item) => item.symbol === position.symbol);
            return {
                stock: {
                    shortName: (_a = quote === null || quote === void 0 ? void 0 : quote.shortName) !== null && _a !== void 0 ? _a : position.symbol,
                    symbol: position.symbol,
                    totalStock: position.quantity,
                },
                totalInvested: position.quantity * position.avgPrice,
                currentValue: position.quantity * ((_b = quote === null || quote === void 0 ? void 0 : quote.price) !== null && _b !== void 0 ? _b : 0),
                quote: (_c = quote === null || quote === void 0 ? void 0 : quote.price) !== null && _c !== void 0 ? _c : 0,
                minPrice: position.avgPrice,
                maxPrice: position.avgPrice,
            };
        });
        return {
            portfolio,
        };
    }
};
exports.GetPortfolioQuotesUseCase = GetPortfolioQuotesUseCase;
exports.GetPortfolioQuotesUseCase = GetPortfolioQuotesUseCase = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)('StockPositionRepository')),
    __param(1, (0, tsyringe_1.inject)('BrapiB3Provider')),
    __metadata("design:paramtypes", [Object, Object])
], GetPortfolioQuotesUseCase);
//# sourceMappingURL=GetPortfolioQuotesUseCase.js.map