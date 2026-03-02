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
exports.SellStocksUseCase = void 0;
const Stock_1 = require("@modules/stock/domain/Stock");
const StockPositionServices_1 = require("@modules/stock/services/StockPositionServices");
const AppError_1 = require("@shared/error/AppError");
const tsyringe_1 = require("tsyringe");
let SellStocksUseCase = class SellStocksUseCase {
    constructor(stockRepository, stockPositionRepository) {
        this.stockRepository = stockRepository;
        this.stockPositionRepository = stockPositionRepository;
    }
    async execute({ symbol, price, date, quantity, operation = { stockOperationType: 'sell' }, userId, }) {
        const stockPosition = await this.stockPositionRepository.findByUserAndSymbol(userId, symbol);
        if (!stockPosition) {
            throw new AppError_1.AppError('Cannot sell, no stock position found', 404);
        }
        const stockCreated = await this.stockRepository.findBySymbol(symbol);
        const stock = Stock_1.Stock.createStock({
            shortName: stockCreated.shortName,
            symbol: stockCreated.symbol,
            price,
            date,
            quantity,
            type: { stockType: stockCreated.type.stockType },
            operation,
            userId,
        });
        await this.stockRepository.create(stock);
        const updated = StockPositionServices_1.StockPositionServices.decreasePosition(stockPosition, quantity);
        await this.stockPositionRepository.update(updated);
    }
};
exports.SellStocksUseCase = SellStocksUseCase;
exports.SellStocksUseCase = SellStocksUseCase = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)('StockRepository')),
    __param(1, (0, tsyringe_1.inject)('StockPositionRepository')),
    __metadata("design:paramtypes", [Object, Object])
], SellStocksUseCase);
//# sourceMappingURL=SellStocksUseCase.js.map