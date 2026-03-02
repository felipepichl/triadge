"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccountPayable = void 0;
const AggregateRoot_1 = require("@shared/core/domain/AggregateRoot");
class AccountPayable extends AggregateRoot_1.AggregateRoot {
    constructor(props, id) {
        super(props, id);
    }
    get description() {
        return this.props.description;
    }
    get amount() {
        return this.props.amount;
    }
    get dueDate() {
        return this.props.dueDate;
    }
    get paymentDate() {
        return this.props.paymentDate;
    }
    get isPaid() {
        return this.props.isPaid;
    }
    get isFixed() {
        return this.props.isFixed;
    }
    get interestPaid() {
        return this.props.interestPaid;
    }
    get isInterestPaid() {
        return this.props.isInterestPaid;
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
    static createAccountPayable({ id, description, amount, dueDate, paymentDate, isPaid, isFixed, interestPaid, isInterestPaid, userId, financialCategory, financialCategoryId, subcategory, subcategoryId, }) {
        const accountPayableProps = {
            description,
            amount,
            dueDate,
            paymentDate,
            isPaid,
            isFixed,
            interestPaid,
            isInterestPaid,
            userId,
            financialCategory,
            financialCategoryId,
            subcategory,
            subcategoryId,
        };
        return AggregateRoot_1.AggregateRoot.create({ props: accountPayableProps, id }, AccountPayable);
    }
    markAsPaid() {
        this.props.isPaid = true;
    }
    updateAmountVariable(amount) {
        this.props.amount = amount;
    }
    updateInterestPaid(interest, isInterestPaid = true) {
        this.props.interestPaid = interest;
        this.props.isInterestPaid = isInterestPaid;
    }
}
exports.AccountPayable = AccountPayable;
//# sourceMappingURL=AccountPayable.js.map