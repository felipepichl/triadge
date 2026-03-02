"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StockPosition = void 0;
const AggregateRoot_1 = require("@shared/core/domain/AggregateRoot");
class StockPosition extends AggregateRoot_1.AggregateRoot {
    constructor(props, id) {
        super(props, id);
    }
    get symbol() {
        return this.props.symbol;
    }
    get quantity() {
        return this.props.quantity;
    }
    get type() {
        return this.props.type;
    }
    get avgPrice() {
        return this.props.avgPrice;
    }
    get userId() {
        return this.props.userId;
    }
    static createStockPosition({ id, symbol, quantity, type, avgPrice, userId, }) {
        const stockPositionProps = {
            symbol,
            quantity,
            type,
            avgPrice,
            userId,
        };
        return AggregateRoot_1.AggregateRoot.create({ props: stockPositionProps, id }, StockPosition);
    }
}
exports.StockPosition = StockPosition;
//# sourceMappingURL=StockPosition.js.map