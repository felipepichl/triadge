"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FinancialCategory = void 0;
const AggregateRoot_1 = require("@shared/core/domain/AggregateRoot");
class FinancialCategory extends AggregateRoot_1.AggregateRoot {
    constructor(props, id) {
        super(props, id);
    }
    get description() {
        return this.props.description;
    }
    get parentCategoryId() {
        return this.props.parentCategoryId;
    }
    get userId() {
        return this.props.userId;
    }
    static createFinancialCategory({ id, description, userId, parentCategoryId, }) {
        const financialCategoryProps = {
            description,
            parentCategoryId,
            userId,
        };
        return AggregateRoot_1.AggregateRoot.create({ props: financialCategoryProps, id }, FinancialCategory);
    }
}
exports.FinancialCategory = FinancialCategory;
//# sourceMappingURL=FinancialCategory.js.map