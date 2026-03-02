"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StockPositionServices = void 0;
const AppError_1 = require("@shared/error/AppError");
const StockPosition_1 = require("../domain/StockPosition");
class StockPositionServices {
    static increasePosition(stockPosition, quantity, price) {
        const totalInvested = stockPosition.quantity * stockPosition.avgPrice;
        const newTotal = totalInvested + quantity * price;
        const newQuantity = stockPosition.quantity + quantity;
        const newAvgPrice = newTotal / newQuantity;
        return StockPosition_1.StockPosition.createStockPosition({
            id: stockPosition.id,
            symbol: stockPosition.symbol,
            quantity: newQuantity,
            type: stockPosition.type,
            avgPrice: newAvgPrice,
            userId: stockPosition.userId,
        });
    }
    static decreasePosition(stockPosition, quantity) {
        if (quantity > stockPosition.quantity) {
            throw new AppError_1.AppError('Cannot sell more then current position');
        }
        return StockPosition_1.StockPosition.createStockPosition({
            id: stockPosition.id,
            symbol: stockPosition.symbol,
            quantity: stockPosition.quantity - quantity,
            type: stockPosition.type,
            avgPrice: stockPosition.avgPrice,
            userId: stockPosition.userId,
        });
    }
}
exports.StockPositionServices = StockPositionServices;
//# sourceMappingURL=StockPositionServices.js.map