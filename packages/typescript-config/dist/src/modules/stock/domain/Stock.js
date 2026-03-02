"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Stock = void 0;
const AggregateRoot_1 = require("@shared/core/domain/AggregateRoot");
class Stock extends AggregateRoot_1.AggregateRoot {
    constructor(props, id) {
        super(props, id);
    }
    get shortName() {
        return this.props.shortName;
    }
    get symbol() {
        return this.props.symbol;
    }
    get price() {
        return this.props.price;
    }
    get date() {
        return this.props.date;
    }
    get quantity() {
        return this.props.quantity;
    }
    get type() {
        return this.props.type;
    }
    get operation() {
        return this.props.operation;
    }
    get userId() {
        return this.props.userId;
    }
    static createStock({ id, shortName, symbol, price, date, quantity, type, operation, userId, }) {
        const stockProps = {
            shortName,
            symbol,
            price,
            date: date ? new Date(date) : new Date(),
            quantity,
            type,
            operation,
            userId,
        };
        return AggregateRoot_1.AggregateRoot.create({ props: stockProps, id }, Stock);
    }
}
exports.Stock = Stock;
//# sourceMappingURL=Stock.js.map