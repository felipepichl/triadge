"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Transaction = void 0;
const AggregateRoot_1 = require("@shared/core/domain/AggregateRoot");
class Transaction extends AggregateRoot_1.AggregateRoot {
    constructor(props, id) {
        super(props, id);
    }
    get description() {
        return this.props.description;
    }
    get detail() {
        return this.props.detail;
    }
    get type() {
        return this.props.type;
    }
    get amount() {
        return this.props.amount;
    }
    get date() {
        return this.props.date;
    }
    get userId() {
        return this.props.userId;
    }
    get financialCategory() {
        return this.props.financialCategory;
    }
    get financialCategoryId() {
        return this.props.financialCategoryId;
    }
    get subcategory() {
        return this.props.subcategory;
    }
    get subcategoryId() {
        return this.props.subcategoryId;
    }
    static createTransaction({ id, description, detail, type, amount, date, userId, financialCategoryId, financialCategory, subcategoryId, subcategory, }) {
        const transactionProps = {
            description,
            detail,
            type,
            amount,
            date: date ? new Date(date) : new Date(),
            userId,
            financialCategory,
            financialCategoryId,
            subcategory,
            subcategoryId,
        };
        return AggregateRoot_1.AggregateRoot.create({ props: transactionProps, id }, Transaction);
    }
}
exports.Transaction = Transaction;
//# sourceMappingURL=Transaction.js.map