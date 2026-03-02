"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FinancialCategoryMappers = void 0;
const FinancialCategory_1 = require("@modules/financialCategory/domain/FinancialCategory");
class FinancialCategoryMappers {
    toPersistence(financialCategory) {
        return financialCategory;
    }
    toDomain(raw) {
        return FinancialCategory_1.FinancialCategory.createFinancialCategory(raw);
    }
    toDomainArray(rawFinancialCategory) {
        return rawFinancialCategory.map(this.toDomain);
    }
    getMapper() {
        return FinancialCategoryMappers.getMapper();
    }
    static getMapper() {
        return new FinancialCategoryMappers();
    }
}
exports.FinancialCategoryMappers = FinancialCategoryMappers;
//# sourceMappingURL=FinancialCategoryMappers.js.map