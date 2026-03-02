"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StockMappers = void 0;
const Stock_1 = require("@modules/stock/domain/Stock");
class StockMappers {
    toPersistence(stock) {
        return stock;
    }
    toDomain({ id, shortName, symbol, price, date, quantity, type, operation, userId, }) {
        return Stock_1.Stock.createStock({
            id,
            shortName,
            symbol,
            price: Number(price),
            date,
            quantity,
            type: { stockType: type },
            operation: operation ? { stockOperationType: operation } : undefined,
            userId,
        });
    }
    toDomainArray(rawStock) {
        return rawStock.map(this.toDomain);
    }
    getMapper() {
        return StockMappers.getMapper();
    }
    static getMapper() {
        return new StockMappers();
    }
}
exports.StockMappers = StockMappers;
//# sourceMappingURL=StockPayableMappers.js.map