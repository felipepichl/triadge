"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StockPositionMappers = void 0;
const StockPosition_1 = require("@modules/stock/domain/StockPosition");
class StockPositionMappers {
    toPersistence(stockPosition) {
        return stockPosition;
    }
    toDomain({ id, symbol, type, quantity, avgPrice, userId, }) {
        return StockPosition_1.StockPosition.createStockPosition({
            id,
            symbol,
            quantity,
            type: { stockType: type.toString() },
            avgPrice: Number(avgPrice),
            userId,
        });
    }
    toDomainArray(rawStock) {
        return rawStock.map(this.toDomain);
    }
    getMapper() {
        return StockPositionMappers.getMapper();
    }
    static getMapper() {
        return new StockPositionMappers();
    }
}
exports.StockPositionMappers = StockPositionMappers;
//# sourceMappingURL=StockPositionMappers.js.map